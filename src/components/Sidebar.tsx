import { useSidebar } from "@/lib/context/SidebarContext";
import { ChevronDownIcon, LayoutDashboard, NotebookPen, Settings, UserPen } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
        subItems: [
            { name: "Ajouter une note", path: "/add-note" },
            { name: "Toutes les notes", path: "/notes" },
        ],
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
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

    useEffect(() => {
        let submenuMatched = false;
        for (const nav of navItems) {
            if (nav.subItems) {
                for (const subItem of nav.subItems) {
                    if (isActive(subItem.path)) {
                        setOpenSubmenu(navItems.indexOf(nav));
                        submenuMatched = true;
                        break;
                    }
                }
            }
        }

        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = openSubmenu;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu === index) {
                return null;
            }
            return index;
        });
    };

    return (
        <aside
            className={`-translate-x-full fixed top-0 left-0 z-50 mt-16 flex h-screen ${isExpanded ? "w-[290px]" : "w-[90px]"} flex-col border-r bg-sidebar-primary-foreground px-5 text-primary transition-all duration-300 ease-in-out lg:mt-0 lg:translate-x-0`}
        >
            <p className="pt-5 pb-8 font-bold text-2xl">Organizer</p>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <p className="pb-7">Menu</p>
                <nav>
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={item.name} className="mb-5">
                                {item.subItems ? (
                                    <button
                                        onClick={() => handleSubmenuToggle(index)}
                                        className={`menu-item group ${
                                            openSubmenu === index ? "menu-item-active" : "menu-item-inactive"
                                        } cursor-pointer ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}`}
                                        type="button"
                                    >
                                        <span>{item.icon}</span>
                                        {isExpanded && <span>{item.name}</span>}
                                        {isExpanded && (
                                            <ChevronDownIcon
                                                className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                                                    openSubmenu === index ? "rotate-180 text-brand-500" : ""
                                                }`}
                                            />
                                        )}
                                    </button>
                                ) : (
                                    item.path && (
                                        <Link
                                            to={item.path || "#"}
                                            className={`menu-item group ${
                                                isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
                                            } ${!isExpanded ? "lg:justify-center" : "lg:justify-start"}`}
                                        >
                                            <span>{item.icon}</span>
                                            {isExpanded && <span>{item.name}</span>}
                                        </Link>
                                    )
                                )}
                                {item.subItems && isExpanded && (
                                    <div
                                        ref={(el) => {
                                            subMenuRefs.current[index] = el;
                                        }}
                                        className="overflow-hidden transition-all duration-300"
                                        style={{
                                            height: openSubmenu === index ? `${subMenuHeight[index]}px` : "0px",
                                        }}
                                    >
                                        <ul className="mt-2 ml-9 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`menu-dropdown-item ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-item-active"
                                                                : "menu-dropdown-item-inactive"
                                                        }`}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
