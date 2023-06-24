import { faCartArrowDown, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Children } from 'react'
import { currencyFormat } from '../../../helpers/currency.helper'
import { CardImgPropsI } from '../../../interfaces/common/card/card.interface'

const CardImg = ({ title, description, image, completed, inMonth, children }: CardImgPropsI) => {
    return (
        <>
            <div className="card mx-2 mt-5">
                <div className="card-header p-0 position-relative mt-n4 mx-3">
                    <div className='position-absolute' style={{ top: -20, left: -20, zIndex: 1 }}>
                        {inMonth && (<div
                            className="me-3 animate__infinite  bg-success rounded-circle shadow-sm animate__animated animate__pulse d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                            <FontAwesomeIcon
                                className="text-white"
                                icon={faCartArrowDown} style={{ fontSize: "20px" }} />
                        </div>)}
                    </div>
                    <div className="tab-content shadow-dark border-radius-lg">
                        {
                            completed && (
                                <img className="position-absolute z-index-3 w-70" src="https://planetcode.in/assets/images/gpassport/completed.png" alt="" />
                            )
                        }
                        <div className="
                                tab-pane
                                fade
                                show
                                position-relative
                                active
                                height-200
                                border-radius-lg"
                            style={{
                                backgroundImage: `url(${image || 'https://image.shutterstock.com/image-vector/none-vector-hand-drawn-illustration-260nw-1504674191.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        ></div>
                    </div>
                </div>

                <div className="card-body d-flex justify-content-between">
                    <h6 className="my-auto">{title}</h6>
                    <div className="">
                        <span>{currencyFormat(parseInt(description))}</span>
                    </div>
                </div>

                {children}

            </div>
        </>
    )
}

export default CardImg
