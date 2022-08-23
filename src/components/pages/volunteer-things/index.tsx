import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper';
import { currencyFormat } from '../../../helpers/currency.helper';
import { getFilterByStatus } from '../../../helpers/status.helper';
import useCalcCategory from '../../../hooks/useCalcCategory';
import { UtilityI } from '../../../interfaces/utility/utility.interface';
import { VolunteerThingsI } from '../../../interfaces/volunteer-things/volunteer-things.interface';
import volunteerThingsProvider from '../../../providers/volunteer-things/volunteer-things.provider';
import { addVolunteerThings, removeVolunteerThing } from '../../../redux-toolkit/slices/volunteer-things.slice';
import { tabsSettings } from '../../../settings/manage/tabs.settings';
import { headersVolunteerThings } from '../../../settings/volunteer-things/headers-table.settings';
import Box from '../../common/box';
import Button from '../../common/button';
import CardMini from '../../common/card/CardMini';
import Table from '../../common/table';
import Tabs from '../../common/tabs';
import ModalVolunteerThings from './modals';
import { RootState } from '../../../redux-toolkit/store/index';

const VolunteerThings = () => {
    const { volunteerThings } = useSelector((state: RootState) => state);
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(
        null
    );

    const [tab, setTab] = useState<number>(0);

    const dispatch = useDispatch();

    const { total: totalVolunteerThings, totalCompleted, totalMissing } = useCalcCategory({
        valueToCalc: volunteerThings.result,
    })

    useEffect(() => {
        getAllVolunteerThings()
    }, []);

    const getAllVolunteerThings = async () => {
        const res = await volunteerThingsProvider.getAll()
        dispatch(addVolunteerThings({ result: res?.data, }));
    }

    const addToThisMonth = (item: VolunteerThingsI) => {
        volunteerThingsProvider.update(item.uuid || "", { status: "IN_PROGRESS", inMonth: true })
            .then((res) => {
                if (res?.error) return sweetAlert.toast("Error", res.error.message, "error");
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: VolunteerThingsI) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        const res = await volunteerThingsProvider.remove(item.uuid as string)
        if (res.error) return sweetAlert.alert("Error", res?.error?.message, "error");
        sweetAlert.alert("Success", "Done!", "success");
        dispatch(removeVolunteerThing({ uuid: item.uuid as string }));
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
                    customClassLeftSection='col-lg-8'
                    customClassRightSection='col-lg-4'
                    leftSection={
                        <Tabs
                            tabsSettings={tabsSettings}
                            setActiveTab={setTab}
                            activeTab={tab}
                        />
                    }
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
                    <Table
                        headItems={headersVolunteerThings({ addToThisMonth, removeItem, showModalEdit })}
                        bodyItems={(volunteerThings.result || [])?.filter((item: any) => getFilterByStatus?.(tab)?.includes(item?.status))}
                    />
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