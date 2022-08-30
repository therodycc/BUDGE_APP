import { useDispatch } from "react-redux";
import sweetAlert from "../../../../helpers/alerts/sweetAlert.helper";
import { ModalWishesPropsI } from "../../../../interfaces/wishes/wishes.interface";
import wishesProvider from "../../../../providers/wishes/wishes.provider";
import { addNewWish, updateWish } from "../../../../redux-toolkit/slices/wishes.slice";
import { inputsModalWishes } from "../../../../settings/wishes/inputs-data-modal";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalWishes = ({ active, setToggle: toggle, data }: ModalWishesPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? updateWishData(data.uuid, form)
            : addNewWishData(form);
        toggle();
    };

    const addNewWishData = async (form: any) => {
        const res = await wishesProvider.create(form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Done!", "success");
        dispatch(addNewWish({
            wishes: {
                ...res?.data?.response,
                ...(form.expense && { expense: +form.expense }),
            }
        }));
    }

    const updateWishData = async (uuid: string, form: any) => {
        const res = await wishesProvider.update(uuid, form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Updated!", "success");
        dispatch(updateWish({
            wishes: {
                ...form,
                ...(form.expense && { expense: +form.expense }),
            }
        }));
    }

    return (
        <>
            <Modal title="Wishes" active={active} setToggle={toggle}>
                <Form
                    keyForm="wishes"
                    inputsData={inputsModalWishes}
                    handleSubmit={handleSubmit}
                    initialState={
                        data || {
                            expense: 0,
                            name: "",
                            status: "PENDING",
                            urgency: "WHENEVER",
                            category: "",
                        }
                    }
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

export default ModalWishes;
