import { Model } from "superflare";

export class Visitor extends Model {
  toJSON(): VisitorRow {
    return super.toJSON();
  }
}

Model.register(Visitor);

export interface Visitor extends VisitorRow {}
