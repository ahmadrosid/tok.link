import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "~/components/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/input";
import { Button } from "./button";
import { Edit2 } from "lucide-react";
import { Form } from "@remix-run/react";
import { FormEventHandler, useRef } from "react";

type Props = {
  item: {
    id: number;
    route: string;
    url: string;
    title?: string;
  };
};

export default function DialogEditPath({ item }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant={"outline"}>
          <Edit2 className="w-3 h-3 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form ref={formRef} method="post" action="/path">
          <input type="hidden" name="id" value={item.id} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="route" className="text-right">
                Route
              </Label>
              <Input
                id="route"
                name="route"
                defaultValue={item.route}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Url
              </Label>
              <Input
                id="url"
                name="url"
                defaultValue={item.url}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={item?.title === "null" ? "" : item.title}
                className="col-span-3"
              />
            </div>
          </div>
        </Form>
        <DialogFooter>
          <Button onClick={() => formRef.current?.submit()} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
