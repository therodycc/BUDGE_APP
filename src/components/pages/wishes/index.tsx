import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sweetAlert from '../../../helpers/alerts/sweetAlert.helper'
import { currencyFormat } from '../../../helpers/currency.helper'
import { gxUUID } from '../../../helpers/uuid-generator.helper'
import { StatusType } from '../../../interfaces/utility/utilily.type'
import { WishesI } from '../../../interfaces/wishes/wishes.interface'
import utilitiesProvider from '../../../providers/utilities/utilities.provider'
import wishesProvider from '../../../providers/wishes/wishes.provider'
import { getWishesAction, removeWishesAction } from '../../../redux/actions/wishes.action'
import Button from '../../common/button'
import CardImg from '../../common/card/CardImg'
import CardMini from '../../common/card/CardMini'
import TrafficLights from '../../common/traffic-lights'
import CustomBtnGroups from '../../custom/btn-actions-groups'
import ModalWishes from './modals'

const Wishes = () => {

    const { wishes: { wishes } } = useSelector((state: any) => state)
    const [totalWishes, setTotalWishes] = useState(0)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [totalMissing, setTotalMissing] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<WishesI | null>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWishesAction())
    }, [])

    useEffect(() => {
        setTotalWishes(getTotalWishes())
        setTotalCompleted(getTotalCompleted())
    }, [wishes])

    useEffect(() => {
        setTotalMissing(getTotalMissing())
    }, [totalCompleted, totalWishes])

    const getTotalWishes = () => {
        return wishes?.reduce((acc: number, item: any) => {
            acc += item?.expense
            return acc
        }, 0);
    }
    const getTotalCompleted = () => {
        return wishes?.reduce((acc: number, item: any) => {
            if (item.status === 'COMPLETED') acc += item.expense
            return acc
        }, 0);
    }
    const getTotalMissing = () => {
        return totalWishes - totalCompleted;
    }

    const addToThisMonth = (item: WishesI) => {
        wishesProvider.update(item?.uuid || '', {
            status: 'IN_PROGRESS'
        })
            .then(data => {
            })
            .catch(error => error)
        utilitiesProvider.postItem(item)
            .then((data) => {
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: WishesI) => {
        dispatch(removeWishesAction(item.uuid || ''))
    };
    const showModalEdit = (item: WishesI) => {
        setDataModalUtility(item)
        setShowModal(!showModal)
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <CardMini amount={currencyFormat(totalWishes)} title="Wishes" />
                </div>
                <div className="col-sm-4 mt-sm-0 mt-4">
                    <CardMini amount={currencyFormat(totalMissing)} title="Total missing" />
                </div>
                <div className="col-sm-4 mt-sm-0 mt-4">
                    <CardMini amount={currencyFormat(totalCompleted)} title="Total completed" />
                </div >
            </div >

            <div className="mt-5 bg-white mx-2 p-2 border-radius-lg shadow">
                <Button
                    bgClass={'success'}
                    type={'button'}
                    loading={false}
                    action={() => { setShowModal(true); setDataModalUtility(null) }}
                >
                    Add new
                </Button>
            </div>

            <div className="flex-wrap mb-5 d-flex justify-content-between">
                {
                    wishes?.map((item: any, i: number) => (
                        <div
                            className="col-xl-4 col-sm-6 mb-xl-0"
                            key={gxUUID()}
                        >
                            <CardImg
                                title={item.name}
                                description={item.expense.toString()}
                                image={item.image || ''}
                                completed={item.status === 'COMPLETED' ? true : false}
                            >
                                <div className='mx-4'>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            <TrafficLights status={item.status as StatusType} />
                                        </div>
                                        <div className="col-md-8 d-flex p-0 justify-content-end">
                                            <CustomBtnGroups
                                                action1={() => addToThisMonth(item)}
                                                action2={() => { showModalEdit(item) }}
                                                action3={() => { removeItem(item); }} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <button className='btn btn-info btn-sm'>Link</button>
                                        </div>
                                    </div>
                                </div>
                            </CardImg>
                        </div >
                    ))
                }
            </div >
            {showModal &&
                <ModalWishes
                    active={showModal}
                    data={dataModalUtility}
                    setToggle={() => {
                        setShowModal(false)
                    }} />
            }
        </>
    )
}

export default Wishes