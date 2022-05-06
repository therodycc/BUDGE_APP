import { ReactElement } from 'react'
import Layout from '../../components/layout'

const Savings = () => {
    return (
        <>
            <h2>Savings</h2>
        </>
    )
}
Savings.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default Savings