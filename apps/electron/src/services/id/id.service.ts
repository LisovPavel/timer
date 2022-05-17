import { v4 } from "uuid";

export class IdService {
  getNewId = () => v4();
}
