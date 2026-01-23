
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard Error:", error);
    }, [error]);

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center text-muted-foreground">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Something went wrong!</h2>
            <p className="max-w-md text-sm">
                {error.message || "An unexpected error occurred while loading this page."}
            </p>
            <Button onClick={() => reset()} variant="outline">
                Try again
            </Button>
        </div>
    );
}
