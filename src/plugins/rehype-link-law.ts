import { relFor } from '../data/link-policy';

/*
 * Applies the link law to every absolute link in Markdown and MDX content: a Markdown link reaches this tree as an
 * `element` named `a`, a hand-written `<a>` in MDX as an `mdxJsxTextElement`/`mdxJsxFlowElement`. Both leave in a new
 * tab with the `rel` that src/data/link-policy.ts decides, so no page keeps its own copy of the rule.
 */

interface MdxAttribute {
  type: string;
  name?: string;
  value?: unknown;
}

interface Node {
  type: string;
  tagName?: string;
  name?: string;
  properties?: Record<string, unknown>;
  attributes?: MdxAttribute[];
  children?: Node[];
}

const ABSOLUTE = /^https?:\/\//i;

function applyToElement(node: Node): void {
  const href = node.properties?.href;
  if (typeof href !== 'string' || !ABSOLUTE.test(href) || !node.properties) return;
  node.properties.rel = relFor(href).split(' ');
  node.properties.target = '_blank';
}

function setAttribute(attributes: MdxAttribute[], name: string, value: string): void {
  const existing = attributes.find((attribute) => attribute.type === 'mdxJsxAttribute' && attribute.name === name);
  if (existing) existing.value = value;
  else attributes.push({ type: 'mdxJsxAttribute', name, value });
}

function applyToJsx(node: Node): void {
  const attributes = node.attributes ?? [];
  const href = attributes.find((attribute) => attribute.type === 'mdxJsxAttribute' && attribute.name === 'href')?.value;
  if (typeof href !== 'string' || !ABSOLUTE.test(href)) return;
  setAttribute(attributes, 'rel', relFor(href));
  setAttribute(attributes, 'target', '_blank');
  node.attributes = attributes;
}

function walk(node: Node): void {
  if (node.type === 'element' && node.tagName === 'a') applyToElement(node);
  else if ((node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') && node.name === 'a') applyToJsx(node);
  node.children?.forEach(walk);
}

/** Rehype plugin: every absolute link in the content follows the link law. */
export default function rehypeLinkLaw() {
  return (tree: Node): void => walk(tree);
}
