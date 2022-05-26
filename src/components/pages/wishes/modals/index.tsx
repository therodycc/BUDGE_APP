import { useDispatch } from "react-redux";
import { ModalWishesPropsI } from "../../../../interfaces/wishes/wishes.interface";
import { addWishesAction, updateWishesAction } from "../../../../redux/actions/wishes.action";
import { inputsModalWishes } from "../../../../settings/wishes/inputs-data-modal";
import Button from "../../../common/button";
import Form from "../../../common/form";
import Modal from "../../../common/modal";

const ModalWishes = ({ active, setToggle: toggle, data }: ModalWishesPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(
                updateWishesAction(data.uuid, form)
            )
            : dispatch(addWishesAction(form));
        toggle();
    };

    return (
        <>
            <Modal title="Wishes" active={active} setToggle={toggle}>
                <Form
                    keyForm="wishes"
                    inputsData={inputsModalWishes}
                    handleSubmit={handleSubmit}
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
