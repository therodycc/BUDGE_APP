import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardWidget from "../../components/common/card/CardWidget";
import Layout from "../../components/layout";
import FormProfits from "../../components/pages/profits";
import { currencyFormat } from "../../helpers/currency.helper";
import { ProfitI } from "../../interfaces/app/profit/profit.interface";
import { disabledItemAction, getProfitsAction } from "../../redux/actions/profits.action";
import { getUserAction } from "../../redux/actions/user.action";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);

    const state = useSelector((state: any) => state)
    const dispatch = useDispatch()

    let profits: any[] = state?.profits?.profits || []
    let user: any = state?.user?.user?.user || []

    useEffect(() => {
        dispatch(getProfitsAction())
        dispatch(getUserAction())
    }, []);


    const disabledItem = (item: ProfitI) => {
        dispatch(disabledItemAction(item))
    }

    return (
        <>
            {
                showModal && <FormProfits
                    refreshData={() => { }}
                    setToggle={() => { setShowModal(false) }}
                />
            }
            <Layout>

                <div className="container-fluid px-2 px-md-4">
                    <div
                        className="page-header min-height-300 border-radius-xl mt-4"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1920&amp;q=80)",
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
                                            "https://cooperativadepica.cl/wp-content/uploads/2018/07/avatar2.png"
                                        }
                                        alt="profile_image"
                                        className="w-100 border-radius-lg shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100 mx-2">
                                    <h5 className="mb-1">
                                        {user?.name} {user?.lastName}
                                    </h5>
                                    <p className="mb-0 font-weight-normal text-sm">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 col-md-6">
                                <div className="row mt-3 mx-1">
                                    <div className="col-lg-12">
                                        <button
                                            type="button"
                                            className="btn btn-success btn-rounded"
                                            onClick={() => {
                                                setShowModal(true)
                                            }} >
                                            <i className="fas fa-plus-circle "></i>
                                        </button>
                                    </div>
                                </div>
                                {profits &&
                                    profits?.map((item: any) => (
                                        <CardWidget
                                            title={item.type}
                                            description={currencyFormat(item.amount)}
                                            toggleEnabled={() => disabledItem(item)}
                                            item={item}
                                        />
                                    ))}
                            </div>
                            <div className="card card-body col-7 my-3 bg-secondary mx-3">

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    );
};

export default Profile;
