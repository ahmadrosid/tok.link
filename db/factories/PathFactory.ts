import { Factory } from "superflare";
import { Path } from "~/models/Path";
import { faker } from "@faker-js/faker";

export const PathFactory = Factory.for(Path).definition(() => ({
  id: faker.datatype.number(),
  user_id: faker.datatype.number(),
  route: faker.internet.url(),
  url: faker.internet.url(),
  title: faker.lorem.words(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
}));
