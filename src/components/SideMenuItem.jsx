import { NavLink, Link } from "react-router-dom";

export default function SideMenuItem({menuItemName, to}) {
    
    const localPath = window.location.pathname;
    
    return (
        <NavLink to={to}>
            {menuItemName}
        </NavLink>
    );
}