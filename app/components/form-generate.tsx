import { Form, useNavigation } from "@remix-run/react";
import { Button } from "./button";
import { Input } from "./input";
import { Loader2 } from "lucide-react";

export default function FormGenerate() {
  const navigation = useNavigation();

  let isLoaderSubmission =
    navigation.state === "loading" &&
    navigation.formMethod === "POST" &&
    navigation.formAction === navigation.location.pathname;

  return (
    <Form action="/path" method="post" className="flex gap-2">
      <Input
        name="url"
        placeholder="https://example.com/long-url..."
        className="bg-white flex-1"
      />
      <Button disabled={isLoaderSubmission}>
        {isLoaderSubmission && (
          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
        )}
        Short It!
      </Button>
    </Form>
  );
}
