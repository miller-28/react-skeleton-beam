import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LangCtx = createContext(null);

// config ->
const KEY = "app.lang.v1";                   // bump to v2 if you change behavior
const TTL_MS = 365 * 24 * 60 * 60 * 1000;    // 1 year (optional)

function canUseStorage() {
    try {
        const k = "__t"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true;
    } catch { return false; }
}

function readLangFromURL() {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    return ["en", "he", "ru"].includes(urlLang) ? urlLang : null;
}

function detectBrowserLang() {
    const lang = (navigator.language || "en").toLowerCase();
    if (lang.startsWith("he")) 
        return "he";
    if (lang.startsWith("ru")) 
        return "ru";
    return "en";
}

function loadPersistedLang() {
    if (!canUseStorage()) return null;
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) 
            return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.value) 
            return null;
        if (Date.now() - (parsed.ts || 0) > TTL_MS) {
            return null;
        }
        return parsed.value;
    } catch { return null; }
}

function persistLang(lang) {
    if (!canUseStorage()) return;
    try {
        localStorage.setItem(KEY, JSON.stringify({ 
            value: lang, 
            ts: Date.now() 
        }));
    } catch {}
}

export function LangProvider({ children }) {

    const [lang, setLangState] = useState(() =>
        readLangFromURL() ?? loadPersistedLang() ?? detectBrowserLang()
    );

  // persist on change
    useEffect(() => { 
        persistLang(lang); 
    }, [lang]);

    // cross-tab sync
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === KEY && e.newValue) {
                try {
                const { value } = JSON.parse(e.newValue);
                if (value && value !== lang) setLangState(value);
                } catch {}
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [lang]);

    // react to ?lang=... navigation (optional)
    useEffect(() => {
        const onPop = () => {
        const fromURL = readLangFromURL();
        if (fromURL) 
            setLangState(fromURL);
    };
    window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    const setLang = (language) => setLangState(language);
    const value = useMemo(() => ({ lang, setLang }), [lang]);

    return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
    const ctx = useContext(LangCtx);
    if (!ctx) 
        throw new Error("useLang must be used within LangProvider");
    return ctx;
}