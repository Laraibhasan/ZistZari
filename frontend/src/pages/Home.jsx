import React from 'react'
import Header from '../components/Header'
import LatestCollections from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Header/>
      <LatestCollections/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox />
    </div>
  )
}

export default Home
