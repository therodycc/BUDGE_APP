import React, { ReactElement, useEffect, useState } from 'react'
import Box from '../../components/common/box'
import CardMini from '../../components/common/card/CardMini'
import Table from '../../components/common/table/Index'
import Layout from '../../components/layout'
import FormBudget from '../../components/pages/form-budget/Index'
import { currencyFormat } from '../../helpers/currency.helper'
import sweetAlert from '../../helpers/alerts/sweetAlert.helper'
import { UtilityI } from '../../interfaces/utility/utility.interface'
import leadingProvider from '../../providers/leading/leading.provider'

const Lending = () => {


    const [leading, setLeading] = useState<Array<any>>([])
    const [totalLeading, setTotalLeading] = useState(0)
    const [totalCompleted, setTotalCompleted] = useState(0)
    const [totalMissing, setTotalMissing] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataModalUtility, setDataModalUtility] = useState<UtilityI | null>(null);

    const [headItems, setHeadItems] = useState([
        {
            title: 'Title',
            render: ({ item }: any) => {
                return (
                    <div className="d-flex px-3 py-1">
                        <div>
                            <img src={item.img || "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/blue-shoe.jpg "} className="avatar me-3" alt="image" />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{item.necessary}</h6>
                            <p className="text-sm font-weight-normal text-secondary mb-0">
                                <span className={`text-${item.expense - item.paidOut === 0 ? 'success' : 'danger'} font-weight-bold mx-1`}>
                                    {currencyFormat(item.expense - item.paidOut)}
                                </span>
                                {item.category}
                            </p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Expense',
            render: ({ item }: any) => {
                return (
                    <>
                        <span>{currencyFormat(item.expense)}</span>
                    </>
                )
            }
        },
        {
            title: 'Status',
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="btn-group">
                            <span className={` text-${item.status === 'Pending' ? 'danger' : 'light'} display-8`}> <i className="fas fa-circle"></i></span>
                            <span className={` text-${item.status === 'In progress' ? 'warning' : 'light'} display-8 mx-2`}> <i className="fas fa-circle"></i></span>
                            <span className={` text-${item.status === 'Completed' ? 'success' : 'light'} display-8 `}><i className="fas fa-circle"></i></span>
                        </div>
                    </>
                )
            }
        },
        {
            title: "Date to request",
            key: "",
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <span>{item?.dateToRequest}</span>
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Actions',
            render: ({ item }: any) => {
                return (
                    <>
                        <div className="btn-group">
                            {/* <button
                                type="button"
                                className={`btn btn-success btn-sm`}
                                onClick={() => { addToThisMonth(item) }}
                            >
                                <i className="fas fa-plus-circle"></i>
                            </button> */}
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
                                onClick={() => { removeItem(item) }}
                            >
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                    </>
                )
            }
        }
    ])


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
        leadingProvider.getAll()
            .then(res => {
                setLeading(res?.data);
            })
            .catch(error => error)
    }

    const removeItem = async (item: UtilityI) => {
        const confirm = await sweetAlert.question('Are you sure?', 'warning');
        if (!confirm) return
        leadingProvider.remove(item.id)
            .then(data => {
                getLeading()
                sweetAlert.alert("Done!", "Deleted", "success")
            })
            .catch(error => error)
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

            {
                (dataModalUtility && showModal) && (<FormBudget
                    urlTo='leading'
                    refreshData={() => {
                        getLeading()
                    }}
                    data={dataModalUtility}
                    setToggle={() => { setShowModal(false) }} />)
            }
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
                        headItems={headItems}
                        bodyItems={leading} />
                </Box>
            </div>
        </>
    )
}
Lending.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Lending