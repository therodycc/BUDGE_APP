import { ReactElement } from 'react'
import Layout from '../../components/layout/base'
import Wishes from '../../components/pages/wishes'

const WishesPage = () => {
    return <Wishes />
}
WishesPage.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)


export default WishesPage
