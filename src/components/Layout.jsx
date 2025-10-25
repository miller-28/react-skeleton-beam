import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";  
import CurrentPage from "./CurrentPage.jsx";

export default function Layout({ children }) {

    const [navOpen, setNavOpen] = useState(false);
    const { t, i18n } = useTranslation();

    // toggle RTL when language is Hebrew
    useEffect(() => {
        const lang = i18n.language || "en";
        const isRtl = lang.startsWith("he") || lang === "he";
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
        document.body.classList.toggle("rtl", isRtl);
    }, [i18n.language]);

    return (
        <div className="page">
            <div className="app">
                
                {/* Mobile top bar */}
                <div className="navbar">
                <button className="button" onClick={() => setNavOpen(v => !v)}>
                    {navOpen ? "Hide Menu" : "Show Menu"}
                </button>
                </div>

                {/* Sidebar (collapsible on mobile) */}
                <aside className={`sidebar ${navOpen ? "" : "collapsed"}`}>
                    <div className="brand">{t('app.side_title')}</div>
                    <Navigation />
                </aside>

                {/* Main panel (centered layout via page grid) */}
                <main className="main" role="main">
                    <Header />
                    <CurrentPage />
                </main>
                <footer>
                    <p>
                        © 2025 React Skeleton - Beam <br/>
                        <small>By Jonathan Miller</small>
                    </p>       
                </footer>

            </div>
        </div>
    );
}