import { Link } from "@remix-run/react";
import { Button } from "~/components/button";
import { Input } from "~/components/input";

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
      <div className="flex justify-center flex-col gap-4">
        <div className="text-center grid gap-2">
          <h1 className="text-5xl font-bold tracking-tight">Tok.link</h1>
          <p>
            The Best and The Shortest Link Shortener for known your audience!
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/long-url..."
            className="bg-white flex-1"
          />
          <Button>Short It!</Button>
        </div>
      </div>
    </div>
  );
}
