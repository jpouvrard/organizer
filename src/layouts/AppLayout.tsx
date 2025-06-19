import { Outlet } from "react-router";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/lib/context/SidebarContext";
import { useMatches } from "react-router";

export default function MainLayout() {
    const { isExpanded } = useSidebar();
    const matches = useMatches();
    const dataRoute = matches.pop()?.data as { title: string };

    return (
        <div className="min-h-screen bg-primary-foreground xl:flex">
            <Sidebar />
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"}`}
            >
                <Header />
                <article className="no-scrollbar h-full w-full overflow-y-auto">
                    <header className="h-[64px]">{dataRoute?.title}</header>
                    <section>
                        <Outlet />
                    </section>
                </article>
            </main>
        </div>
    );
}
