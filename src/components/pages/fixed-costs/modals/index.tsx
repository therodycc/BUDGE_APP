import { useDispatch } from "react-redux";
import { ModalFixedCostsPropsI } from "../../../../interfaces/fixed-costs/fixed-costs.interface";
import {
    addFixedCostAction,
    updateFixedCostsAction
} from "../../../../redux/actions/fixed-costs.action";
import { inputsDataFixedCosts } from "../../../../settings/fixed-costs/inputs-data";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalFixedCosts = ({ active, setToggle: toggle, data }: ModalFixedCostsPropsI) => {
    const dispatch = useDispatch();
    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(updateFixedCostsAction(data.uuid, form))
            : dispatch(addFixedCostAction(form));

        toggle();
    };

    return (
        <>
            <Modal title="Fixed costs" active={active} setToggle={toggle}>
                <Form
                    keyForm="fixed-costs"
                    inputsData={inputsDataFixedCosts}
                    handleSubmit={handleSubmit}
                    initialState={data || {
                        expense: 0,
                        name: "",
                        status: "PENDING",
                        urgency: "WHENEVER",
                        description: "",
                        category: "",
                    }}
                    footerSection={<>
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
                    </>}
                />

            </Modal>
        </>
    );
};

export default ModalFixedCosts;
