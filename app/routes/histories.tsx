import { type LoaderArgs, redirect, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Clock, Edit2, Share2 } from "lucide-react";
import { Button } from "~/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";
import FormGenerate from "~/components/form-generate";
import GenerateLink from "~/components/generate-link";
import Navigation from "~/components/navigation";
import { Path } from "~/models/Path";
import { User } from "~/models/User";

export async function loader({ context: { auth } }: LoaderArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;
  const histories = await Path.where("user_id", user.id).get();

  return json({
    user,
    histories,
  });
}

export default function Histories() {
  const { user, histories } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center p-8 h-screen">
      <div className="w-full max-w-xl">
        <Navigation path="histories" />
        <div className="py-8 space-y-4">
          <FormGenerate />
          {histories.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>https://tok.link/{item.route}</CardTitle>
                <CardDescription>{item.url}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex justify-between border-t pt-2 w-full items-center">
                  <p className="text-sm inline-flex gap-2 items-center">
                    <Clock className="text-gray-300 w-4 h-4" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant={"outline"}>
                      <Edit2 className="w-3 h-3 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant={"outline"}>
                      <Share2 className="w-3 h-3 mr-2" />
                      Share
                    </Button>
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
