import {
  addProgress,
  extractStatus,
  addStatus,
  addStartFinishAt,
  calcSumDurations,
} from "@timer/utils";
import {
  Interval,
  ExtendedInterval,
  IntervalServiceState,
  InitialInterval,
} from "@timer/types";

import { IdService } from "../id/id.service";

export class IntervalsService {
  idService: IdService;
  constructor(private intervals: Interval[] = []) {
    this.idService = new IdService();
  }
  add = (intervals: InitialInterval[]) => {
    intervals.forEach((interval) => {
      this.intervals.push({
        id: this.idService.getNewId(),
        duration: interval.duration,
      });
    });
  };
  delete = (id: string) => {
    this.intervals = this.intervals.filter((interval) => interval.id === id);
  };
  clear = () => {
    this.intervals = [];
  };
  getIntervals = (passedTime: number): ExtendedInterval[] => {
    return this.extendIntervals(passedTime);
  };

  getState = (passedTime: number): IntervalServiceState => {
    const intervals = this.getIntervals(passedTime);
    const isFinished = intervals.every((interval) => interval.isFinished);
    const allIntervalsDuration = calcSumDurations(
      this.intervals,
      0,
      this.intervals.length - 1
    );
    const extraTime = isFinished ? passedTime - allIntervalsDuration : 0;
    return {
      intervals,
      isFinished,
      extraTime,
      allIntervalsDuration,
    };
  };
  private extendIntervals = (passedTime: number): ExtendedInterval[] => {
    //todo fix extendIntervals types
    return this.intervals
      .map(addStartFinishAt)
      .map(addStatus(passedTime))
      .map(extractStatus)
      .map(addProgress(passedTime)) as ExtendedInterval[];
  };
}
