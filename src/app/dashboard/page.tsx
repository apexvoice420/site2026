import { getDashboardStats } from "@/app/actions/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, TrendingUp, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Real-time performance metrics for your AI receptionists.</p>
                </div>
                <div className="flex gap-4">
                    <select className="bg-background border rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            {/* Metric Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCalls}</div>
                        <p className="text-xs text-muted-foreground">Calls handled this period</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jobs Booked</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.bookedCalls}</div>
                        <p className="text-xs text-muted-foreground">Appointments scheduled</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalLeads}</div>
                        <p className="text-xs text-muted-foreground">{stats.newLeads} new leads</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                        <p className="text-xs text-muted-foreground">Calls to bookings</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Call Volume & Conversions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.callVolume}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="calls" fill="#1479FF" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="booked" fill="#4ade80" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex gap-4 text-xs font-bold uppercase mt-4 justify-center">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#1479FF]"></div> Calls</div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-400"></div> Booked</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Calls</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentCalls.length === 0 ? (
                                <div className="text-sm text-muted-foreground text-center py-8">
                                    No calls yet. Calls will appear here.
                                </div>
                            ) : (
                                stats.recentCalls.map((call) => (
                                    <div key={call.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-background rounded-full border flex items-center justify-center font-bold text-sm">
                                                {call.callerName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{call.callerName}</div>
                                                <div className="text-xs text-muted-foreground">{call.issue} • {call.time}</div>
                                            </div>
                                        </div>
                                        <Badge variant={call.urgency === "High" ? "destructive" : call.urgency === "Low" ? "secondary" : "default"}>
                                            {call.urgency}
                                        </Badge>
                                    </div>
                                ))
                            )}
                            <Link href="/dashboard/logs" className="block text-center text-primary text-sm font-medium pt-2 hover:underline">
                                View All Logs
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
