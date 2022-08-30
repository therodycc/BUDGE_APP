import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import { ModalVolunteerThingsPropsI } from "../../../../interfaces/volunteer-things/volunteer-things.interface";
import volunteerThingsProvider from "../../../../providers/volunteer-things/volunteer-things.provider";
import { addNewVolunteerThing, addVolunteerThings, updateVolunteerThing } from "../../../../redux-toolkit/slices/volunteer-things.slice";
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
            ? updateVolunteerThingData(data.uuid, form)
            : addVolunteerThing(form);
        toggle();
        toggle();
    };

    const addVolunteerThing = async (form: any) => {
        const res = await volunteerThingsProvider.create(form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Done!", "success");
        dispatch(addNewVolunteerThing({
            volunteerThing:res?.data?.response
        }));
    }

    const updateVolunteerThingData = async (uuid: string, form: any) => {
        const res = await volunteerThingsProvider.update(uuid, form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Updated!", "success");
        dispatch(updateVolunteerThing({
            volunteerThing: {
                ...form,
                ...(form.expense && { expense: +form.expense })
            }
        }))
    }

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
