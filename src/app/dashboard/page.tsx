import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, Activity, CreditCard, MessageSquare } from "lucide-react";
import db from "@/lib/db";
import { requireTenant } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const tenant = await requireTenant();

    // Fetch real metrics
    const [agentsCount, leadsCount, callsCount, recentLeads] = await Promise.all([
        db.agent.count({ where: { tenantId: tenant.id } }),
        db.lead.count({ where: { tenantId: tenant.id } }),
        db.callLog.count({
            where: {
                OR: [
                    { agent: { tenantId: tenant.id } },
                    { lead: { tenantId: tenant.id } }
                ]
            }
        }),
        db.lead.findMany({
            where: { tenantId: tenant.id },
            orderBy: { createdAt: 'desc' },
            take: 5
        })
    ]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Agents
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{agentsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Configure in Agents tab
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
                        <div className="text-2xl font-bold">{callsCount}</div>
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
                        <div className="text-2xl font-bold">{leadsCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Syncing to CRM
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentLeads.map((lead) => (
                                <div key={lead.id} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {lead.firstName} {lead.lastName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {lead.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        {lead.status}
                                    </div>
                                </div>
                            ))}
                            {recentLeads.length === 0 && (
                                <div className="text-sm text-muted-foreground">No recent leads.</div>
                            )}
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
                            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm border transition-colors w-full text-left">
                                <Users className="h-4 w-4" /> Create New Agent
                            </button>
                            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm border transition-colors w-full text-left">
                                <MessageSquare className="h-4 w-4" /> Build Workflow
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
