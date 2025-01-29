import { Suspense } from "react";
import Header from "@/components/Header/Header";

function Layout({ children }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main>{children}</main>
        </Suspense>
    );
}

export default Layout;
