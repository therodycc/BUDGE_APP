import BgLayoutPage from "../../layout/bg-layout-page";
import ProfitsList from "./list";

const Profits = () => {
    return (
        <>
            <BgLayoutPage>
                <div className="card card-body mx-3 mx-md-4 mt-n12">
                    <div className="row  my-3">
                        <div className="col-sm-6">
                            <ProfitsList />
                        </div>
                        <div className=" col-sm-6">
                        </div>
                    </div>
                </div>
            </BgLayoutPage>
        </>
    )
};

export default Profits;
