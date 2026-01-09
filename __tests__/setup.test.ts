import * as fc from 'fast-check';

describe('Test Setup', () => {
  it('should have Jest configured correctly', () => {
    expect(true).toBe(true);
  });

  it('should have fast-check working', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === 'number';
      })
    );
  });

  it('should have TypeScript types working', () => {
    const testString: string = 'Hello, World!';
    expect(typeof testString).toBe('string');
  });
});