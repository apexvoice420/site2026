"use client";

import { createAgentFromTemplate } from "@/app/actions/templates";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useTransition } from "react";

export function LaunchAgentButton({ slug }: { slug: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            createAgentFromTemplate(slug);
        });
    };

    return (
        <Button
            size="lg"
            className="h-12 px-8 text-lg"
            onClick={handleClick}
            disabled={isPending}
        >
            <Zap className="mr-2 h-5 w-5" />
            {isPending ? "Launching..." : "Launch This Agent"}
        </Button>
    );
}
