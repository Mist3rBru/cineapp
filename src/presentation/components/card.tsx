import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './rating'

interface CardProps {
  uri: string
  imageUrl: string
  name: string | undefined
  rating: number
  className?: string
}

export function Card (props: CardProps) {
  const [hover, onHover] = useState(false)

  const boxWidth = parseInt(
    /\/w\d+/i.exec(props.imageUrl)
      ?.shift()
      ?.replace(/\D/g, '') as string
  )
  const heightProportion = 16 / 10 - 1
  const boxHeight = boxWidth * heightProportion

  return (
    <>
      {props.name ? (
        <Link
          to={props.uri}
          className={`relative text-title ${props.className}`}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          <img
            src={props.imageUrl}
            alt={props.name}
            style={{
              transition: 'all 0.3s ease',
              filter: hover ? 'brightness(0.3)' : 'brightness(0.8)'
            }}
          />
          <div
            className="
            absolute inset-0
            flex items-end justify-between
            p-6 transition-all
            opacity-0 hover:opacity-100
          "
          >
            <h3>{props.name}</h3>
            <Rating rate={props.rating} size={40} />
          </div>
        </Link>
      ) : (
        <div
          className={props.className}
          style={{
            display: 'block',
            height: boxHeight,
            width: !/\s?w-/i.test(props.className as string) ? boxWidth : '',
            background: '#8884'
          }}
        ></div>
      )}
    </>
  )
}
