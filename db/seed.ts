import { seed } from "superflare";
import { PathFactory } from "./factories/PathFactory";

export default seed(async () => {
  await PathFactory.create();
});
