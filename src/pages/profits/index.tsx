import { ReactElement } from 'react'
import Layout from '../../components/layout'
import Profits from '../../components/pages/profits'

const ProfitsPage = () => {
    return <Profits />
}

export default ProfitsPage

ProfitsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout>
)