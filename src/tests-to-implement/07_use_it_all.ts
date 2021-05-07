import { InMemoryCache } from "../dependencies/InMemoryCache";
import { Item } from "../dependencies/Item";
import { ItemRepository } from "../dependencies/ItemRepository";
import { PubSub, PubSubChannels } from "./06_PubSub";

export class ItemProcessor {
  private pubSub: PubSub
  private isProcessing: boolean = false
  private processedItems: Item[] = []

  constructor(
    private cache: InMemoryCache,
    private itemRepository: ItemRepository,
  ) {
    this.pubSub = PubSub.getInstance()
  }

  async processItems(): Promise<void> {
    if (this.isProcessing) {
      return
    }
    this.isProcessing = true

    const unprocessedItems = await this.getUnprocessedItems()

    for (const item of unprocessedItems) {
      this.cache.update(item)
      this.pubSub.publish(PubSubChannels.itemUpdated, item)
      this.processedItems.push(item)
    }

    this.isProcessing = false
    this.processAgainAfterInterval()
  }

  private async getUnprocessedItems(): Promise<Item[]> {
    const items = await this.itemRepository.getAll()
    return items.filter((_) => !this.processedItems.includes(_))
  }

  private processAgainAfterInterval() {
    setTimeout(() => {
      this.processItems()
    }, 5000)
  }
}
