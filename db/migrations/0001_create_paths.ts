import { Schema } from "superflare";

export default function () {
  return Schema.create("paths", (table) => {
    table.increments("id");
    table.integer("user_id");
    table.string("route").unique();
    table.string("url");
    table.string("title");
    table.timestamps();
  });
}
