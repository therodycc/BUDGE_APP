import { useDispatch } from "react-redux";
import { ModalDebtsPropsI } from "../../../../interfaces/debts/debts.interface";
import { addDebtsAction, updateDebtsAction } from "../../../../redux/actions/debts.action";
import { inputsDataDebtsModal } from "../../../../settings/debts/inputs-data.settings";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalDebts = ({ active, setToggle: toggle, data }: ModalDebtsPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(updateDebtsAction(data.uuid, form))
            : dispatch(addDebtsAction(form));
        toggle();
    };
    return (
        <>
            <Modal title="Debts" active={active} setToggle={toggle}>
                <Form
                    keyForm="debts"
                    inputsData={inputsDataDebtsModal}
                    handleSubmit={handleSubmit}
                    initialState={data || {
                        expense: 0,
                        name: "",
                        status: "PENDING",
                        urgency: "WHENEVER",
                        description: "",
                        category: "",
                        to: ""
                    }}
                    footerSection={
                        <>
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
                                    action={() => { }}
                                    bgClass={"success"}
                                    type={"submit"}
                                    loading={false}
                                    size="sm"
                                >
                                    Add
                                </Button>
                            </div>
                        </>
                    }
                />
            </Modal>
        </>
    );
};

export default ModalDebts;
