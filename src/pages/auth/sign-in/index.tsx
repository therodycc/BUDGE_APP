import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/common/button";
import InputText from "../../../components/common/input-text";
import { login } from "../../../redux/actions/auth.action";

const SignIn = () => {
    const dispatch = useDispatch()
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login({ email: "Therodycc@gmail.com" }))
    };
    return (
        <>
            <div
                className="d-flex align-items-center justify-content-center sign-in-bg"
                style={{ height: "100vh", overflow: "hidden" }}
            >
                <nav
                    className="navbar  navbar-expand-lg position-fixed mt-1 top-1 left-1  border-radius-xl  blur shadow-blur"
                >
                    <div className="container-fluid py-1 px-3">
                        <div
                            className="collapse navbar-collapse "
                        >
                            <ul className="navbar-nav">
                                <li className="d-flex justify-content-center align-items-center">
                                    <Button
                                        action={() => { }}
                                        bgClass={"success"}
                                        type={"submit"}
                                        loading={false}
                                    >
                                        Sign Up
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                    <div className="card mx-3" style={{ zIndex: 1 }}>
                        <div className="card-header text-center py-0">
                            <div className="mt-n5">
                                <img
                                    className="avatar avatar-xxl shadow-lg"
                                    alt="Image placeholder"
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <p className="mb-4">Enter password to unlock your account.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="my-3">
                                    <InputText
                                        type="text"
                                        name="email"
                                        placeholder={"E.g. Mars@gmail.com"}
                                    />
                                </div>
                                <div className="my-3">
                                    <InputText
                                        type="password"
                                        name="password"
                                        placeholder={"Your password"}
                                    />
                                </div>
                                <div>
                                    <Button
                                        action={() => { }}
                                        bgClass={"success"}
                                        type={"submit"}
                                        loading={false}
                                        size="sm"
                                        customClass="mt-3"
                                    >
                                        Log In
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <svg
                    style={{}}
                    className="position-fixed bottom-0 m-0 p-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="#155799"
                        fillOpacity="1"
                        d="M0,288L21.8,245.3C43.6,203,87,117,131,101.3C174.5,85,218,139,262,186.7C305.5,235,349,277,393,261.3C436.4,245,480,171,524,138.7C567.3,107,611,117,655,106.7C698.2,96,742,64,785,53.3C829.1,43,873,53,916,69.3C960,85,1004,107,1047,133.3C1090.9,160,1135,192,1178,224C1221.8,256,1265,288,1309,256C1352.7,224,1396,128,1418,80L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </>
    );
};

export default SignIn;
