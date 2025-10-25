import { useTranslation } from "react-i18next";

export default function ContactUs() {

  const { t } = useTranslation();

  return (
    <>
      <p>
        <h2>{t('pages.contact.title')}</h2>
      </p>
    </>
  );
}