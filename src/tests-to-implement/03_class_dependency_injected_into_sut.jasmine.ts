import { Item } from "../dependencies/Item";
import { ItemPriceAdjuster } from "../tests-to-implement/03_class_dependency_injected_into_sut";
import { PricingServiceBuilder } from "./PricingServiceBuilder";

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item: Item = {
        id: "1",
        created: new Date(),
        description: "Item 1",
        name: "Name 1",
        price: 20
      };

      const priceService = new PricingServiceBuilder()
        .withMarkUpPerc(10)
        .withMarkDownPerc(20)
        .build();
      const sut = new ItemPriceAdjuster(priceService);
      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(22);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item: Item = {
        id: "1",
        created: new Date(),
        description: "Item 1",
        name: "Name 1",
        price: 150
      };
      const priceService = new PricingServiceBuilder()
        .withMarkUpPerc(10)
        .withMarkDownPerc(20)
        .build();
      const sut = new ItemPriceAdjuster(priceService);
      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(120);
    })
  })

  describe('price is equal to 100', () => {
    xit('will not alter the price', async () => {
      // Arrange
      const item: Item = {
        id: "1",
        created: new Date(),
        description: "Item 1",
        name: "Name 1",
        price: 100
      };
      const priceService = new PricingServiceBuilder()
        .withMarkUpPerc(10)
        .withMarkDownPerc(20)
        .build();
      const sut = new ItemPriceAdjuster(priceService);
      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(100);
    })
  })
})
