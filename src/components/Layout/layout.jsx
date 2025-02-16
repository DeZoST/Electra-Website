import { Suspense } from "react";
import Header from "@/components/Header/Header";

function Layout({ children }) {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center w-full h-dvh">
                    Loading...
                </div>
            }
        >
            <Header />
            <main>{children}</main>
        </Suspense>
    );
}

export default Layout;
