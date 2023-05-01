import { type LoaderArgs, redirect, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button";
import CardNumber from "~/components/card-number";
import GenerateLink from "~/components/generate-link";
import Navigation from "~/components/navigation";
import { Path } from "~/models/Path";
import { User } from "~/models/User";

export async function loader({ context: { auth } }: LoaderArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;
  const totalPaths = await Path.where("user_id", user.id).count();
  const totalVisitor = 0;
  const totalUniqueVisitor = 0;
  const numbers = {
    links: {
      number: totalPaths,
      description: `${totalPaths} Total Links`,
    },
    visitor: {
      number: totalVisitor,
      description: `${totalVisitor} Visitors`,
    },
    uniqueVisitor: {
      number: totalUniqueVisitor,
      description: `${totalUniqueVisitor} Visitors`,
    },
  };
  return json({
    user,
    numbers,
  });
}

export default function Dashboard() {
  const { numbers } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center p-8 h-screen">
      <div className="w-full max-w-xl">
        <Navigation path="dashboard" />
        <div className="py-8 space-y-8">
          <GenerateLink />
          <div className="grid grid-cols-3 gap-4">
            <CardNumber
              number={numbers.links.number}
              description={numbers.links.description}
            />
            <CardNumber
              number={numbers.visitor.number}
              description={numbers.visitor.description}
            />
            <CardNumber
              number={numbers.uniqueVisitor.number}
              description={numbers.uniqueVisitor.description}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CardNumber
              number={numbers.links.number}
              description={numbers.links.description}
            />
            <CardNumber
              number={numbers.visitor.number}
              description={numbers.visitor.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
