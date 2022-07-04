import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTeeth } from "@fortawesome/free-solid-svg-icons";
interface CardAmountTextPropsI {
    title: string;
    description: string;
}
const CardAmountText: FC<CardAmountTextPropsI> = ({ title, description }) => {
    return (
        <React.Fragment>
            <div className="font-weight-bold bg-white mb-1 row justify-content-between p-3 py-4 rounded-3 shadow position-relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{
                    position: "absolute",
                    top: "0",
                    transform: "rotate(90deg)",
                    opacity: "0.1",
                    left: "-40%",
                    zIndex: "1",
                }}>
                    <path
                        fill="#0099ff"
                        fillOpacity="1"
                        d="M0,32L60,64C120,96,240,160,360,165.3C480,171,600,117,720,101.3C840,85,960,107,1080,144C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
                <div className="d-flex align-items-center col-8" style={{ zIndex: 2 }}>
                    <FontAwesomeIcon
                        className="me-2 shadow-lg rounded-3"
                        icon={faTeeth}
                    />
                    <span className="text-dark" style={{ fontSize: "16px" }}>{title}</span>
                </div>
                <span className=" text-end col-4 d-flex align-items-center justify-content-end">
                    {description}
                </span>
            </div>
        </React.Fragment>
    );
};

export default CardAmountText;
