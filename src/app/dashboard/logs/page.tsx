export const dynamic = 'force-dynamic';

import { getCallLogs } from "@/app/actions/logs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Phone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CallLogsPage() {
    const logs = await getCallLogs();

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Call Logs</h2>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Direction</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Lead</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.createdAt.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{log.direction}</Badge>
                                </TableCell>
                                <TableCell>{log.agent?.name || "Unknown"}</TableCell>
                                <TableCell>
                                    {log.lead ? `${log.lead.firstName} ${log.lead.lastName}` : "Unknown"}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={log.status === "COMPLETED" ? "default" : "destructive"}>
                                        {log.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{log.duration}s</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">
                                        <Play className="h-4 w-4 mr-1" /> Play
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {logs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No calls recorded yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
