import { redirect } from "react-router-dom";
import { getCurrentUser } from "./appwrite";

type ProtectedLoaderProps = {
    title: string;
};

export async function protectedLoader(props: ProtectedLoaderProps) {
    const user = await getCurrentUser();

    if (!user) {
        return redirect("/login");
    }

    return props;
}
