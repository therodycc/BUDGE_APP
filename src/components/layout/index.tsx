import { LayoutPropsI } from '../../interfaces/layout/layout.interface'
import Aside from './aside/Index'
import Header from './header/Index'

const Layout = ({ children }: LayoutPropsI) => {
    return (
        <>
            <div className="g-sidenav-show bg-light ">
                <aside
                    className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-white"
                >
                    <Aside />
                </aside>
                <main className="main-content position-relative  border-radius-lg bg-light ">
                    <Header />
                    <div className="container-fluid py-4">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Layout