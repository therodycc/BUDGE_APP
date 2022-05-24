import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import { VolunteerThingsI } from '../../../interfaces/volunteer-things/volunteer-things.interface';
import utilitiesProvider from '../../../providers/utilities/utilities.provider';
import volunteerThingsProvider from '../../../providers/volunteer-things/volunteer-things.provider';
import { getVolunteerThingsAction, removeVolunteerThingsAction } from '../../../redux/actions/volunteer-things.action';
import { headersVolunteerThings } from '../../../settings/volunteer-things/headers-table.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import ModalVolunteerThings from './modals';

const VolunteerThings = () => {
    const { volunteerThings: { volunteerThings } } = useSelector((state: any) => state);

    const [totalVolunteerThings, setTotalVolunteerThings] = useState<number>(0);
    const [totalCompleted, setTotalCompleted] = useState<number>(0);
    const [totalMissing, setTotalMissing] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );
    const dispatch = useDispatch();


    useEffect(() => {
        setTotalVolunteerThings(getTotalVolunteerThings());
        setTotalCompleted(getTotalCompleted());
    }, [volunteerThings]);

    useEffect(() => {
        setTotalMissing(getTotalMissing());
    }, [totalCompleted, totalMissing]);

    useEffect(() => {
        dispatch(getVolunteerThingsAction());
    }, []);

    const getTotalVolunteerThings = () => {
        return volunteerThings?.reduce((acc: number, item: any) => {
            acc += item.expense;
            return acc;
        }, 0);
    };

    const getTotalCompleted = () => {
        return volunteerThings?.reduce((acc: number, item: any) => {
            if (item.status === "COMPLETED") acc += item.expense;
            if (item.status === "IN PROGRESS") acc += item.paidOut;

            return acc;
        }, 0);
    };

    const getTotalMissing = () => {
        return totalVolunteerThings - totalCompleted;
    };

    const addToThisMonth = (item: VolunteerThingsI) => {
        volunteerThingsProvider.update(item.uuid || "", {
            status: "In progress",
        })
            .then((data) => {
            })
            .catch((error) => error);

        utilitiesProvider
            .postItem(item)
            .then((data) => {
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: VolunteerThingsI) => {
        dispatch(removeVolunteerThingsAction(item.uuid || ""));
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
                            amount={currencyFormat(totalVolunteerThings)}
                            title="Total Volunteer Things"
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
                    title="VolunteerThings"
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
                    <Table headItems={headersVolunteerThings({ addToThisMonth, removeItem, showModalEdit })} bodyItems={volunteerThings} />
                </Box>
            </div>

            {
                showModal && (
                    <ModalVolunteerThings
                        active={showModal}
                        data={dataModalUtility}
                        setToggle={() => {
                            setShowModal(false);
                        }}
                    />
                )
            }
        </>
    );
}

export default VolunteerThings