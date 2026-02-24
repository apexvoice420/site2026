"use client";

import { UserButton } from "@clerk/nextjs";

interface HeaderProps {
    user: any; // Using any for now to match the dbUser type from requireUser
}

export function Header({ user }: HeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b px-6 bg-background">
            <div className="font-medium">Welcome back, {user?.firstName || "User"}</div>
            <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/sign-in" />
            </div>
        </header>
    );
}
