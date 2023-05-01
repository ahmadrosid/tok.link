import { Link } from "@remix-run/react";
import { Button } from "~/components/button";
import GenerateLink from "~/components/generate-link";

export default function Index() {
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
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
      <GenerateLink />
    </div>
  );
}
