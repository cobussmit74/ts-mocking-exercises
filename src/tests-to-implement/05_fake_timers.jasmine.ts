import { generateDayMessage } from "../tests-to-implement/05_fake_timers";

describe('generateDayMessage', () => {
  it('returns a message containing the current time', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-05 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Monday");
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-05 15:33:17"));
    const clock = jasmine.clock();
    clock.install();
    clock.mockDate(now)
    clock.tick(43000);
    // Act
    const actual = generateDayMessage();
    // Assert
    console.log(actual);
    expect(actual).toBe("[3:34:00 PM]: Today is Monday");
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-05 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Monday");
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-06 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Tuesday");
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-07 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Wednesday");
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-08 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Thursday");
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-09 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Friday");
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-10 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Saturday");
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    const now = new Date(Date.parse("2021-04-11 15:33:17"));
    jasmine.clock().mockDate(now)
    // Act
    const actual = generateDayMessage();
    // Assert
    expect(actual).toBe("[3:33:17 PM]: Today is Sunday");
  })
})
