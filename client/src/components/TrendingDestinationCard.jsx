import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './TrendingDestinationCard.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

const TrendingDestinationCard = ({ data }) => {
  const {setCity}=useContext(SearchContext);
  return (
    <div>
      <Link 
        to={`/hotels/${data.city.toLowerCase()}`} 
        style={{ textDecoration: 'none' }}
        onClick={()=>setCity(data.city)}
      >
        <div
          className="card"
          style={{
            backgroundImage: `url(${data.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '300px',
            height: '200px',
            borderRadius: '20px',
            padding: '20px',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'flex-end',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          <h2>{data.city}</h2>
          
        </div>
      </Link>
    </div>
  )
}

export default TrendingDestinationCard
