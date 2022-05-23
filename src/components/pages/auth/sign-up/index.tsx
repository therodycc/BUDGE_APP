import React from 'react'
import Button from '../../../common/button'
import HeadImages from '../../../common/head-images'

const SignUp = () => {

    const handleSubmit = (e: React.FormEvent) => { }

    return (
        <>
            <div className="col-lg-12 m-auto">
                <div className="col-lg-4 mx-auto">
                    <div className="card mx-3" style={{ zIndex: 1 }}>
                        <div className="card-header text-center py-0">
                            <HeadImages />
                        </div>
                        <div className="card-body ">
                            <p className="mb-4 text-center">Do you want to be part of us?</p>
                            <form onSubmit={handleSubmit}>

                                <div>
                                    <Button
                                        bgClass={"primary"}
                                        type={"submit"}
                                        customClass="mt-3 w-100"
                                        loading={false}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SignUp