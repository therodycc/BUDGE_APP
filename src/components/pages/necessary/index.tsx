import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { NecessaryI } from '../../../interfaces/necessary/necessary.interface';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import necessaryProvider from '../../../providers/necessary/necessary.provider';
import utilitiesProvider from '../../../providers/utilities/utilities.provider';
import { getNecessaryAction, removeNecessaryAction } from '../../../redux/actions/necessary.action';
import { headersModalNecessary } from '../../../settings/necessary/headers-necessary';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import ModalNecessary from './modals';

const Necessary = () => {
    const dispatch = useDispatch()
    const { necessary: { necessary } } = useSelector((state: any) => state)
    const [totalNecessary, setTotalNecessary] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalMissing, setTotalMissing] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<NecessaryI | null>(
        null
    );

    useEffect(() => {
        dispatch(getNecessaryAction());
    }, []);

    useEffect(() => {
        setTotalNecessary(getTotalNecessary());
        setTotalCompleted(getTotalCompleted());
    }, [necessary]);

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing]);


    const addToThisMonth = (item: UtilityI) => {
        necessaryProvider
            .update(item.id, {
                status: "In progress",
            })
            .then((data) => {
            })
            .catch((error) => error);

        utilitiesProvider
            .postItem(item)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: NecessaryI) => {
        dispatch(removeNecessaryAction(item.uuid || ""))
    };

    const getTotalNecessary = () => {
        return necessary?.reduce((acc: number, item: any) => {
            acc += +item.expense;
            return acc;
        }, 0);
    };

    const getTotalCompleted = () => {
        return necessary?.reduce((acc: number, item: any) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN_PROGRESS") acc += item.paidOut;

            return acc;
        }, 0);
    };

    const getTotalMissing = () => {
        return totalNecessary - totalCompleted;
    };

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item);
        setShowModal(!showModal);
    };

    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <CardMini
                            amount={currencyFormat(totalNecessary)}
                            title="Necessary"
                        />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini
                            amount={currencyFormat(totalMissing)}
                            title="Total missing"
                        />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini
                            amount={currencyFormat(totalCompleted)}
                            title="Total completed"
                        />
                    </div>
                </div>
                <Box
                    title="Necessary"
                    rightSection={
                        <>
                            <div className="">
                                <Button
                                    bgClass={"success"}
                                    type={"button"}
                                    loading={false}
                                    action={() => {
                                        setShowModal(true);
                                        setDataModalUtility(null);
                                    }}
                                >
                                    Add new
                                </Button>
                            </div>
                        </>
                    }
                >
                    <Table headItems={headersModalNecessary({ addToThisMonth, removeItem, showModalEdit })} bodyItems={necessary} />
                </Box>
            </div>

            {showModal && (
                <ModalNecessary
                    active={showModal}
                    setToggle={() => {
                        setShowModal(false)
                    }}
                    data={dataModalUtility} />
            )}
        </>
    );
}

export default Necessary 