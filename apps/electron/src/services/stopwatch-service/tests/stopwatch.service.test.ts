import { StopwatchService } from "../stopwatch.service";

describe("StopwatchService", () => {
  test("should call callback", async () => {
    const service = new StopwatchService(10);
    const callback = jest.fn(() => {});
    service.onTick(callback);
    service.start();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(callback).toHaveBeenCalled();
  });

  test("shouldn't call callback if stop", async () => {
    const service = new StopwatchService(10);
    const callback = jest.fn(() => {});
    service.onTick(callback);
    service.start();
    service.stop();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(callback).not.toHaveBeenCalled();
  });

  test("shouldn't call callback if pause", async () => {
    const service = new StopwatchService(10);
    const callback = jest.fn(() => {});
    service.onTick(callback);
    service.start();
    service.pause();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(callback).not.toHaveBeenCalled();
  });

  test("should call callback after pause", async () => {
    const service = new StopwatchService(10);
    const callback = jest.fn(() => {});
    service.onTick(callback);
    service.start();
    service.pause();
    service.start();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(callback).toHaveBeenCalled();
  });

  test("pastedTime should increase", async () => {
    const service = new StopwatchService(10);
    service.start();
    const pastedTime = service.pastedTime;
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(pastedTime).toBeLessThan(service.pastedTime);
  });
});
