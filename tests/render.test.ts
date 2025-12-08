import { render } from 'inboundemail';

describe('render', () => {
  test('render function is exported and callable', () => {
    expect(typeof render).toBe('function');
  });

  test('render function returns a promise', () => {
    // Note: The actual rendering requires @react-email/render which needs
    // --experimental-vm-modules. This test just verifies the function exists
    // and returns a promise-like object
    const result = render({});
    expect(result).toBeInstanceOf(Promise);
    // Catch the expected error to prevent unhandled rejection
    result.catch(() => {});
  });
});
