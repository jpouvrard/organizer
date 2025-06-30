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
        <div className="h-screen bg-primary-foreground xl:flex">
            <Sidebar />
            <main
                className={`flex h-full flex-1 flex-col transition-all duration-300 ease-in-out ${isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"}`}
            >
                <Header />
                <article className="no-scrollbar w-full overflow-y-auto p-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
                    <header className="h-[64px]">{dataRoute?.title}</header>
                    <section>
                        <Outlet />
                    </section>
                </article>
            </main>
        </div>
    );
}
