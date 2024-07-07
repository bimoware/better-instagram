import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";
import TestPage from "./pages/test/TestPage.tsx";

import "./global.css";
import "./scripts/Client.ts";
import SideBar from "./components/SideBar.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";

// Creating the route for the browser
const router = createBrowserRouter([
	{
		path: "/chat/",
		element: <ChatPage />,
	},
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/test",
		element: <TestPage />,
	},
	{
		path: "/settings",
		element: <SettingsPage/>
	}
]);



// Root
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="flex h-screen">
			<SideBar/>
			<div className="ml-[5%]">
				<RouterProvider router={router} />
			</div>
		</div>
	</React.StrictMode>
);
