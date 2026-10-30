import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import NotFoundContent from '@theme-original/NotFound/Content';
import type NotFoundType from '@theme/NotFound/Content';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundType>;

/**
 * The not-found content is never indexed, its links still followed (search audit SA-ACHAT-004). It renders both
 * build/404.html and any unknown path under the docs root (inside the docs layout), and its robots meta overrides the
 * site-wide one in docusaurus.config.ts.
 */
export default function NotFoundContentWrapper(props: Props): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <NotFoundContent {...props} />
    </>
  );
}
