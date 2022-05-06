import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AsideOptionsI } from "../../../interfaces/layout/aside/aside.interface";
import { asideOptions } from "../../../settings/aside-opts.settings";
import { v4 as gxUUID} from 'uuid';

const Aside = () => {
    const [options, setOptions] = useState<AsideOptionsI[]>([]);
    const [title, setTitle] = useState("THR-Budge");
    const [icon, setIcon] = useState("fa fa-font-awesome");

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
            <div className="">
                <a className="navbar-brand m-0" target="_blank">
                    <i className="icon" aria-hidden="false"></i>
                    <span className="ms-1 font-weight-bold text-dark">{title}</span>
                </a>
            </div>
            <hr className="horizontal bg-dark mt-0 mb-2" />
            <div
                className="collapse navbar-collapse h-auto"
            >
                <ul className="navbar-nav">
                    {options.map((item, index) => (
                        <Link href={item.link} key={gxUUID()} >
                            <li

                                className="nav-item"
                                onClick={() => handleSelected(item.link)}
                            >
                                <span className={`nav-link text-secondary ${item.active && 'bg-primary active'}`}>
                                    <div className="text-dark text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className={item.icon}></i>
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
        </>
    );
};

export default Aside;
