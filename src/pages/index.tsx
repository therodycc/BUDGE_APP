import { ReactElement } from 'react';
import Layout from '../components/layout';
import Dashboard from '../components/pages/dashboard';

const Home = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout >
  )
}

export default Home
