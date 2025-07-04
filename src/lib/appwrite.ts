import { Account, Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

async function getCurrentUser() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

export { client, account, databases, getCurrentUser };
