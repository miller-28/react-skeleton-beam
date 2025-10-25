import { Outlet } from "react-router-dom";

export default function CurrentPage() {
    return (
        <section className="section">
            <div className="card">
                <Outlet />
            </div>
        </section>
    );
}