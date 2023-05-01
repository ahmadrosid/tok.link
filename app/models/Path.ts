import { Model } from "superflare";

export class Path extends Model {
  toJSON(): PathRow {
    return super.toJSON();
  }
}

Model.register(Path);

export interface Path extends PathRow {}
