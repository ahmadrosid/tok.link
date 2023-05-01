import { LoaderArgs, redirect } from "@remix-run/server-runtime";
import { Path } from "~/models/Path";
import { Visitor } from "~/models/Visitor";

export async function loader({ request, params }: LoaderArgs) {
  const path = await Path.where("route", params.route || "").first();
  if (!path) return redirect("/404");
  await Visitor.create({
    user_id: path.user_id,
    path_id: path.id,
    ip_address: request.headers.get("cf-connecting-ip"),
  });
  return redirect(path.url);
}
