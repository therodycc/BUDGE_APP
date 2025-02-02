import { useDispatch } from "react-redux";

import { RccButton, RccForm, RccModal, RccNotifications } from 'rcc-react-lib';
import { ModalWishesPropsI } from "../../../../interfaces/wishes/wishes.interface";
import wishesProvider from "../../../../providers/wishes/wishes.provider";
import { addNewWish, updateWish } from "../../../../redux-toolkit/slices/wishes.slice";
import { inputsModalWishes } from "../../../../settings/wishes/inputs-data-modal";

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
        if (res.error) return RccNotifications.alert("Error", res?.error?.message, "error");
        RccNotifications.alert("Success", "Done!", "success");
        dispatch(addNewWish({
            wishes: {
                ...res?.data?.response,
                ...(form.expense && { expense: +form.expense }),
            }
        }));
    }

    const updateWishData = async (uuid: string, form: any) => {
        const res = await wishesProvider.update(uuid, form)
        if (res.error) return RccNotifications.alert("Error", res?.error?.message, "error");
        RccNotifications.alert("Success", "Updated!", "success");
        dispatch(updateWish({
            wishes: {
                ...form,
                ...(form.expense && { expense: +form.expense }),
            }
        }));
    }

    return (
        <>
            <RccModal title="Wishes" active={active} setToggle={toggle}>
                <RccForm
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
                            <RccButton
                                action={() => {
                                    toggle();
                                }}
                                bgClass={"secondary"}
                                type={"button"}
                                loading={false}
                                size="sm"
                            >
                                Cancel
                            </RccButton>
                        </div>
                        <div className="col-lg-6">
                            <RccButton
                                action={() => { }}
                                bgClass={"success"}
                                type={"submit"}
                                loading={false}
                                size="sm"
                            >
                                Add
                            </RccButton>
                        </div>
                    </>}
                />
            </RccModal>
        </>
    );
};

export default ModalWishes;
