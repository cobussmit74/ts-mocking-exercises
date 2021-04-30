import * as getAllFunctions from "../dependencies/get_all";
import { Item } from "../dependencies/Item";
import { getAllItemsOnSale } from "../tests-to-implement/02_function_return_value";

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      var allItems: Item[] = [
        {
          id: "1",
          created: new Date(),
          description: "Item 1",
          name: "Name 1",
          price: 5
        },

        {
          id: "2",
          created: new Date(),
          description: "Item 2",
          name: "Name 2",
          price: 15
        },

        {
          id: "3",
          created: new Date(),
          description: "Item 3",
          name: "Name 3",
          price: 40
        },

        {
          id: "4",
          created: new Date(),
          description: "Item 4",
          name: "Name 4",
          price: 2.99
        },
      ];

      spyOn(getAllFunctions, "getAll").and.returnValue(allItems);

      // Act
      const actual = await getAllItemsOnSale()
      // Assert
      expect(actual.length).toBe(2);
    })
  })
})
