import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** The language the page renders in (each build renders one). */
export default function useLocale(): { locale: string } {
  const { i18n } = useDocusaurusContext();
  return { locale: i18n.currentLocale };
}
