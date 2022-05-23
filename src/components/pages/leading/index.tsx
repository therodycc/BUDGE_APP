import React, { useEffect, useState } from 'react'
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper'
import { currencyFormat } from '../../../helpers/currency.helper'
import { UtilityI } from '../../../interfaces/utility/utility.interface'
import { headersLeading } from '../../../settings/leading/headers-leading'
import Box from '../../common/box'
import CardMini from '../../common/card/CardMini'
import Table from '../../common/table'

const Leading = () => {
    const [leading, setLeading] = useState<Array<any> | null>(null)
    const [totalLeading, setTotalLeading] = useState(0)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [totalMissing, setTotalMissing] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);

    useEffect(() => {
        setTotalLeading(getTotalLeading())
        setTotalCompleted(getTotalCompleted())
    }, [leading])

    useEffect(() => {
        setTotalMissing(getTotalMissing())
    }, [totalCompleted, totalMissing])

    useEffect(() => {
        getLeading()
    }, [])

    const getLeading = () => {
        // leadingProvider.getAll()
        //     .then(res => {
        //         setLeading(res?.data);
        //     })
        //     .catch(error => error)
    }

    const removeItem = async (item: UtilityI) => {
        const confirm = await sweetAlert.question('Are you sure?', 'warning');
        if (!confirm) return
        // leadingProvider.remove(item.id)
        //     .then(data => {
        //         getLeading()
        //         sweetAlert.alert("Done!", "Deleted", "success")
        //     })
        //     .catch(error => error)
    }

    const getTotalLeading = () => {
        return leading?.reduce((acc, item) => {
            acc += item.expense
            return acc
        }, 0);
    }

    const getTotalCompleted = () => {
        return leading?.reduce((acc, item) => {
            if (item.status === 'Completed') acc += item.expense
            if (item.status === 'In progress') acc += item.paidOut

            return acc
        }, 0);
    }


    const getTotalMissing = () => {
        return totalLeading - totalCompleted;
    }

    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item)
        setShowModal(!showModal)
    }
    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-sm-4">
                        <CardMini
                            amount={currencyFormat(totalLeading)}
                            title="Leading"
                        />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini amount={currencyFormat(totalMissing)} title="Total missing" />
                    </div>
                    <div className="col-sm-4 mt-sm-0 mt-4">
                        <CardMini amount={currencyFormat(totalCompleted)} title="Total completed" />
                    </div >
                </div >
                <Box title="Leading">
                    <Table
                        headItems={headersLeading({ removeItem, showModalEdit })}
                        bodyItems={leading} />
                </Box>
            </div>
        </>
    )
}

export default Leading