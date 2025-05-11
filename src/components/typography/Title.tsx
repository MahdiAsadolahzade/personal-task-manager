'use client'
import { FC } from 'react'

interface TitleProps {
    // Define any props you want to pass to the Title component
    // For example, you might want to pass a title string or other properties
    title: string;
    className?: string;

}

const Title: FC<TitleProps> = ({title,className}) => {
  return <div>
    <h1 className={`text-4xl text-secondary font-bold mb-8  ${className}`}>{title}</h1>
  </div>
}

export default Title