import { Form, Link, useActionData } from "@remix-run/react";
import { json, redirect, type ActionArgs } from "@remix-run/cloudflare";
import { User } from "~/models/User";
import { hash } from "superflare";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import ChevronLeft from "~/components/chevron-left";

export async function action({ request, context: { auth } }: ActionArgs) {
  if (await auth.check(User)) {
    return redirect("/dashboard");
  }

  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (await User.where("email", email).count()) {
    return json({ error: "Email already exists" }, { status: 400 });
  }

  const user = await User.create({
    email,
    password: await hash().make(password),
  });

  auth.login(user);

  return redirect("/dashboard");
}

export default function Register() {
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
        <h1 className="font-bold text-center text-2xl">Register</h1>

        <div>
          <label htmlFor="email">Email</label>
          <Input name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Input name="password" type="password" required />
        </div>

        {actionData?.error && (
          <div style={{ color: "red" }}>{actionData.error}</div>
        )}

        <Button type="submit">Register</Button>

        <Link to="/login">
          <Button variant="link" className="w-full">
            Log in
          </Button>
        </Link>
      </Form>
    </div>
  );
}
