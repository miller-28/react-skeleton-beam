import Select from 'react-select'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function LanguagesCombo() {

    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n?.language || 'en');

    const options = [
        { value: 'en', label: t('languages.english') },
        { value: 'he', label: t('languages.hebrew') },
        { value: 'ru', label: t('languages.russian') }
    ];

    const handleChange = (selectedOption) => {
        const lang = selectedOption?.value;
        if (!lang) return;
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
    };

    useEffect(() => {
        setCurrentLang(i18n?.language || 'en');
    }, [i18n?.language]);

    return (
        <Select
            options={options}
            value={options.find(o => o.value === currentLang)}
            onChange={handleChange}
        />
    );
}