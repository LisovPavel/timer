import { SubscribeService } from "../subscribe.service";

describe("SubscribeService tests", () => {
  test("should call all subscribers", () => {
    const service = new SubscribeService();
    const mockFn1 = jest.fn(() => {});
    const mockFn2 = jest.fn(() => {});
    service.subscribe(mockFn1);
    service.subscribe(mockFn2);
    service.publishEvent({});

    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
  });

  test("should called with event payload", () => {
    const service = new SubscribeService();
    const payload = {};
    const mockFn = jest.fn(() => {});
    service.subscribe(mockFn);
    service.publishEvent(payload);

    expect(mockFn).toHaveBeenCalledWith(payload);
  });

  test("should unsubscribe subs", () => {
    const service = new SubscribeService();
    const mockFn1 = jest.fn(() => {});
    const mockFn2 = jest.fn(() => {});
    const unsubscribe = service.subscribe(mockFn1);
    service.subscribe(mockFn2);
    unsubscribe();
    service.publishEvent({});

    expect(mockFn1).not.toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
  });

  test("shouldn't subscribe the same function twice", () => {
    const service = new SubscribeService();
    const mockFn1 = jest.fn(() => {});
    service.subscribe(mockFn1);
    service.subscribe(mockFn1);
    service.publishEvent({});

    expect(mockFn1).toBeCalledTimes(1);
  });
});
