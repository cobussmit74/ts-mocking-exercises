import { Item } from "../dependencies/Item";
import { ItemPriceAdjusterVersion2 } from "../tests-to-implement/04_class_dependency_initialized_within_sut";

describe('ItemPriceAdjusterVersion2', () => {
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

      const sut = new ItemPriceAdjusterVersion2();

      spyOn(sut["pricingService"], "getMarkUpPercentage").and.returnValue(20);

      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(24);
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

      const sut = new ItemPriceAdjusterVersion2();

      spyOn(sut["pricingService"], "getMarkDownPercentage").and.returnValue(10);

      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(135);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item: Item = {
        id: "1",
        created: new Date(),
        description: "Item 1",
        name: "Name 1",
        price: 100
      };

      const sut = new ItemPriceAdjusterVersion2();

      // Act
      const actual = await sut.adjustPrice(item);
      // Assert
      expect(actual.price).toBe(100);
    })
  })
})
