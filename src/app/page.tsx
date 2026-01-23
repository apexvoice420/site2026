
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-background px-6 lg:px-12">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Apex Voice
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button>
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Your AI Voice Automation <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Back Office
            </span>
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Powering your business with autonomous voice agents.
            Log in to manage leads, call logs, and workflows.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2026 Apex Voice Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
