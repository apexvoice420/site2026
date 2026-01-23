import { createFromOnboarding } from "@/app/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to Apex Voice</CardTitle>
                    <CardDescription>Let's set up your workspace.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createFromOnboarding} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" name="companyName" placeholder="Acme Inc." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select name="industry" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="roofing">Roofing & Restoration</SelectItem>
                                    <SelectItem value="plumbing">Plumbing & HVAC</SelectItem>
                                    <SelectItem value="medical">Medical / Dental</SelectItem>
                                    <SelectItem value="legal">Legal Services</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full">Create Workspace</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
