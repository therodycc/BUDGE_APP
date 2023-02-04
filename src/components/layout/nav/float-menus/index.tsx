import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { gxUUID } from '../../../../helpers/uuid-generator.helper';
import authProvider from '../../../../providers/auth/auth.provider';
import { floatOptionsSettings } from '../../../../settings/nav/float-menu.settings';

let uuidGX = gxUUID()

const FloatMenu = () => {
    const router: NextRouter = useRouter()

    const logout = async () => {
        await authProvider.logout();
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        router.reload();
    }

    return (
        <>
            <ul
                className="dropdown-menu shadow-lg dropdown-menu-end p-3 mt-sm-n2 me-3 show"
                data-bs-popper="none"
                style={{ width: "300px", }}
            >
                {floatOptionsSettings({ logout }).map((item, index) => (
                    <Link
                        href={item?.href || ""}
                        key={uuidGX + item.title}
                    >
                        <a
                            className="dropdown-item border-radius-md cursor-pointer"
                            onClick={() => item?.action?.()}
                        >
                            <div className="d-flex align-items-center py-1">
                                <FontAwesomeIcon
                                    className="bg-primary me-2 text-white p-3 rounded-circle shadow-lg"
                                    icon={item?.icon}
                                />
                                <div className="ms-2">
                                    <h6 className="text-sm font-weight-normal my-auto text-secondary">
                                        {item?.title}
                                    </h6>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </ul>
        </>
    )
}

export default FloatMenu