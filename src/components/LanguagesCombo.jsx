import { useEffect } from 'react';
import Select from 'react-select'
import { useTranslation } from 'react-i18next';
import { useLang } from '../app/LangProvider';

export default function LanguagesCombo() {

    const { t, i18n } = useTranslation();
    const { lang, setLang } = useLang();
    
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    const options = [
        { value: 'en', label: t('languages.english') },
        { value: 'he', label: t('languages.hebrew') },
        { value: 'ru', label: t('languages.russian') }
    ];

    const handleChange = (selectedOption) => {
        const lang = selectedOption?.value;
        if (!lang)
            return;
        setLang(lang);
    };

    return (
        <Select
            options={options}
            value={options.find(o => o.value === lang)}
            onChange={handleChange}
        />
    );
}