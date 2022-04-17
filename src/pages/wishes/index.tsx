import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/common/button'
import CardImg from '../../components/common/card/CardImg'
import CardMini from '../../components/common/card/CardMini'
import Layout from '../../components/layout'
import ModalWishes from '../../components/pages/wishes/modals'
import sweetAlert from '../../helpers/alerts/sweetAlert.helper'
import { currencyFormat } from '../../helpers/currency.helper'
import { WishesI } from '../../interfaces/wishes/wishes.interface'
import utilitiesProvider from '../../providers/utilities/utilities.provider'
import wishesProvider from '../../providers/wishes/wishes.provider'
import { getWishesAction, removeWishesAction } from '../../redux/actions/wishes.action'

const Wishes = () => {

    const state = useSelector((state: any) => state.wishes)
    const [wishes, setWishes] = useState<WishesI[]>([])
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
        setWishes(state?.wishes)
    }, [state.wishes]);

    useEffect(() => {
        setTotalWishes(getTotalWishes())
        setTotalCompleted(getTotalCompleted())
    }, [wishes])

    useEffect(() => {
        setTotalMissing(getTotalMissing())
    }, [totalCompleted, totalWishes])

    const getTotalWishes = () => {
        return wishes?.reduce((acc, item) => {
            acc += item?.expense
            return acc
        }, 0);
    }
    const getTotalCompleted = () => {
        return wishes?.reduce((acc, item) => {
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
                    wishes?.map((item, i) => (
                        <div
                            className="col-xl-4 col-sm-6 mb-xl-0"
                            key={item.name + i}
                        >
                            <CardImg
                                title={item.name}
                                description={item.expense.toString()}
                                image={item.image || ''}
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
            {showModal &&
                <ModalWishes
                    active={showModal}
                    data={dataModalUtility}
                    toggle={() => {
                        setShowModal(false)
                    }} />
            }
        </>
    )
}
Wishes.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Wishes
