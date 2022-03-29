import React from "react";
import { CardHomePropsI } from "../../../interfaces/common/card/card.interface";

const CardHome = ({ title, description, subtitle }: CardHomePropsI) => {
    return (
        <>
            <div
                className="bg-info p-5"
                style={{
                    height: "150px",
                    borderRadius: "15px",
                    background: "linear-gradient(to right, rgb(2 27 121 / 49%), rgb(2 27 121 / 49%)),url('https://wallpaperaccess.com/full/3497712.jpg')",
                    backgroundSize: 'cover',
                }}
            ></div>
            <div className="px-4 animate__animated animate__fadeIn" style={{ marginTop: "-120px" }}>
                <div className="card my-3 ">
                    <div className="card-body text-center">
                        <h3 className="text-gradient text-info">
                            <span id="status2">{title}</span>
                            <span className="text-lg ms-n1">.</span>
                        </h3>
                        <h6 className="mb-0 font-weight-bolder">{description}</h6>
                        <p className="opacity-8 mb-0 text-sm">{subtitle}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardHome;
