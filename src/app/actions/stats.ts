"use server";

import db from "@/lib/db";
import { requireTenant } from "@/lib/auth";

export interface DashboardStats {
    totalCalls: number;
    totalLeads: number;
    newLeads: number;
    bookedCalls: number;
    conversionRate: string;
    recentCalls: Array<{
        id: string;
        callerName: string;
        time: string;
        issue: string;
        urgency: string;
    }>;
    callVolume: Array<{
        name: string;
        calls: number;
        booked: number;
    }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const tenant = await requireTenant();
    const tenantId = tenant.id;

    // Get counts
    const [totalCalls, totalLeads, newLeads, bookedCalls] = await Promise.all([
        db.callLog.count({ where: { tenantId } }),
        db.lead.count({ where: { tenantId } }),
        db.lead.count({ where: { tenantId, status: "NEW" } }),
        db.callLog.count({ 
            where: { tenantId, outcome: { contains: "booked", mode: "insensitive" } } 
        })
    ]);

    // Get recent calls with lead info
    const recentCallsData = await db.callLog.findMany({
        where: { tenantId },
        include: { lead: true },
        orderBy: { createdAt: "desc" },
        take: 5
    });

    const recentCalls = recentCallsData.map(call => ({
        id: call.id,
        callerName: call.lead ? `${call.lead.firstName || ''} ${call.lead.lastName || ''}`.trim() || "Unknown Caller" : "Unknown Caller",
        time: formatRelativeTime(call.createdAt),
        issue: call.summary?.split('.')[0]?.substring(0, 30) || "General Inquiry",
        urgency: determineUrgency(call.summary || "")
    }));

    // Get call volume for last 7 days
    const callVolume = await getCallVolumeData(tenantId);

    return {
        totalCalls,
        totalLeads,
        newLeads,
        bookedCalls,
        conversionRate: totalCalls > 0 ? ((bookedCalls / totalCalls) * 100).toFixed(1) : "0",
        recentCalls,
        callVolume
    };
}

async function getCallVolumeData(tenantId: string) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayStart = new Date(date.setHours(0, 0, 0, 0));
        const dayEnd = new Date(date.setHours(23, 59, 59, 999));

        const [calls, booked] = await Promise.all([
            db.callLog.count({ 
                where: { tenantId, createdAt: { gte: dayStart, lte: dayEnd } } 
            }),
            db.callLog.count({ 
                where: { 
                    tenantId, 
                    createdAt: { gte: dayStart, lte: dayEnd },
                    outcome: { contains: "booked", mode: "insensitive" }
                } 
            })
        ]);

        data.push({
            name: days[date.getDay()],
            calls,
            booked
        });
    }

    return data;
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
}

function determineUrgency(summary: string): string {
    const highKeywords = ['emergency', 'urgent', 'leak', 'flood', 'burst', 'fire', 'no heat', 'no ac', 'no cooling'];
    const lowKeywords = ['inquiry', 'quote', 'estimate', 'information'];
    
    const lowerSummary = summary.toLowerCase();
    
    if (highKeywords.some(kw => lowerSummary.includes(kw))) return "High";
    if (lowKeywords.some(kw => lowerSummary.includes(kw))) return "Low";
    return "Normal";
}
