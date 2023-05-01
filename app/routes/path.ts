import { type ActionArgs, redirect, json } from "@remix-run/server-runtime";
import { nanoid } from "nanoid";
import { Path } from "~/models/Path";
import { User } from "~/models/User";

type UpdateRequest = {
  path: Path;
  url: string;
  title?: string;
  route: string;
};

async function handleUpdate({ path, url, title, route }: UpdateRequest) {
  path.url = url;
  path.title = title || "";
  path.route = route;
  path.save();
  return redirect("/histories");
}

export async function action({ request, context: { auth } }: ActionArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;

  const formData = new URLSearchParams(await request.text());
  let url = formData.get("url") as string;
  let title = formData.get("title") as string;
  let route = formData.get("route") as string;
  let id = formData.get("id") as unknown as number;

  if (id) {
    let path = await Path.find(id);
    if (!path) {
      return json({ error: "Path not found!" });
    }
    return handleUpdate({ path, url, title, route });
  }

  if (!route) {
    route = nanoid(6);
  }

  await new Promise((resolve, _) => setTimeout(() => resolve(true), 2000));

  await Path.create({
    user_id: user.id,
    title,
    url,
    route,
  });

  return redirect("/histories");
}
