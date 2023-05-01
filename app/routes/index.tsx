import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/server-runtime";
import { Button } from "~/components/button";
import GenerateLink from "~/components/generate-link";
import { User } from "~/models/User";

export async function loader({ context: { auth } }: LoaderArgs) {
  return {
    isAuthenticated: await auth.check(User),
  };
}

export default function Index() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <div className="w-full h-screen grid place-content-center relative">
      <div className="absolute top-0 left-0 right-0 p-8">
        <div className="flex gap-2 container mx-auto">
          <div className="w-full">
            <a href="/" className="font-semibold text-lg">
              Tok.link
            </a>
          </div>
          <div className="flex gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="link">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="link">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <GenerateLink />
    </div>
  );
}
