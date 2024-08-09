import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent
} from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import SendIcon from '@mui/icons-material/Send'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
type postInfo = {
  userId: number
  id: number
  title: string
  body: string
  likes: number
  isLiked: boolean
  comments: string[]
}

function Posts() {
  const [posts, setPosts] = useState<postInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPostEditing, setCurrentPostEditing] = useState<number>(-1)
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (response.ok) {
        response.json().then((res) => {
          let _posts = [] as postInfo[]
          res.forEach((elm: postInfo) => {
            _posts.push({
              ...elm,
              likes: Math.floor(Math.random() * 100),
              comments: []
            })
          })
          setPosts(_posts)
          setLoading(false)
        })
      } else {
        console.log('error', 'Can Not Get Posts. Try Again Later!!!')
        setLoading(false)
      }
    } catch (err) {
      console.log('error', err)
      setLoading(false)
    }
  }

  const onCommentChange = (e: ChangeEvent) => {
    setComment(e.target.value)
  }

  return (
    <div>
      <h1
        className={
          'text-4xl text-center font-bold font-sans text-slate-600 mb-4'
        }
      >
        Posts
      </h1>
      <div className="flex flex-col gap-y-4">
        {posts.map((post: postInfo, index: number) => (
          <Card className="rounded-[8px]">
            <CardHeader className="font-semibold">{post.title}</CardHeader>
            <CardContent>{post.body}</CardContent>
            <CardFooter className="flex-col">
              <div className="flex flex-row items-start w-full">
                <p className="text-purple-500 mr-1 font-semibold mt-1 ">
                  {post.likes}
                </p>
                <button
                  onClick={() => {
                    let _posts = [...posts]
                    _posts[index].isLiked = !posts[index].isLiked
                    if (_posts[index].isLiked) {
                      _posts[index].likes += 1
                    } else {
                      _posts[index].likes -= 1
                    }
                    setPosts(_posts)
                  }}
                >
                  {post.isLiked ? (
                    <ThumbUpAltIcon color="secondary" />
                  ) : (
                    <ThumbUpAltOutlinedIcon color="secondary" />
                  )}
                </button>
                <p
                  className=" ml-2 text-purple-500 text-md font-semibold mt-1"
                  onClick={() => {
                    setCurrentPostEditing(index)
                  }}
                >
                  Comment
                </p>
              </div>

              {currentPostEditing !== -1 && index === currentPostEditing ? (
                <div className="flex flex-row w-full items-center gap-x-1 mt-2">
                  <Input
                    value={comment}
                    onChange={onCommentChange}
                    className="rounded-[4px]  border-purple-500"
                  />
                  <SendIcon
                    color="secondary"
                    onClick={() => {
                      let _comments = [...post.comments]
                      _comments.push(comment)
                      let _posts = [...posts]
                      _posts[index].comments = _comments
                      setComment('')
                      setCurrentPostEditing(-1)
                      setPosts(_posts)
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-4 w-full mt-2">
                {post.comments.map((comment: string, index: number) => (
                  <p className="w-full text-slate-400 text-md pb-2 border-b-2">
                    {comment}
                  </p>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Posts
