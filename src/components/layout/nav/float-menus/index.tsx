import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextRouter, useRouter } from 'next/router';
import { gxUUID } from '../../../../helpers/uuid-generator.helper';
import authProvider from '../../../../providers/auth/auth.provider';
import { floatOptionsSettings } from '../../../../settings/nav/float-menu.settings';

let uuidGX = gxUUID()

const FloatMenu = () => {
    const router: NextRouter = useRouter()

    const logout = async () => {
        await authProvider.logout();
        router.push("/auth/sign-in");
    }

    return (
        <>
            <ul 
                className="dropdown-menu shadow-lg dropdown-menu-end p-3 mt-sm-n2 me-3 show"
                data-bs-popper="none"
                style={{ width: "300px", }}
            >
                {floatOptionsSettings({ logout }).map((item, index) => (
                    <li className="mb-2"
                        key={uuidGX + item.title}
                    >
                        <a
                            className="dropdown-item border-radius-md cursor-pointer"
                            onClick={() => item.action()}
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
                    </li>
                ))}
            </ul>
        </>
    )
}

export default FloatMenu