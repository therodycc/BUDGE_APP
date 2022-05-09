import Nav from "../nav";
import NavView from "../nav/nav-view";

const Header = () => {
    return (
        <>
            <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            >
                <div className="container-fluid py-1 px-3">
                    <NavView />
                    <Nav />
                </div>
            </nav>
        </>
    );
};

export default Header;
