import { useSidebar } from "@/lib/context/SidebarContext";

export default function Sidebar() {
    const { isExpanded } = useSidebar();

    return (
        <aside
            className={`-translate-x-full fixed top-0 left-0 z-50 mt-16 flex h-screen ${isExpanded ? "w-[290px]" : "w-[90px]"} flex-col border-r bg-sidebar-primary-foreground px-5 text-primary transition-all duration-300 ease-in-out lg:mt-0 lg:translate-x-0`}
        >
            <p>Je suis la sidebar</p>
        </aside>
    );
}
