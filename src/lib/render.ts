import { render as reactEmailRender } from '@react-email/render';

/**
 * Renders a React Email component to an HTML string.
 *
 * @param node - The React component to render (React.ReactNode)
 * @returns The rendered HTML string
 *
 * @example
 * ```ts
 * import { render } from 'inboundemail';
 * import { MyEmailTemplate } from './emails/my-template';
 *
 * const html = await render(<MyEmailTemplate name="John" />);
 * ```
 */
export async function render(node: unknown): Promise<string> {
  return reactEmailRender(node as never);
}
