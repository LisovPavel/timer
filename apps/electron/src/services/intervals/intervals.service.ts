import { IdService } from "../id/id.service";
import {
  addFinishAt,
  addStatus,
  extractStatus,
  addProgress,
} from "@timer/utils";

export enum IntervalStatus {
  "pending" = "PENDING",
  "active" = "ACTIVE",
  "finished" = "FINISHED",
}

export type Interval = {
  id: string;
  duration: number;
  status?: IntervalStatus;
  isStarted?: boolean;
  isActive?: boolean;
  isFinished?: boolean;
  progress?: number;
  finishAt?: number;
};

type ExtendInterval = Required<Interval>;

export class IntervalsService {
  idService: IdService;
  constructor(private intervals: Interval[] = []) {
    this.idService = new IdService();
  }
  add = (duration: number) => {
    const id = this.idService.getNewId();
    this.intervals.push({ id: this.idService.getNewId(), duration });
    return id;
  };
  delete = (id: string) => {
    this.intervals = this.intervals.filter((interval) => interval.id === id);
  };
  getIntervals = (passedTime: number): ExtendInterval[] => {
    return this.extendIntervals(passedTime);
  };
  private extendIntervals = (passedTime: number): ExtendInterval[] => {
    //todo fix extendIntervals types
    return this.intervals
      .map(addFinishAt)
      .map(addStatus(passedTime))
      .map(extractStatus)
      .map(addProgress(passedTime)) as ExtendInterval[];
  };
}
