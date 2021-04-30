import { execute, Payload } from "../tests-to-implement/01_object_callback";

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      let called = false;
      const payload: Payload = {
        id: "",
        amount: 0,
        callback: (result) => { called = true }
      }
      // Act
      execute(payload);
      // Assert
      expect(called).toBeTruthy();
    })

    it('calls the callback once', () => {
      // Arrange
      let called = 0;
      const payload: Payload = {
        id: "",
        amount: 0,
        callback: (result) => { called++ }
      }
      // Act
      execute(payload);
      // Assert
      expect(called).toBe(1);
    })

    it('calls the callback with correct value', () => {
      // Arrange
      let callbackResult = ""
      const payload: Payload = {
        id: "3",
        amount: 5,
        callback: (result) => { callbackResult = result }
      }
      // Act
      execute(payload);
      // Assert
      expect(callbackResult).toBe("50 for 3");
    })
  })
})