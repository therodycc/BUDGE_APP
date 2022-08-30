import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-toolkit/store';
import BgLayoutPage from '../../layout/bg-layout-page';
import Profits from '../profits';
import Wallet from './wallet';
import WaysOfEntries from './way-of-entries';

const Profile = () => {
    const { me } = useSelector((state: RootState) => state);

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
                                    {me?.result?.firstName} {me?.result?.lastName}
                                </h6>
                                <p className="m-0 font-weight-normal text-sm text-secondary">
                                    {me?.result?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="row">
                            <div className=" col-sm-6">
                                <div className='card card-body'>
                                    <Profits />
                                </div>
                            </div>
                            <div className=" col-sm-6">
                                <WaysOfEntries />
                                <Wallet />
                            </div>
                        </div>
                    </div>
                </div>
            </BgLayoutPage>
        </React.Fragment>
    );
}


export default Profile