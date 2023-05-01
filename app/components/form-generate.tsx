import { Form } from "@remix-run/react";
import { Button } from "./button";
import { Input } from "./input";

export default function FormGenerate() {
  return (
    <Form action="/path" method="post" className="flex gap-2">
      <Input
        name="url"
        placeholder="https://example.com/long-url..."
        className="bg-white flex-1"
      />
      <Button>Short It!</Button>
    </Form>
  );
}
