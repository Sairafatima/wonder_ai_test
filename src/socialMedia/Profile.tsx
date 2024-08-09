import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

type profileInfoProps = {
  name: string
  about: string
  picture: string
  isOnline: boolean
}

type profileProps = {
  userId?: number
}
function Profile({ userId }: profileProps) {
  const [profile, setProfile] = useState<profileInfoProps>(
    {} as profileInfoProps
  )
  useEffect(() => {
    if (!userId || userId === -1) {
      setProfile({
        name: 'Jessica',
        isOnline: true,
        about:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',

        picture:
          'https://i.pinimg.com/550x/38/09/c3/3809c319d6b40a4efda99bf5500fe6ef.jpg'
      })
    }
  }, [])

  const toggleStatus = () => {
    let _profile = { ...profile }
    _profile.isOnline = !profile.isOnline
    setProfile(_profile)
  }
  return (
    <div className="flex flex-col w-100 h-96 items-center pt-12 gap-y-3">
      <img
        src={profile.picture}
        alt={''}
        className="h-32 w-32 lg:h-62 lg:w-62 object-cover rounded-full"
      />
      <Badge variant={profile.isOnline ? 'online' : 'offline'}>
        <div
          className={`h-2 w-2 mr-2 rounded-full ${
            profile.isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></div>
        <p className="text-xs font-semibold text-inherit">
          {profile.isOnline ? 'Online' : 'Offline'}
        </p>
      </Badge>

      <Button
        variant={profile.isOnline ? 'online' : 'offline'}
        size={'sm'}
        className="rounded-[8px]"
        onClick={toggleStatus}
      >
        {profile.isOnline ? 'Go Offline' : 'Go Online'}
      </Button>
      <h1 className="text-2xl font-bold text-slate-600">{profile.name}</h1>
      <p className="text-sm font-light text-slate-600">{profile.about}</p>
    </div>
  )
}

export default Profile
