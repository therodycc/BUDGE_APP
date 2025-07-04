import { ReactElement } from 'react';
import Layout from '../components/layout/base';
import Dashboard from '../components/pages/dashboard';

const Home = () => {
  return (<Dashboard />)
}

Home.getLayout = (page: ReactElement) => (
  <Layout>
    {page}
  </Layout >
)

export default Home
