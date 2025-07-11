import { Link } from "react-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/lib/context/SidebarContext";
import { useUser } from "@/lib/context/UserContext";

export default function Header() {
    const user = useUser();
    const { toggleSidebar } = useSidebar();

    return (
        <header className="flex w-full bg-header-primary-foreground lg:border-b">
            <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-5">
                <div className="flex w-full items-center justify-between gap-2 border-gray-200 border-b px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-5 dark:border-gray-800">
                    <Button aria-label="Toggle Sidebar" type="button" variant="outline" onClick={toggleSidebar}>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>Sidebar toggle button</title>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Button>
                    <Button variant="outline" className="lg:hidden">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>Toggle sidebar</title>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Button>
                </div>
                <div className="hidden w-full items-center justify-between gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none">
                    {user?.current ? (
                        <>
                            <Button onClick={() => user?.logout()} type="button" variant="outline">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Button asChild variant="outline">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
