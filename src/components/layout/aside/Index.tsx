import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AsideOptionsI } from "../../../interfaces/layout/aside/aside.interface";
import { asideOptions } from "../../../settings/aside-opts.settings";
import { v4 as gxUUID } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Aside = () => {
    const [options, setOptions] = useState<AsideOptionsI[]>([]);

    useEffect(() => {
        handleSelected(Router.pathname)
    }, []);

    const handleSelected = (path: string) => {
        setOptions(
            asideOptions?.map((opt, i) => {
                path === opt.link ? opt.active = true : opt.active = false;
                return opt
            })
        );
    };

    return (
        <>
            <aside
                className="sidebar-show sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
            >
                <div
                    className="collapse navbar-collapse h-auto sidebar-show"
                >
                    <ul className="navbar-nav">
                        {options.map((item, index) => (
                            <Link href={item.link} key={gxUUID()} >
                                <li
                                    className="nav-item"
                                    onClick={() => handleSelected(item.link)}
                                >
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
        </>
    );
};

export default Aside;
