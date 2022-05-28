import { useDispatch } from "react-redux";
import { ModalNecessaryPropsI } from "../../../../interfaces/necessary/necessary.interface";
import {
    addNecessaryAction,
    updateNecessaryAction
} from "../../../../redux/actions/necessary.action";
import { inputsModalNecessary } from "../../../../settings/necessary/inputs-data-modals";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalNecessary = ({ active, setToggle: toggle, data }: ModalNecessaryPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(updateNecessaryAction(data.uuid, form))
            : dispatch(addNecessaryAction(form));
        toggle();
    };
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
