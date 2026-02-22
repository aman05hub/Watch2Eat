import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("https://watch2eat-backend.onrender.com/api/food", { withCredentials: true })
            .then(response => {
                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    useEffect(() => {
  axios
    .get("https://watch2eat-backend.onrender.com/api/food", { withCredentials: true })
    .then((response) => {
      const items = (response.data.foodItems || []).map((item) => ({
        ...item,
        commentsCount: item.commentsCount ?? 0,
      }))
      setVideos(items)
    })
    .catch(() => {})
}, [])

const handleCommentAdd = (foodId) => {
  setVideos((prev) =>
    prev.map((v) =>
      v._id === foodId ? { ...v, commentsCount: (v.commentsCount ?? 0) + 1 } : v
    )
  )
}


    async function likeVideo(item){
        const response = await axios.post("https://watch2eat-backend.onrender.com/api/food/like", { foodId: item._id }, { withCredentials: true })

        if(response.data.like){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }
        else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1} : v))
        }
    }

    async function saveVideo(item){
        const response = await axios.post("https://watch2eat-backend.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })

        if(response.data.save){ 
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1} : v))
        }
        else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1} : v))
        }
    }

    return (
        <>
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            onCommentAdd={handleCommentAdd}
            emptyMessage="Loding... Please Wait..."
        />
        <BottomNav />
        </>
    )
}

export default Home //4:28
