import { ID, type Models } from "appwrite";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

import { account } from "@/lib/appwrite";
import { useToasts } from "@/lib/context/ToastContext";

type UserContextType = {
    current: Models.User<Models.Preferences> | Models.Session | null;
    login: (email: string, password: string) => Promise<Error | null>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
};

const initialState: UserContextType = {
    current: null,
    login: () => Promise.resolve(null),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
};

export const UserContext = createContext<UserContextType>(initialState);

export function UserProvider({ children }: { children: ReactNode }) {
    const { pushToast } = useToasts();
    const [user, setUser] = useState<Models.User<Models.Preferences> | Models.Session | null>(null);

    async function login(email: string, password: string) {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        try {
            const loggedIn = await account.createEmailPasswordSession(email, password);
            setUser(loggedIn);
            window.location.replace("/dashboard");
            return null;
        } catch (error) {
            pushToast({
                title: "Erreur",
                content: error instanceof Error ? error.message : "Une erreur serveur est apparue",
                type: "danger",
            });
            throw new Error((error as Error).message);
        }
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function register(email: string, password: string) {
        await account.create(ID.unique(), email, password);
        await login(email, password);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch (err) {
            setUser(null);
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        init();
    }, []);

    return <UserContext value={{ current: user, login, logout, register }}>{children}</UserContext>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) throw new Error("useUser must be used within a UserProvider");
    return context;
}
