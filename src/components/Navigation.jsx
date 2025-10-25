import { useTranslation } from "react-i18next";
import SideMenuItem from "./SideMenuItem.jsx";

export default function Navigation() {

    const { t } = useTranslation();
    const localPath = window.location.pathname;
    console.log("Current path:", localPath);

    return (
         <nav className="nav" aria-label="Primary">
            <SideMenuItem menuItemName={t("nav.dashboard")} to={'/'} />
            <SideMenuItem menuItemName={t("nav.posts")} to={'/posts'} />
            <SideMenuItem menuItemName={t("nav.contact")} to={'/contact_us'} />
        </nav>
    );
}