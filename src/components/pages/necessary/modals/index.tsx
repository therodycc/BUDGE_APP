import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import { ModalNecessaryPropsI } from "../../../../interfaces/necessary/necessary.interface";
import necessaryProvider from "../../../../providers/necessary/necessary.provider";
import { addNewNecessary, updateNecessary } from "../../../../redux-toolkit/slices/necessary.slice";
import { inputsModalNecessary } from "../../../../settings/necessary/inputs-data-modals";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalNecessary = ({ active, setToggle: toggle, data }: ModalNecessaryPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? updateNecessaryData(data.uuid, form)
            : addNewNecessaryData(form);
        toggle();
    };

    const updateNecessaryData = async (uuid: string, form: any) => {
        const res = await necessaryProvider.update(uuid, data)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
        sweetAlert.alert('Success', 'Updated!', 'success')
        dispatch(updateNecessary({ necessary: form }))
    }

    const addNewNecessaryData = async (form: any) => {
        const res = await necessaryProvider.create(form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
        sweetAlert.alert('Success', 'Done!', 'success')
        dispatch(addNewNecessary({ necessary: res?.data?.response }))
    }

    return (
        <>
            <Modal title="Necessary" active={active} setToggle={toggle}>
                <Form
                    keyForm="necessary"
                    inputsData={inputsModalNecessary}
                    handleSubmit={handleSubmit}
                    initialState={
                        data || {
                            expense: 0,
                            name: "",
                            status: "PENDING",
                            urgency: "WHENEVER",
                            description: "",
                            category: "",
                            to: ""
                        }
                    }
                    footerSection={<>
                        <div className="col-lg-6">
                            <Button
                                action={() => toggle()}
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
                                action={() => { }}
                                bgClass={"success"}
                                type={"submit"}
                                loading={false}
                                size="sm"
                            >
                                Add
                            </Button>
                        </div>
                    </>}
                />
            </Modal>
        </>
    );
};

export default ModalNecessary;
