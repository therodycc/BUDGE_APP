import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { ProfitI } from '../../../interfaces/app/profit/profit.interface';
import { ProfitsI } from '../../../interfaces/profits/profits.interface';
import profitsProvider from '../../../providers/profits/profits.provider';
import { disableProfit, removeProfit } from '../../../redux-toolkit/slices/profits.slice';
import { RootState } from '../../../redux-toolkit/store';
import CardWidget from '../../common/card/CardWidget';
import ModalProfits from './modals';

const ProfitsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataProfitsSelected, setDataProfitsSelected] = useState(null);

    const { profits } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()


    const disabledItem = async (item: ProfitI) => {
        const res = await profitsProvider.update(item?.uuid || "", { active: !item.active })
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        dispatch(disableProfit({ item }))
    }

    const removeProfitItem = async (item: ProfitsI) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        const res = await profitsProvider.remove(item.uuid as string)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Done!", "success");
        dispatch(removeProfit({ uuid: item.uuid as string }))
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <button
                        type="button"
                        className="btn btn-success btn-rounded d-flex align-items-center"
                        onClick={() => {
                            setShowModal(true)
                            setDataProfitsSelected(null)
                        }} >
                        <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
                        add new entry
                    </button>
                </div>
            </div>
            {profits &&
                profits?.result?.map((item: any, index: number) => (
                    <CardWidget
                        handleDelete={removeProfitItem}
                        handleUpdate={() => {
                            setShowModal(true)
                            setDataProfitsSelected(item)
                        }}
                        key={`card-widget-${index}`}
                        title={item?.type}
                        description={currencyFormat(item?.amount)}
                        toggleEnabled={() => disabledItem(item)}
                        item={{ ...item, showOptions: true }}
                    />
                ))}
            {
                showModal && <ModalProfits
                    data={dataProfitsSelected}
                    active={showModal}
                    setToggle={() => { setShowModal(false) }}
                />
            }
        </>
    )
}

export default ProfitsList