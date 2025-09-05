import React from 'react'
import Home from './Home'

interface HomeWithTabProps {
  tab: 'introduction' | 'deployments' | 'tutorials' | 'jenkins'
}

const HomeWithTab: React.FC<HomeWithTabProps> = ({ tab }) => {
  return <Home initialTab={tab} />
}

export default HomeWithTab
