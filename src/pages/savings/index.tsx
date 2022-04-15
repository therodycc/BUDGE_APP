import React, { ReactElement } from 'react'
import Layout from '../../components/layout'

const Savings = () => {
    return (
        <>
            <h2>Savings</h2>
        </>
    )
}
Savings.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout >
    )
}

export default Savings