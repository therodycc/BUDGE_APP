import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { LayoutPropsI } from '../../interfaces/layout/layout.interface'
import { navAuth } from '../../settings/nav/navbar.config'
import Button from '../common/button'
import { v4 as gxUUID } from 'uuid';

const AuthLayout: FC<LayoutPropsI> = ({ children }) => {

    const router: NextRouter = useRouter()

    const [navLayoutSettings, setNavLayoutSettings] = useState(navAuth);

    useEffect(() => {
        handleNav(router.pathname)
    }, [router?.pathname]);

    const handleNav = (href: string) => {
        setNavLayoutSettings(_prev => _prev.map((item, index) => {
            href === item.href ? item.active = true : item.active = false
            return item
        }))
    }

    return (
        <>
            <div
                className="sign-in-bg overflow-hidden"
                style={{ height: "100vh" }}
            >
                <nav
                    className="border-radius-xl  blur m-3 p-2 "
                >
                    <div
                        className="d-flex align-items-center justify-content-end pt-2"
                    >
                        {
                            navLayoutSettings.map((item, index) => (
                                <Link
                                    key={gxUUID()}
                                    href={item.href}>
                                    <div className="m-0 p-0">
                                        <Button
                                            action={() => { handleNav(item.href) }}
                                            bgClass={item.active ? "success" : "light"}
                                            type={"submit"}
                                            loading={false}
                                        >
                                            {item.title}
                                        </Button>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </nav>

                <div className="col-lg-12 d-flex align-items-center ">
                    {children}
                </div>
                <svg
                    style={{}}
                    className="position-fixed bottom-0 m-0 p-0 me-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="#155799"
                        fillOpacity="1"
                        d="M0,288L21.8,245.3C43.6,203,87,117,131,101.3C174.5,85,218,139,262,186.7C305.5,235,349,277,393,261.3C436.4,245,480,171,524,138.7C567.3,107,611,117,655,106.7C698.2,96,742,64,785,53.3C829.1,43,873,53,916,69.3C960,85,1004,107,1047,133.3C1090.9,160,1135,192,1178,224C1221.8,256,1265,288,1309,256C1352.7,224,1396,128,1418,80L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </>
    )
}

export default AuthLayout