import { type LoaderArgs, redirect, json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import CardAnalytic from "~/components/card-analytic";
import GenerateLink from "~/components/generate-link";
import Navigation from "~/components/navigation";
import { Path } from "~/models/Path";
import { User } from "~/models/User";
import { Visitor } from "~/models/Visitor";

export async function loader({ context: { auth, env } }: LoaderArgs) {
  if (!(await auth.check(User))) {
    return redirect("/login");
  }

  const user = (await auth.user(User)) as User;
  const totalPaths = await Path.where("user_id", user.id).count();
  const totalVisitor = await Visitor.where("user_id", user.id).count();
  let totalUniqueVisitor = 0;

  try {
    const query = `select COUNT(DISTINCT ip_address) AS totalUniqueVisitor from visitors where user_id = '${user.id}';`;
    console.log("query", query);

    const res = await env.DB.prepare(query).all();
    if (res.success) {
      totalUniqueVisitor = (res.results as any[])[0].totalUniqueVisitor;
      console.log("totalUniqueVisitor", totalUniqueVisitor);
      console.log("res.results", res.results);
    }
  } catch (e: any) {
    console.log("error", e);
  }

  const analytic = {
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
      description: `${totalUniqueVisitor} Unique Visitors`,
    },
  };

  return json({
    user,
    analytic,
  });
}

export default function Dashboard() {
  const { analytic } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center p-8 h-screen">
      <div className="w-full max-w-xl">
        <Navigation path="dashboard" />
        <div className="py-8 space-y-8">
          <GenerateLink />
          <CardAnalytic
            number={analytic.links.number}
            description={analytic.links.description}
          />
          <div className="grid grid-cols-2 gap-8">
            <CardAnalytic
              number={analytic.visitor.number}
              description={analytic.visitor.description}
            />
            <CardAnalytic
              number={analytic.uniqueVisitor.number}
              description={analytic.uniqueVisitor.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
