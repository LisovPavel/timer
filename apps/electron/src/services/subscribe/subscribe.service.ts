export type Subscriber<Payload> = (payload: Payload) => void;

export class SubscribeService<Payload> {
  subs = new Map<Subscriber<Payload>, Subscriber<Payload>>();
  subscribe = (subscriber: Subscriber<Payload>) => {
    if (this.subs.has(subscriber)) {
      return () => this.unsubscribe(subscriber);
    }
    this.subs.set(subscriber, subscriber);
    return () => this.unsubscribe(subscriber);
  };
  unsubscribe = (subscriber: Subscriber<Payload>) => {
    this.subs.delete(subscriber);
    return true;
  };
  publishEvent = (payload: Payload) => {
    for (const sub of this.subs.values()) {
      sub(payload);
    }
  };
}
