import { useDispatch } from "react-redux";
import { ModalVolunteerThingsPropsI } from "../../../../interfaces/volunteer-things/volunteer-things.interface";
import {
    addVolunteerThingsAction,
    updateVolunteerThingsAction
} from "../../../../redux/actions/volunteer-things.action";
import { inputsModalVolunteerThings } from "../../../../settings/volunteer-things/inputs-modal";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalVolunteerThings = ({
    active,
    setToggle: toggle,
    data,
}: ModalVolunteerThingsPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(updateVolunteerThingsAction(data.uuid, form))
            : dispatch(addVolunteerThingsAction(form));
        toggle();
        toggle();
    };

    return (
        <>
            <Modal title="Volunteer Things" active={active} setToggle={toggle}>
                <Form
                    keyForm="volunteer-things"
                    inputsData={inputsModalVolunteerThings}
                    handleSubmit={handleSubmit}
                    initialState={
                        data || {
                            expense: 0,
                            name: "",
                            status: "PENDING",
                            urgency: "WHENEVER",
                            category: "",
                            to: ""
                        }
                    }
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

export default ModalVolunteerThings;
