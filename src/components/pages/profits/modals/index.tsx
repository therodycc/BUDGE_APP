import { useDispatch } from 'react-redux';
import sweetAlert from '../../../../helpers/alerts/sweetAlert.helper';
import { ModalProfitsPropsI } from '../../../../interfaces/profits/profits.interface';
import profitsProvider from '../../../../providers/profits/profits.provider';
import { addNewProfit, updateProfit } from '../../../../redux-toolkit/slices/profits.slice';
import { inputsDataProfitsModal } from '../../../../settings/profits/inputs-data';
import Button from '../../../common/button';
import Form from '../../../common/form';
import Modal from '../../../common/modal';


const ModalProfits = ({ active, setToggle: toggle, data: globalData }: ModalProfitsPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        globalData?.uuid
            ? updateProfitData(globalData.uuid, form) :
            addNewProfitData(form);
        toggle();
    };

    const updateProfitData = async (uuid: string, form: any) => {
        const res = await profitsProvider.update(uuid, form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Updated!", "success");
        dispatch(updateProfit({
            profit: {
                ...form,
                ...(form?.amount && { amount: +form.amount }),
            }
        }));
    }

    const addNewProfitData = async (form: any) => {
        const res = await profitsProvider.create(form)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Done!", "success");
        dispatch(addNewProfit({
            profit: {
                ...res?.data?.response,
                ...(form?.amount && { amount: +form.amount }),
            }
        }));
    }

    return (
        <>
            <Modal title="Profits" active={active} setToggle={toggle}>
                <Form
                    keyForm="profits"
                    inputsData={inputsDataProfitsModal}
                    handleSubmit={handleSubmit}
                    initialState={
                        globalData || {
                            type: "",
                            amount: 0,
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
    )
}

export default ModalProfits