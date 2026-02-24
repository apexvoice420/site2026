"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, Activity, CreditCard, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = "https://apex-voice-crm-production.up.railway.app";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        totalClients: 0,
        totalCalls: 0,
        newLeads: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch(`${API_BASE}/api/stats`);
                const data = await res.json();
                setStats({
                    totalLeads: data.totalLeads || 0,
                    totalClients: data.totalClients || 0,
                    totalCalls: data.totalCalls || 0,
                    newLeads: data.newLeads || 0
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Clients
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? "..." : stats.totalClients}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            AI receptionists deployed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Calls
                        </CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? "..." : stats.totalCalls}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Processed by AI agents
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            System Health
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground">
                            Operational
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Leads
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? "..." : stats.totalLeads}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Syncing to CRM
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Quick Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            Your AI Voice operations are running smoothly. Check the Leads and Agents tabs to manage your voice receptionists.
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm text-muted-foreground mb-4">
                            Get started with your AI Voice operations.
                        </div>
                        <div className="grid gap-2">
                            <Link href="/dashboard/agents">
                                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm border transition-colors w-full text-left">
                                    <Users className="h-4 w-4" /> View Agents
                                </button>
                            </Link>
                            <Link href="/dashboard/leads">
                                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm border transition-colors w-full text-left">
                                    <MessageSquare className="h-4 w-4" /> View Leads
                                </button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
