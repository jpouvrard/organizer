import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import "@/index.css";

import AddNote from "@/AddNote.tsx";
import App from "@/App.tsx";
import Dashboard from "@/Dashboard.tsx";
import Home from "@/Home.tsx";
import Login from "@/Login.tsx";
import Notes from "@/Notes.tsx";
import AppLayout from "@/layouts/AppLayout.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                Component: MainLayout,
                children: [{ path: "/", Component: Home }],
            },
            {
                Component: AppLayout,
                children: [
                    { path: "add-note", Component: AddNote, loader: () => ({ title: "Ajouter une note" }) },
                    { path: "dashboard", Component: Dashboard, loader: () => ({ title: "Dashboard" }) },
                    { path: "notes", Component: Notes, loader: () => ({ title: "Notes" }) },
                ],
            },
            {
                Component: AuthLayout,
                children: [{ path: "login", Component: Login }],
            },
        ],
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);
