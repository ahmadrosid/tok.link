import { cn } from "~/lib/utils";
import { Button } from "./button";
import { Link } from "@remix-run/react";

export default function Navigation({
  path,
}: {
  path: "histories" | "dashboard";
}) {
  return (
    <div className="flex justify-between gap-2 p-2 rounded-md bg-violet-500">
      <div className="flex gap-2 px-2">
        <Link to="/dashboard">
          <Button
            size="sm"
            className={cn(
              path === "dashboard" ? "bg-violet-700/75" : "bg-violet-500",
              "px-4 hover:bg-violet-800/75"
            )}
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/histories">
          <Button
            size="sm"
            className={cn(
              path === "histories" ? "bg-violet-700/75" : "bg-violet-500",
              "px-4 hover:bg-violet-800/75"
            )}
          >
            Histories
          </Button>
        </Link>
      </div>
      <form method="post" action="/logout">
        <Button
          type="submit"
          size="sm"
          className="px-4 bg-white text-primary hover:bg-violet-800/75 hover:text-primary-foreground"
        >
          Log out
        </Button>
      </form>
    </div>
  );
}
