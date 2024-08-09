import React from 'react'
import Profile from './Profile'
import Posts from './Posts'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className="h-full w-full font-sans px-8">
      <Profile />
      <Posts />
    </div>
  )
}

export default HomePage
