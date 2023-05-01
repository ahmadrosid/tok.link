import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "~/components/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/input";
import { Button } from "./button";
import { Edit2, Loader2 } from "lucide-react";
import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

type Props = {
  item: {
    id: number;
    route: string;
    url: string;
    title?: string;
  };
};

export default function DialogEditPath({ item }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  let isLoaderSubmission =
    ["loading", "submitting"].includes(navigation.state) &&
    navigation.formData?.get("id") === `${item.id}` &&
    navigation.formData?.get("action") === "update" &&
    navigation.formMethod === "post";

  useEffect(() => {
    if (!isLoaderSubmission && isOpen) {
      setIsOpen(false);
    }
  }, [isLoaderSubmission]);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} size="sm" variant={"outline"}>
          <Edit2 className="w-3 h-3 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <Form method="post" action="/path">
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="action" value={"update"} />
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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

          <DialogFooter>
            <Button type="submit" disabled={isLoaderSubmission}>
              {isLoaderSubmission && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save changes
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
