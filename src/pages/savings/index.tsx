import { ReactElement } from 'react'
import Layout from '../../components/layout'
import Savings from '../../components/pages/savings'

const SavingsPage = () => {
    return <Savings />
}
SavingsPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default SavingsPage