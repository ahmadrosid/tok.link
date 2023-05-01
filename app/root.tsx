import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import { ClientOnly } from "remix-utils";
import styles from "~/tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Superflare App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export default function App() {
  return (
    <html
      lang="en"
      className="min-h-screen bg-background font-sans antialiased"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ClientOnly fallback={null}>
          {() => <Toaster position="bottom-center" reverseOrder={false} />}
        </ClientOnly>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
