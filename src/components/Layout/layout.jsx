import Header from "../Header/Header";

function Layout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default Layout;
