import { type LoaderArgs, redirect, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ArrowUpRight, Clock, Share2 } from "lucide-react";
import { Button } from "~/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";
import FormGenerate from "~/components/form-generate";
import Navigation from "~/components/navigation";
import { Path } from "~/models/Path";
import { User } from "~/models/User";
import toast from "react-hot-toast";
import DialogEditPath from "~/components/dialog-edit-path";
import { timeAgo } from "~/lib/utils";
import DeleteButton from "~/components/delete-button";

export async function loader({ request, context: { auth } }: LoaderArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;
  const histories = await Path.where("user_id", user.id)
    .orderBy("createdAt", "desc")
    .get();

  return json({
    user,
    histories,
    scheme: (request.headers.get("cf-visitor") as any)?.scheme || "http",
    host: request.headers.get("host") || "127.0.0.1:8788",
  });
}

export default function Histories() {
  const { host, scheme, histories } = useLoaderData<typeof loader>();
  const notify = () => toast.success("Link copied. Ready to paste and share!");

  return (
    <div className="flex justify-center p-8 h-screen">
      <div className="w-full max-w-xl">
        <Navigation path="histories" />
        <div className="py-8 space-y-4">
          <FormGenerate />
          {histories.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                  <div className="w-full flex justify-between">
                    <p>{`${scheme}://${host}/${item.route}`}</p>
                    <a
                      target="_blank"
                      href={`${scheme}://${host}/${item.route}`}
                    >
                      <Button variant={"outline"} size="sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardTitle>
                <CardDescription>{item.url}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-between border-t pt-2 w-full items-center">
                  <p className="text-sm inline-flex gap-2 items-center text-gray-500">
                    <Clock className="w-4 h-4" />
                    {timeAgo(new Date(item.createdAt))}
                  </p>
                  <div className="flex gap-2">
                    <DialogEditPath item={item} />
                    <Button
                      onClick={() => {
                        window.navigator.clipboard
                          .writeText(`${host}/${item.route}`)
                          .finally(notify);
                      }}
                      size="sm"
                      variant={"outline"}
                    >
                      <Share2 className="w-3 h-3 mr-2" />
                      Share
                    </Button>
                    <DeleteButton id={item.id} action="/path" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
