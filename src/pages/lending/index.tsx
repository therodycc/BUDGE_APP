import { ReactElement } from 'react'
import Layout from '../../components/layout'
import Leading from '../../components/pages/leading'

const LendingPage = () => {
    return <Leading />
}
LendingPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default LendingPage