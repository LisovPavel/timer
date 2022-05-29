import { IntervalStatus } from "@timer/utils";
import { IntervalsService } from "../intervals.service";
import { Interval, ExtendedInterval, IntervalServiceState } from "@timer/types";

const getMockInterval = (interval: Partial<Interval>): ExtendedInterval => {
  return {
    id: "1234",
    duration: 1000,
    leftTimeToEnd: 1000,
    status: IntervalStatus.pending,
    isStarted: false,
    isActive: false,
    isFinished: false,
    progress: 0,
    finishAt: 1000,
    startAt: 0,
    ...interval,
  };
};

describe("Intervals Service", () => {
  test("Should return empty array", () => {
    const service = new IntervalsService();
    const intervals = service.getIntervals(0);
    expect(intervals).toEqual([]);
  });

  test("Should return pending interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }]);
    const intervals = service.getIntervals(-1);
    const mockedInterval = getMockInterval({ id: intervals[0].id });
    expect(intervals).toEqual([mockedInterval]);
  });

  test("Should return active interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }]);
    const intervals = service.getIntervals(100);
    const mockedInterval = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.active,
      isActive: true,
      isStarted: true,
      progress: 10,
      leftTimeToEnd: 900,
    });
    expect(intervals).toEqual([mockedInterval]);
  });

  test("Should return finished interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }]);
    const intervals = service.getIntervals(1000);
    const mockedInterval = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.finished,
      isFinished: true,
      isStarted: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    expect(intervals).toEqual([mockedInterval]);
  });

  test("Should return pending second interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const intervals = service.getIntervals(100);
    const mockedInterval1 = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.active,
      isActive: true,
      isStarted: true,
      progress: 10,
      leftTimeToEnd: 900,
    });
    const mockedInterval2 = getMockInterval({
      id: intervals[1].id,
      startAt: 1000,
      finishAt: 2000,
    });
    expect(intervals).toEqual([mockedInterval1, mockedInterval2]);
  });

  test("Should return active second interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const intervals = service.getIntervals(1000);
    const mockedInterval1 = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const mockedInterval2 = getMockInterval({
      id: intervals[1].id,
      status: IntervalStatus.active,
      startAt: 1000,
      finishAt: 2000,
      isActive: true,
      isStarted: true,
      isFinished: false,
      progress: 0,
    });
    expect(intervals).toEqual([mockedInterval1, mockedInterval2]);
  });

  test("Should return active second interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const intervals = service.getIntervals(1500);
    const mockedInterval1 = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
    });
    const mockedInterval2 = getMockInterval({
      id: intervals[1].id,
      status: IntervalStatus.active,
      startAt: 1000,
      finishAt: 2000,
      isActive: true,
      isStarted: true,
      isFinished: false,
      progress: 50,
    });
    expect(intervals).toEqual([mockedInterval1, mockedInterval2]);
  });

  test("Should return finished second interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const intervals = service.getIntervals(2000);
    const mockedInterval1 = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const mockedInterval2 = getMockInterval({
      id: intervals[1].id,
      startAt: 1000,
      finishAt: 2000,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    expect(intervals).toEqual([mockedInterval1, mockedInterval2]);
  });

  test("Should return finished second interval", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const intervals = service.getIntervals(3000);
    const mockedInterval1 = getMockInterval({
      id: intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
    });
    const mockedInterval2 = getMockInterval({
      id: intervals[1].id,
      startAt: 1000,
      finishAt: 2000,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
    });
    expect(intervals).toEqual([mockedInterval1, mockedInterval2]);
  });

  test("Should return not finished state", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const state = service.getState(1500);
    const mockedInterval1 = getMockInterval({
      id: state.intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const mockedInterval2 = getMockInterval({
      id: state.intervals[1].id,
      status: IntervalStatus.active,
      startAt: 1000,
      finishAt: 2000,
      isActive: true,
      isStarted: true,
      isFinished: false,
      progress: 50,
      leftTimeToEnd: 500,
    });
    const expectedState: IntervalServiceState = {
      intervals: [mockedInterval1, mockedInterval2],
      isFinished: false,
      extraTime: 0,
      allIntervalsDuration: 2000,
    };
    expect(state).toEqual(expectedState);
  });

  test("Should return finished state", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const state = service.getState(2000);
    const mockedInterval1 = getMockInterval({
      id: state.intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const mockedInterval2 = getMockInterval({
      id: state.intervals[1].id,
      startAt: 1000,
      finishAt: 2000,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const expectedState: IntervalServiceState = {
      intervals: [mockedInterval1, mockedInterval2],
      isFinished: true,
      extraTime: 0,
      allIntervalsDuration: 2000,
    };
    expect(state).toEqual(expectedState);
  });

  test("Should return finished state with extraTime", () => {
    const service = new IntervalsService();
    service.add([{ duration: 1000 }, { duration: 1000 }]);
    const state = service.getState(3000);
    const mockedInterval1 = getMockInterval({
      id: state.intervals[0].id,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const mockedInterval2 = getMockInterval({
      id: state.intervals[1].id,
      startAt: 1000,
      finishAt: 2000,
      status: IntervalStatus.finished,
      isActive: false,
      isStarted: true,
      isFinished: true,
      progress: 100,
      leftTimeToEnd: 0,
    });
    const expectedState: IntervalServiceState = {
      intervals: [mockedInterval1, mockedInterval2],
      isFinished: true,
      extraTime: 1000,
      allIntervalsDuration: 2000,
    };
    expect(state).toEqual(expectedState);
  });
});
