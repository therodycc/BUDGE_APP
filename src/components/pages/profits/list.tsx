import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat } from '../../../helpers/currency.helper';
import { ProfitI } from '../../../interfaces/app/profit/profit.interface';
import { ProfitsI } from '../../../interfaces/profits/profits.interface';
import { disabledItemAction, getProfitsAction, removeProfitsAction } from '../../../redux/actions/profits.action';
import CardWidget from '../../common/card/CardWidget';
import ModalProfits from './modals';

const ProfitsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataProfitsSelected, setDataProfitsSelected] = useState(null);

    const { profits: { profits } } = useSelector((state: any) => state)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(getProfitsAction()) }, []);

    const disabledItem = (item: ProfitI) => {
        dispatch(disabledItemAction(item))
    }

    const removeProfit = (item: ProfitsI) => {
        dispatch(removeProfitsAction(item?.uuid || ''))
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
                profits?.map((item: any, index: number) => (
                    <CardWidget
                        handleDelete={removeProfit}
                        handleUpdate={() => {
                            setShowModal(true)
                            setDataProfitsSelected(item)
                        }}
                        key={`card-widget-${index}`}
                        title={item?.type}
                        description={currencyFormat(item?.amount)}
                        toggleEnabled={() => disabledItem(item)}
                        item={item}
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