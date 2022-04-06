import Button from "../../components/common/button";
import InputText from "../../components/common/input";
import Layout from "../../components/layout";

const Recommendations = () => {

    return (
        <>
            <Layout>

                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="pt-3 border-radius-xl bg-white">

                                        <div className="pt-3 border-radius-xl bg-white">
                                            <div>
                                                <div className="row mt-3">
                                                    <div className="col-lg-12 my-3" >
                                                        <InputText
                                                            name="necessary"
                                                            onChange={() => { }}
                                                            type="text"
                                                            placeholder="Necessary"
                                                        />
                                                    </div>

                                                </div>

                                                <Button
                                                    type="submit"
                                                    bgClass="info"
                                                    size="sm"
                                                    action={() => { }}
                                                    loading={false}
                                                >
                                                    Save
                                                </Button>
                                            </div >
                                        </div >
                                    </div >

                                </form >
                            </div >
                        </div >
                    </div >
                    <div className="col-lg-8">
                        <div className="card card-body mx-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body p-3">

                                                <div className="d-flex px-2 py-0">
                                                    <span className="badge bg-gradient-warning me-3"> </span>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">Basement</h6>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Recommendations;
