import axios from 'axios';
import { ReactElement, useEffect } from 'react';
import Layout from '../components/layout'
import Dashboard from '../components/pages/dashboard'

const Home = () => {

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    return
    try {
      const result = await axios.get('http://localhost:3000/fixedCosts', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        }
      })


      Promise.all(result.data).then((item) => {
        item.map(async e => {
          const res = await axios.post('http://localhost:5000/fixed-costs', { ...e, name: e.necessary, amount: e.expense, urgency: 'EARLY', status: 'PENDING' })
        })
      })
    } catch (error) {
      console.log({ error });
    }
  }
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
