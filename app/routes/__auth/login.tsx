import { Form, Link, useActionData } from "@remix-run/react";
import { json, redirect, type ActionArgs } from "@remix-run/cloudflare";
import { User } from "~/models/User";
import { Input } from "~/components/input";
import { Button } from "~/components/button";
import { Label } from "~/components/label";
import { ChevronLeft } from "lucide-react";

export async function action({ request, context: { auth } }: ActionArgs) {
  if (await auth.check(User)) {
    return redirect("/dashboard");
  }

  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (await auth.attempt(User, { email, password })) {
    return redirect("/dashboard");
  }

  return json({ error: "Invalid credentials" }, { status: 400 });
}

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="grid place-content-center h-screen w-full relative">
      <div className="absolute top-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <Link to="/">
            <Button variant="ghost">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <Form method="post" className="grid gap-2 w-72">
        <h1 className="font-bold text-center text-2xl">Log in</h1>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>

        {actionData?.error && (
          <div style={{ color: "red" }}>{actionData.error}</div>
        )}

        <div className="py-2">
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </div>

        <Link to="/register">
          <Button variant="link" className="w-full">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}
