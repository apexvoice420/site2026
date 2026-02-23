import { getLead } from "@/app/actions/leads";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ leadId: string }>;
}

export default async function LeadPage({ params }: PageProps) {
    const { leadId } = await params;
    const lead = await getLead(leadId);

    if (!lead) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/leads">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {lead.firstName} {lead.lastName}
                    </h2>
                    <p className="text-muted-foreground">Lead Details</p>
                </div>
                <div className="ml-auto">
                    <Badge variant={lead.status === "NEW" ? "default" : "secondary"}>{lead.status}</Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Created: {lead.createdAt.toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Call History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {lead.calls && lead.calls.length > 0 ? (
                            <div className="space-y-4">
                                {lead.calls.map((call: any) => (
                                    <div key={call.id} className="rounded-lg border p-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{call.status}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(call.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {call.duration && (
                                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {Math.round(call.duration / 60)} mins
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No calls recorded yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
