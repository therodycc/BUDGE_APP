import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LayoutPropsI } from '../../interfaces/layout/layout.interface';
import profitsProvider from '../../providers/profits/profits.provider';
import userProvider from '../../providers/user/user.provider';
import { getMeAction } from '../../redux-toolkit/slices/me.slice';
import { addProfits } from '../../redux-toolkit/slices/profits.slice';
import Aside from './aside';
import Header from './header';


const Layout: FC<LayoutPropsI> = ({ children }) => {

    const dispatch = useDispatch()

    useEffect(() => { getMe() }, []);

    const getMe = async () => {
        const res = await userProvider.getMe()
        if (res.error) return console.log(res)
        dispatch(getMeAction({ me: res?.data }));
    }

    useEffect(() => {
        getAllProfits()
    }, []);

    const getAllProfits = async () => {
        const res = await profitsProvider.getAll()
        dispatch(addProfits({ result: res?.data }))
    }
    return (
        <>
            <div className="g-sidenav-show bg-light ">
                <Aside />
                <main className="main-content position-relative  border-radius-lg bg-light d-flex flex-column overflow-scroll" style={{ height: "100vh" }}>
                    <Header />
                    <div className="container-fluid py-4" style={{ flex: "1 1 auto" }}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Layout