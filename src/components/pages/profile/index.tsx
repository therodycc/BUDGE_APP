import { faPaintbrush } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ButtonCard from '../../common/button/button-card';
import ModalAlert from '../../common/modal/alert';
import BgLayoutPage from '../../layout/bg-layout-page';
import ChangePassword from './change-password';

const Profile = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const { user: { me } } = useSelector((state: any) => state);

    return (
        <React.Fragment>
            <BgLayoutPage>
                <div className="card card-body bg-light mx-3 mx-md-4 mt-n12">
                    <div className='d-flex align-items-center'>
                        <div className="col-sm-auto col-4">
                            <div className="" >
                                <img
                                    src="/assets/images/man-profile.png"
                                    alt="bruce"
                                    className="w-70 rounded-circle shadow-sm border border-light border-1 avatar avatar-lg user-profile-head-image"
                                />
                            </div>
                        </div>
                        <div className="col-8 p-3 " >
                            <div className="">
                                <h6 className="mb-0 font-weight-bolder text-secondary">
                                    {me?.firstName} {me?.lastName}
                                </h6>
                                <p className="m-0 font-weight-normal text-sm text-secondary">
                                    {me?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='card p-3'>
                            <span>Forma de cobros</span>
                            <div className='card-body row'>
                                <span>quincenal</span>
                                <span>semanal</span>
                                <span>mensual</span>
                            </div>
                        </div>
                    </div>
                    <div className="row  my-3 ">
                        <div className="col-sm-6">
                            <ButtonCard
                                title={"Change Password"}
                                action={() => setShowChangePassword(true)}
                                icon={faPaintbrush}
                                bgClass={"info"}
                            />
                        </div>
                        <div className=" col-sm-6">
                            <ButtonCard
                                action={() => { }}
                                title={"Edit my profile"}
                                icon={faPaintbrush}
                                bgClass={"danger"}
                            />
                        </div>
                    </div>
                </div>
            </BgLayoutPage>
            {showChangePassword && (
                <ChangePassword setToggle={setShowChangePassword} active={showChangePassword} />
            )}
        </React.Fragment>
    );
}

export default Profile