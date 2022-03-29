import axios from 'axios';
import { useEffect } from 'react';
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
          console.log({ res }, 'adsfasdfasd');
        })
      })
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
    </>
  )
}

export default Home
