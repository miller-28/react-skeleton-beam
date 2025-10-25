import { useTranslation, Trans } from "react-i18next";

export default function Dashboard() {
  
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('pages.dashboard.title')}</h2>
      <p>
        <Trans 
          i18nKey="pages.dashboard.content" 
          components={{ strong: <strong />, em: <em /> }}
        />
      </p>
    </>
  );
}