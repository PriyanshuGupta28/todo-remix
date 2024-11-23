import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "@radix-ui/themes/styles.css";
import "./tailwind.css";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,600;1,200&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Theme appearance={theme}>
      <div
        className={`transition-colors duration-500 ease-in-out ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
        {/* <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Toggle Theme
        </button> */}
      </div>
    </Theme>
  );
}
