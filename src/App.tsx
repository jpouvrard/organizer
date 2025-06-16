import { Outlet } from "react-router";

import { ThemeProvider } from "@/lib/context/theme";
import { ToastContextProvider } from "@/lib/context/toast";
import { UserProvider } from "@/lib/context/user";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContextProvider>
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </ToastContextProvider>
        </ThemeProvider>
    );
}
