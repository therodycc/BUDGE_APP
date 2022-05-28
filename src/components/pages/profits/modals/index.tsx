import { useDispatch } from 'react-redux';
import { ModalProfitsPropsI } from '../../../../interfaces/profits/profits.interface';
import { addProfitsAction, updateProfitsAction } from '../../../../redux/actions/profits.action';
import { inputsDataProfitsModal } from '../../../../settings/profits/inputs-data';
import Button from '../../../common/button';
import Form from '../../../common/form';
import Modal from '../../../common/modal';


const ModalProfits = ({ active, setToggle: toggle, data }: ModalProfitsPropsI) => {
    const dispatch = useDispatch();

    const handleSubmit = (form: any) => {
        data?.uuid
            ? dispatch(updateProfitsAction(data.uuid, form))
            : dispatch(addProfitsAction(form));
        toggle();
    }; 

    return (
        <>
            <Modal title="Profits" active={active} setToggle={toggle}>
                <Form
                    keyForm="profits"
                    inputsData={inputsDataProfitsModal}
                    handleSubmit={handleSubmit}
                    initialState={
                        data || {
                            type:"",
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