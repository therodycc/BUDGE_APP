import React, { ReactElement } from 'react'
import Layout from '../../components/layout'
import BgLayoutPage from '../../components/layout/bg-layout-page'
import ProfitsList from '../../components/pages/profits/list'

const ProfitsPage = () => {
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
}

export default ProfitsPage

ProfitsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout>
)