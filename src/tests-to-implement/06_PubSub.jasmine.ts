import { PubSub } from "../tests-to-implement/06_PubSub";

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      const spy = jasmine.createSpy();
      const callPromise = listenForCall(spy);

      const sut = new PubSub();
      // Act
      await sut.subscribe("test1", spy);
      await sut.publish("test1", "yum!");

      setTimeout(() => { }, 0);

      await callPromise;
      expect(spy).toHaveBeenCalled();
    })

    async function listenForCall(callback: jasmine.Spy) {
      return new Promise<void>((resolve) => {
        callback.and.callFake(() => {
          resolve()
        })
      })
    }

    xit('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const sut = PubSub.getInstance();

      var complete1 = createCallbackPromise(sut, "test2");
      var complete2 = createCallbackPromise(sut, "test2");

      var publish = new Promise((success, reject) => {
        sut.publish("test2", "yum!");
        success(void 0);
      });

      // Act
      await Promise.all([complete1, complete2, publish]);
    })

    function createCallbackPromise(sut: PubSub, channel: string): Promise<void> {
      return new Promise((success, reject) => {
        const ourCallbackFunction = (...params: any[]) => {
          success(void 0);
        };

        sut.subscribe(channel, ourCallbackFunction);
      });
    }
  })
})
