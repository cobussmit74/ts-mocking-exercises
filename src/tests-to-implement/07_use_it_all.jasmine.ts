import { InMemoryCache } from "../dependencies/InMemoryCache";
import { Item } from "../dependencies/Item";
import { ItemRepository } from "../dependencies/ItemRepository";
import { ItemProcessor } from "../tests-to-implement/07_use_it_all";
import { PubSub, PubSubChannels } from "./06_PubSub";

describe('ItemProcessor', () => {
  function createSut(
    cache: InMemoryCache | null = null,
    itemRepository: ItemRepository | null = null,
  ): ItemProcessor {
    return new ItemProcessor(
      cache ?? new InMemoryCache(),
      itemRepository ?? new ItemRepository());
  }

  function createItemRepo(items: Item[]): {
    repo: ItemRepository,
    spy: jasmine.Spy,
  } {
    const repo = new ItemRepository();

    const getAllSpy = spyOn(repo, "getAll").and.returnValue(items);

    return {
      repo: repo,
      spy: getAllSpy
    };
  }

  function createMemoryCache(): {
    cache: InMemoryCache,
    updateSpy: jasmine.Spy,
  } {
    const cache = new InMemoryCache();

    const updateSpy = spyOn(cache, "update");

    return {
      cache: cache,
      updateSpy: updateSpy
    };
  }

  function createPubSubSpies(): {
    pubSub: PubSub,
    publishSpy: jasmine.Spy,
  } {
    const pubSub = PubSub.getInstance();
    const publishSpy = spyOn(pubSub, "publish");

    return {
      pubSub: pubSub,
      publishSpy: publishSpy
    };
  }

  function createItems(): Item[] {
    return [
      {
        id: "1",
        name: "name 1",
        price: 111,
        description: "description 1",
        created: new Date(),
      },
      {
        id: "2",
        name: "name 2",
        price: 222,
        description: "description 2",
        created: new Date(),
      },
      {
        id: "3",
        name: "name 3",
        price: 333,
        description: "description 3",
        created: new Date(),
      }
    ]
  }

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const { repo, spy: repoGetAllSpy } = createItemRepo([]);
      const sut = createSut(null, repo);
      sut["isProcessing"] = true;
      // Act
      await sut.processItems();
      // Assert
      expect(repoGetAllSpy).not.toHaveBeenCalled();
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = createItems()[0];

        const { repo } = createItemRepo([item]);
        const { cache, updateSpy } = createMemoryCache();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems()
        // Assert
        expect(updateSpy).toHaveBeenCalledWith(item);
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item = createItems()[0];

        const { repo } = createItemRepo([item]);
        const { cache } = createMemoryCache();
        const { publishSpy } = createPubSubSpies();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems();
        // Assert
        expect(publishSpy).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item);
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const items = createItems();
        const item1 = items[0];

        const { repo } = createItemRepo([item1]);
        const { cache } = createMemoryCache();
        const { publishSpy } = createPubSubSpies();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems();
        await sut.processItems();
        // Assert
        expect(publishSpy).toHaveBeenCalledTimes(1);
      })
    })

    describe('given newly added unprocessed items', () => {
      it('processes all newly added items every x seconds', async () => {
        // Arrange
        const item1 = createItems()[0];
        const item2 = createItems()[1];
        const allItems = [item1];

        const { repo } = createItemRepo(allItems);
        const { cache } = createMemoryCache();
        const { publishSpy } = createPubSubSpies();

        const sut = createSut(cache, repo);
        // Act
        const clock = jasmine.clock();
        clock.install();
        await sut.processItems();
        allItems.push(item2);
        await sut.processItems();
        clock.tick(5001);
        jasmine.clock().uninstall();
        setTimeout(() => { }, 0);
        // Assert
        expect(publishSpy).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2);
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const items = createItems();

        const { repo } = createItemRepo(items);
        const { cache, updateSpy } = createMemoryCache();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems()
        // Assert
        for (const item of items) {
          expect(updateSpy).toHaveBeenCalledWith(item);
        }
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const items = createItems();

        const { repo } = createItemRepo(items);
        const { cache } = createMemoryCache();
        const { publishSpy } = createPubSubSpies();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems();
        // Assert
        for (const item of items) {
          expect(publishSpy).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item);
        }
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const items = createItems();

        const { repo } = createItemRepo(items);
        const { cache } = createMemoryCache();
        const { publishSpy } = createPubSubSpies();

        const sut = createSut(cache, repo);
        // Act
        await sut.processItems();
        await sut.processItems();
        // Assert
        expect(publishSpy).toHaveBeenCalledTimes(items.length);
      })
    })
  })
})
