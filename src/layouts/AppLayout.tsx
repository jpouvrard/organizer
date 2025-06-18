import { Outlet } from "react-router";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/lib/context/SidebarContext";

export default function MainLayout() {
    const { isExpanded } = useSidebar();

    return (
        <div className="min-h-screen bg-primary-foreground xl:flex">
            <Sidebar />
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? "lg:ml-[290px]" : "lg:ml-[90px]"}`}
            >
                <Header />
                <Outlet />
            </main>
        </div>
    );
}
