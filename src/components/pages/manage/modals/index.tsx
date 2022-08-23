import React from "react";
import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import { ManageI } from "../../../../interfaces/manage/manage.interface";
import manageProvider from "../../../../providers/utilities/utilities.provider";
import { updateManage } from "../../../../redux-toolkit/slices/manage.slice";
import { inputsModalManage } from "../../../../settings/manage/inputs-modal";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

interface ModalManagePropsI {
    active: boolean;
    toggle: Function;
    data: ManageI;
}

const ModalManage = ({ active, toggle, data: globalData }: ModalManagePropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = async (data: any) => {
        const { type, uuid, expense, ...rest } = data
        if (!data.uuid) return console.log("no passed");

        const res = await manageProvider.updateAction(uuid, type, data)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Updated!", "success");

        dispatch(updateManage({
            manage: {
                data,
                ...(data.expense && { expense: +data.expense }),
                ...(data.paidOut && { paidOut: +data.paidOut }),
            }
        }))
        toggle();
    }



    return (
        <React.Fragment>
            <Modal title="Manage" active={active} setToggle={toggle}>
                <Form
                    inputsData={inputsModalManage}
                    handleSubmit={handleSubmit}
                    initialState={globalData || {}}
                    footerSection={
                        <div className="row mt-3">
                            <div className="col-lg-6">
                                <Button
                                    action={() => {
                                        toggle();
                                    }}
                                    bgClass={"secondary"}
                                    type={"button"}
                                    loading={false}
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                            </div>
                            <div className="col-lg-6">
                                <Button
                                    bgClass={"success"}
                                    type={"submit"}
                                    loading={false}
                                    size="sm"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    } />
            </Modal>
        </React.Fragment>
    );
};

export default ModalManage;
