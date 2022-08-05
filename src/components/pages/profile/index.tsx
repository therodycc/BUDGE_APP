import { faPaintbrush } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import ButtonCard from '../../common/button/button-card';
import ModalAlert from '../../common/modal/alert';
import BgLayoutPage from '../../layout/bg-layout-page';
import ChangePassword from './change-password';

const Profile = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <>
            <BgLayoutPage>
                {/* <ModalAlert active={true} setToggle={() => { }} >
                    <div className='p-5'>
                        <h5 className='mb-0' style={{
                            color: "rgb(74 74 74)"
                        }}>Password successfully changed</h5>
                        <p className='text-secondary'>let's go to login</p>

                        <p>La pagina se recargara en 5 segundos</p>
                    </div>
                </ModalAlert> */}
                <div className="card card-body bg-light mx-3 mx-md-4 mt-n12">
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
        </>
    );
}

export default Profile