import { useTranslation } from "react-i18next";
import LanguagesCombo from "./LanguagesCombo.jsx";
import { LangProvider } from "../app/LangProvider.jsx";

export default function Header({ children }) {  
    
    const { t } = useTranslation();
    
    return (
        <header className="header">
            <h1>{t('app.title')}</h1>
            <span className="muted">
                <LangProvider>
                    <LanguagesCombo />
                </LangProvider>
            </span>
            {children}
        </header>
    );
}