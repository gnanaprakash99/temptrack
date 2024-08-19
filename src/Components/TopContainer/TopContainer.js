import React from 'react'
import './TopContainer.css'
import { Element } from 'react-scroll'
import TopContent from '../TopContent/TopContent'

const TopContainer = ({location}) => {
  return (
    <div>
      <Element name='today' className='topcontainer'> 
        <TopContent location={location} />
      </Element>
    </div>
  )
}

export default TopContainer
