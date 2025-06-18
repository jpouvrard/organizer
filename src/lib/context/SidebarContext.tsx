import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type SidebarContextType = {
    isExpanded: boolean;
    toggleSidebar: () => void;
};

const initialState: SidebarContextType = {
    isExpanded: false,
    toggleSidebar: () => null,
};

const SidebarContext = createContext<SidebarContextType>(initialState);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded((prev) => !prev);
    };

    return <SidebarContext value={{ isExpanded, toggleSidebar }}>{children}</SidebarContext>;
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) throw new Error("useSidebar must be used within a SidebarProvider");
    return context;
};
