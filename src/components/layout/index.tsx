import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutPropsI } from '../../interfaces/layout/layout.interface'
import Aside from './aside/Index'
import Header from './header/Index'
import { meAction } from '../../redux/actions/auth.action';

const Layout = ({ children }: LayoutPropsI) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(meAction())
    }, []);
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