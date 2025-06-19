import { useSidebar } from "@/lib/context/SidebarContext";
import { LayoutDashboard, NotebookPen, Settings, UserPen } from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
    icon: React.ReactNode;
    name: string;
    path?: string;
    subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
    {
        icon: <LayoutDashboard />,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: <NotebookPen />,
        name: "Notes",
        path: "/notes",
    },
    {
        icon: <UserPen />,
        name: "Profil",
        path: "/profile",
    },
    {
        icon: <Settings />,
        name: "Paramètres",
        path: "/settings",
    },
];

export default function Sidebar() {
    const { isExpanded } = useSidebar();

    return (
        <aside
            className={`-translate-x-full fixed top-0 left-0 z-50 mt-16 flex h-screen ${isExpanded ? "w-[290px]" : "w-[90px]"} flex-col border-r bg-sidebar-primary-foreground px-5 text-primary transition-all duration-300 ease-in-out lg:mt-0 lg:translate-x-0`}
        >
            <p className="py-8 font-bold text-2xl">Organizer</p>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <p className="pb-7">Menu</p>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="mb-5">
                                <Link to={item.path || "#"} className="flex items-center gap-2">
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
