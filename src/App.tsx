import { Outlet } from "react-router";
import { UserProvider } from "./lib/context/user";

export default function App() {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    );
}
