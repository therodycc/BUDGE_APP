import React, { ReactElement } from 'react'
import Layout from '../../components/layout'
import ConfigPage from '../../components/pages/config';

const Config = () => {
    return (<ConfigPage />);
}

Config.getLayout = (page: ReactElement) => (
    <Layout>
        {page}
    </Layout >
)

export default Config