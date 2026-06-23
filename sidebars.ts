import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the AChat (Anonymous Chat AI) documentation site.
 * Every entry maps to a real Markdown file under docs/.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/anonymous-chats',
        'features/passwords-and-encryption',
        'features/file-sharing',
        'features/threads-and-replies',
        'features/groups-and-communities',
        'features/embeddable-widget',
        'features/keep-chats-and-accounts',
        'features/themes-and-accessibility',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: [
        'concepts/how-it-works',
        'concepts/security-and-encryption',
        'concepts/data-privacy-and-deletion',
      ],
    },
    'faq',
    'changelog',
    {
      type: 'category',
      label: 'About',
      collapsed: true,
      items: ['about-the-author'],
    },
  ],
};

export default sidebars;
