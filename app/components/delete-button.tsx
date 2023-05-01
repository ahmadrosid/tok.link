import { Form, useNavigation } from "@remix-run/react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type Props = {
  action: string;
  id: number;
};

export default function DeleteButton({ action, id }: Props) {
  const navigation = useNavigation();

  let isLoaderSubmission =
    ["loading", "submitting"].includes(navigation.state) &&
    navigation.formData?.get("action") === "delete" &&
    navigation.formData?.get("id") === `${id}` &&
    navigation.formMethod === "post";

  return (
    <Form action={action} method="post" className="flex gap-2">
      <input name="id" type="hidden" value={id} />
      <input name="action" type="hidden" value={"delete"} />
      <Button disabled={isLoaderSubmission} size="sm" variant={"destructive"}>
        {isLoaderSubmission && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        Delete
      </Button>
    </Form>
  );
}
