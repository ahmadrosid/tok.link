import { type ActionArgs, redirect } from "@remix-run/server-runtime";
import { nanoid } from "nanoid";
import { Path } from "~/models/Path";
import { User } from "~/models/User";

export async function action({ request, context: { auth } }: ActionArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;

  const formData = new URLSearchParams(await request.text());
  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  let route = formData.get("route") as string;
  if (!route) {
    route = nanoid();
  }

  const path = await Path.create({
    user_id: user.id,
    title,
    url,
    route,
  });

  console.log(path);

  return redirect("/histories");
}
