import { useActionState } from "react";
import { redirect } from "react-router";
import { useUser } from "./lib/context/user";

export default function Login() {
    const user = useUser();

    if (user?.current) {
        redirect("/");
    }

    const [state, submitAction, isPending] = useActionState(async (_previousState: unknown, formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            await user?.login(email, password);
            return null;
        } catch (error) {
            return { error, data: { email, password } };
        }
    }, null);

    return (
        <>
            <form className="space-y-6" action={submitAction}>
                <div>
                    <label htmlFor="email" className="block font-medium text-sm/6 text-white">
                        Adresse email
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                            defaultValue={state?.data?.email}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block font-medium text-sm/6 text-white">
                            Mot de passe
                        </label>
                        <div className="text-sm">
                            <a href="/" className="font-semibold text-secondary hover:text-secondary/80">
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="-outline-offset-1 focus:-outline-offset-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                            defaultValue={state?.data?.password}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer justify-center rounded-md bg-secondary px-3 py-1.5 font-semibold text-sm/6 text-white shadow-xs hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
                        disabled={isPending}
                    >
                        {isPending ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </div>
            </form>

            <p className="mt-10 text-center text-gray-400 text-sm/6">
                Pas encore de compte ?{" "}
                <a href="/" className="font-semibold text-secondary hover:text-secondary/80">
                    Créer un compte
                </a>
            </p>
        </>
    );
}
