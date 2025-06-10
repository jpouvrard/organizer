import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center bg-zinc-800 px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center font-bold text-2xl/9 text-white tracking-tight">
                        Connectez-vous à votre compte
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
