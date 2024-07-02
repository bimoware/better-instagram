import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./pages/Page.tsx";
import TestPage from "./pages/TestPage.tsx";

import "./global.css";
import "./scripts/Client.ts";
// Creating the route for the browser
const router = createBrowserRouter([
	{
		path: "/better-instagram/",
		element: <Main />,
	},
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "/test",
		element: <TestPage />,
	},
]);

// Root
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
