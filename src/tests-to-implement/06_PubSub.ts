type Callback = (...params: any[]) => any

export enum PubSubChannels {
  itemUpdated = 'item:updated',
}

export class PubSub {
  private static instance: PubSub
  private subscriptions: Record<string, Callback[]>

  static getInstance() {
    if (!this.instance) {
      this.instance = new PubSub()
    }
    return this.instance
  }

  constructor() {
    this.subscriptions = {} as Record<string, Callback[]>
  }

  async publish(channel: string, payload: unknown) {
    console.log(`publishing ${JSON.stringify(payload)} on ${channel}. ${this.subscriptions[channel]?.length ?? 0} subscriptions`)

    if (!this.subscriptions[channel]) return;

    for (const callback of this.subscriptions[channel]) {
      const time = Math.floor((Math.random() * 50) + 100);
      setTimeout(() => {
        callback(payload)
      }, time);
    }
  }

  async subscribe(channel: string, callback: Callback) {
    console.log(`subscribing to ${channel}`)

    this.subscriptions[channel] = [
      ...(this.subscriptions[channel] || []),
      callback,
    ]
  }
}
