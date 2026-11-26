import React from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import EcosystemBand from '../../components/Ecosystem/Band';

type Props = WrapperProps<typeof FooterType>;

/*
 * The theme footer, wrapped: More from Zaions sits above it on every docs page (ecosystem standard, OD-31), except
 * /ecosystem, which is that list.
 */
export default function FooterWrapper(props: Props): React.ReactElement {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.replace(/\/$/, '') === '/ecosystem' ? null : <EcosystemBand />}
      <Footer {...props} />
    </>
  );
}
