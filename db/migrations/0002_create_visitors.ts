import { Schema } from "superflare";

export default function () {
  return Schema.create("visitors", (table) => {
    table.increments("id");
    table.integer("user_id");
    table.integer("path_id");
    table.string("ip_address");
    table.timestamps();
  });
}
