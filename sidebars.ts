import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the AChat documentation site.
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
        'features/personal-chats-and-contacts',
        'features/devices-and-recovery',
        'features/anonymous-chats',
        'features/passwords-and-encryption',
        'features/groups-and-communities',
        'features/status',
        'features/keep-chats-and-accounts',
        'features/threads-and-replies',
        'features/file-sharing',
        'features/manage-messages',
        'features/writing-messages',
        'features/search-and-history',
        'features/embeddable-widget',
        'features/notifications-and-email',
        'features/themes-and-accessibility',
        'features/privacy-on-this-device',
        'features/location-history',
        'features/plans-and-pricing',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: [
        'concepts/how-it-works',
        'concepts/security-and-encryption',
        'concepts/admin-oversight',
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
