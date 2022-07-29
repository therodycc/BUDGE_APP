import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { v4 as gxUUID } from 'uuid';
import { UIContext } from "../../../context";
import { AsideOptionsI } from "../../../interfaces/layout/aside/aside.interface";
import { asideOptions } from "../../../settings/aside/aside-opts.settings";

const Aside = () => {
    const router: NextRouter = useRouter()
    const [options, setOptions] = useState<AsideOptionsI[]>([]);

    useEffect(() => { handleSelected(router.pathname) }, [router.pathname]);
    const { showAsideBar } = useContext(UIContext);
    const handleSelected = (path: string) => {
        setOptions(asideOptions?.map((opt, i) => {
            path === opt.link ? opt.active = true : opt.active = false;
            return opt
        }));
    };

    return (
        <React.Fragment>
            <aside className={`sidebar-show ${showAsideBar ? "sidenav" : ""} navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white`} >
                <div
                    className="collapse navbar-collapse h-auto"
                >
                    <ul className="navbar-nav">
                        {options.map((item, index) => (
                            <Link href={item.link} key={gxUUID()} >
                                <li className="nav-item" >
                                    <span className={`transition-sm nav-link text-secondary cursor-pointer ${item.active && 'bg-primary active'}`}>
                                        <div className="text-primary icon-rounded bg-white shadow text-center me-2 d-flex align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={item.icon} />
                                        </div>
                                        <span className="nav-link-text ms-1">{item.title}</span>
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                    <div className="mx-3"></div>
                </div>
            </aside>
        </React.Fragment >
    );
};

export default Aside;
