import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardWidget from "../../components/common/card/CardWidget";
import Layout from "../../components/layout";
import ModalProfits from "../../components/pages/profits/modals";
import { currencyFormat } from "../../helpers/currency.helper";
import { ProfitI } from "../../interfaces/app/profit/profit.interface";
import { ProfitsI } from "../../interfaces/profits/profits.interface";
import { disabledItemAction, getProfitsAction, removeProfitsAction } from "../../redux/actions/profits.action";
import { getUserAction } from "../../redux/actions/user.action";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [profits, setProfits] = useState([]);
    const [dataProfitsSelected, setDataProfitsSelected] = useState(null);

    const state = useSelector((state: any) => state)
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch()

    // let user: any = state?.user?.user?.user || []


    useEffect(() => {
        setProfits(state?.profits?.profits)
    }, [state?.profits?.profits]);


    useEffect(() => {
        dispatch(getProfitsAction())
        dispatch(getUserAction())
    }, []);


    const disabledItem = (item: ProfitI) => {
        dispatch(disabledItemAction(item))
    }

    const removeProfit = (item: ProfitsI) => {
        dispatch(removeProfitsAction(item?.uuid || ''))
    }

    return (
        <>
            <div className="container-fluid px-2 px-md-4">
                <div
                    className="page-header min-height-300 border-radius-xl mt-4"
                    style={{
                        backgroundImage:
                            "url(/assets/images/bg-profile.jfif)",
                    }}
                >
                    <span className="mask  bg-gradient-info  opacity-4"></span>
                </div>
                <div className="card card-body mx-3 mx-md-4 mt-n12">
                    <div className="row gx-2 mb-2">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <img
                                    src={
                                        user?.image ||
                                        "/assets/images/man-profile.png"
                                    }
                                    alt="profile_image"
                                    className="w-100 border-radius-lg shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="col-auto my-auto">
                            <div className="h-100 mx-2">
                                <h5 className="mb-1">
                                    {user?.firstName} {user?.lastName}
                                </h5>
                                <p className="mb-0 font-weight-normal text-sm">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">

                        </div>
                    </div>
                    <div className="row  my-3">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <button
                                        type="button"
                                        className="btn btn-success btn-rounded"
                                        onClick={() => {
                                            setShowModal(true)
                                            setDataProfitsSelected(null)
                                        }} >
                                        <i className="fas fa-plus-circle "></i>
                                    </button>
                                </div>
                            </div>
                            {profits &&
                                profits?.map((item: any) => (
                                    <CardWidget
                                        handleDelete={removeProfit}
                                        handleUpdate={() => {
                                            setShowModal(true)
                                            setDataProfitsSelected(item)
                                        }}
                                        key={`card-widget-${item.id}`}
                                        title={item?.type}
                                        description={currencyFormat(item?.amount)}
                                        toggleEnabled={() => disabledItem(item)}
                                        item={item}
                                    />
                                ))}
                        </div>
                        <div className="card card-body col-sm-6">

                        </div>
                    </div>
                </div>
            </div>
            {
                showModal && <ModalProfits
                    data={dataProfitsSelected}
                    active={showModal}
                    toggle={() => { setShowModal(false) }}
                />
            }
        </>
    );
};
Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Profile;
