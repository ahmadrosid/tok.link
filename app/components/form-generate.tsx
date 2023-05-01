import { Form, useNavigation } from "@remix-run/react";
import { Button } from "./button";
import { Input } from "./input";
import { Loader2 } from "lucide-react";

export default function FormGenerate() {
  const navigation = useNavigation();

  let isLoaderSubmission =
    ["loading", "submitting"].includes(navigation.state) &&
    navigation.formData?.get("action") === "create" &&
    navigation.formMethod === "post";

  return (
    <Form action="/path" method="post" className="flex gap-2">
      <input name="action" type="hidden" value={"create"} />
      <Input
        name="url"
        required
        placeholder="https://example.com/long-url..."
        className="bg-white flex-1"
      />
      <Button disabled={isLoaderSubmission}>
        {isLoaderSubmission && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        Short It!
      </Button>
    </Form>
  );
}
