import { Link } from "react-router";
import { useUser } from "./lib/context/user";

function App() {
    const user = useUser();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-800 font-normal text-white leading-6 text-opacity-90">
            <div className="m-0 flex min-w-[320px] max-w-(--breakpoint-xl) flex-col place-items-center justify-between p-8 text-center">
                <h1 className="p-8 font-bold text-5xl">Organizer</h1>
                {user?.current ? (
                    <>
                        <button
                            onClick={() => user?.logout()}
                            type="button"
                            className="cursor-pointer rounded-md bg-secondary px-3.5 py-2.5 font-semibold text-sm text-white shadow-xs hover:bg-secondary/80"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex gap-4">
                        <Link
                            to="/login"
                            className="cursor-pointer rounded-md bg-secondary px-3.5 py-2.5 font-semibold text-sm text-white shadow-xs hover:bg-secondary/80"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="cursor-pointer rounded-md bg-secondary px-3.5 py-2.5 font-semibold text-sm text-white shadow-xs hover:bg-secondary/80"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
