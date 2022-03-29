import React, { useEffect, useState } from 'react'
import FormBudget from '../../components/pages/form-budget/Index'
import CardImg from '../../components/common/card/CardImg'
import CardMini from '../../components/common/card/CardMini'
import config from '../../config'
import { currencyFormat } from '../../helpers/currency.helper'
import sweetAlert from '../../helpers/sweetAlert.helper'
import { UtilityI } from '../../interfaces/utility/utility.interface'
import httpProvider from '../../providers'
import wishesProvider from '../../providers/wishes/wishes.provider'
import utilitiesProvider from '../../providers/utilities/utilities.provider'
import Layout from '../../components/layout'

const Wishes = () => {
    const [wishes, setWishes] = useState<Array<any>>([])
    const [totalWishes, setTotalWishes] = useState(0)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [totalMissing, setTotalMissing] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);

    useEffect(() => {
        getWishes()
    }, [])

    useEffect(() => {
        setTotalWishes(getTotalWishes())
        setTotalCompleted(getTotalCompleted())
    }, [wishes])

    useEffect(() => {
        setTotalMissing(getTotalMissing())
    }, [totalCompleted, totalMissing])


    const getWishes = () => {
        wishesProvider.getAll()
            .then(res => {
                if (res?.error) return sweetAlert.alert('Error', res.error, 'error')
                console.log({ res });
                
                setWishes(res?.data)
            })
            .catch(error => error)
    }
    const getTotalWishes = () => {
        return wishes?.reduce((acc, item) => {
            acc += item.expense
            return acc
        }, 0);
    }
    const getTotalCompleted = () => {
        return wishes?.reduce((acc, item) => {
            if (item.status === 'Completed') acc += item.expense
            return acc
        }, 0);
    }
    const getTotalMissing = () => {
        return totalWishes - totalCompleted;
    }

    const addToThisMonth = (item: UtilityI) => {
        wishesProvider.update(item.id, {
            status: 'In progress'
        })
            .then(data => {
                console.log({ data });
            })
            .catch(error => error)
        utilitiesProvider.postItem(item)
            .then((data) => {
                sweetAlert.alert("Done!", "Added to this month", "success");
            })
            .catch((error) => error);
    };

    const removeItem = async (item: UtilityI) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        wishesProvider.remove(item.id)
            .then((data) => {
                getWishes()
                sweetAlert.alert("Done!", "Deleted", "success");
            })
            .catch((error) => error);
    };
    const showModalEdit = (item: UtilityI) => {
        setDataModalUtility(item)
        setShowModal(!showModal)
    }


    return (
        <>
            {
                (dataModalUtility && showModal) && (<FormBudget
                    urlTo='wishes'
                    refreshData={() => {
                        getWishes()
                    }}
                    data={dataModalUtility}
                    setToggle={() => { setShowModal(false) }} />)
            }

            <Layout>

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

                <div className="flex-wrap mb-5 d-flex justify-content-between">
                    {
                        wishes?.map((item, i) => (
                            <div
                                className="col-xl-4 col-sm-6 mb-xl-0"
                                key={item.necessary + i}
                            >
                                <CardImg
                                    title={item.name}
                                    description={item.expense}
                                    image={item.image}
                                    completed={item.status === 'COMPLETED' ? true : false}
                                >
                                    <div className='mx-4'>
                                        <div className='row'>
                                            <div className="btn-group col-md-4">
                                                <span
                                                    className={` text-${item.status === "PENDING" ? "danger" : "light"
                                                        } display-8`}
                                                >
                                                    {" "}
                                                    <i className="fas fa-circle"></i>
                                                </span>
                                                <span
                                                    className={` text-${item.status === "IN_PROGRESS" ? "warning" : "light"
                                                        } display-8 mx-2`}
                                                >
                                                    {" "}
                                                    <i className="fas fa-circle"></i>
                                                </span>
                                                <span
                                                    className={` text-${item.status === "COMPLETED" ? "success" : "light"} display-8 `}
                                                >
                                                    <i className="fas fa-circle"></i>
                                                </span>
                                            </div>
                                            <div className="btn-group col-md-8">
                                                <button
                                                    type="button"
                                                    className={`btn btn-success btn-sm`}
                                                    onClick={() => {
                                                        addToThisMonth(item);
                                                    }}
                                                >
                                                    <i className="fas fa-plus-circle"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn btn-secondary btn-sm`}
                                                    onClick={() => {
                                                        showModalEdit(item)
                                                    }}
                                                >
                                                    <i className="fas fa-spinner"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn btn-light btn-sm`}
                                                    onClick={() => {
                                                        removeItem(item);
                                                    }}
                                                >
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
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
            </Layout>

        </>
    )
}

export default Wishes
