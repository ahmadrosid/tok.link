import { Button } from "~/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";

type Props = {
  number: number;
  description: string;
};

export default function CardNumber({ number, description }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
