export const dynamic = 'force-dynamic';

import { getSettings, updateSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default async function SettingsPage() {
    let settings;
    try {
        settings = await getSettings();
    } catch (e) {
        console.error("Settings Load Error:", e);
        return <div className="p-6 text-red-500">Error loading settings: {(e as Error).message}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

            <form action={updateSettings}>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Information</CardTitle>
                            <CardDescription>Manage your business profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Input id="industry" name="industry" defaultValue={settings?.industry || ""} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Vapi Integration</CardTitle>
                            <CardDescription>Configure your voice AI provider.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="vapiKey">Private API Key</Label>
                                <Input
                                    id="vapiKey"
                                    name="vapiKey"
                                    type="password"
                                    defaultValue={settings?.vapiKey || ""}
                                    placeholder="sk-..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Default Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    defaultValue={settings?.phoneNumber || ""}
                                    placeholder="+1..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" /> Save Settings
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
