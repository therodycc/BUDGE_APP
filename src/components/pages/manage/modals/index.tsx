import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import useForm from "../../../../hooks/useForm";
import { ManageI } from "../../../../interfaces/manage/manage.interface";
import { updateManageAction } from "../../../../redux/actions/manage.action";
import { inputsModalManage } from "../../../../settings/manage/inputs-modal";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

interface ModalManagePropsI {
    active: boolean;
    toggle: Function;
    data: ManageI;
}

const ModalManage = ({ active, toggle, data }: ModalManagePropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (data: any) => {
        const { type, uuid, expense, ...rest } = data
        if (!data.uuid) return console.log("no passed");
        dispatch(updateManageAction(uuid, type, rest))
        toggle();
    };

    return (
        <React.Fragment>
            <Modal title="Manage" active={active} setToggle={toggle}>
                <Form
                    inputsData={inputsModalManage}
                    handleSubmit={handleSubmit}
                    initialState={data || {}}
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
