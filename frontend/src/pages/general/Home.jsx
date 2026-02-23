import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    const [loading, setLoading] = useState(true)

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
    .finally(() => {
      setLoading(false)
    })
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

    if (loading) {
        return (
            <div className="loading-container">
                <svg viewBox="0 0 200 200" width="80">
                    <circle fill="#F1F5F9" stroke="#F1F5F9" strokeWidth="15" r="15" cx="40" cy="65">
                        <animate attributeName="cy" calcMode="spline" dur="2s"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-0.4s" />
                    </circle>
                    <circle fill="#F1F5F9" stroke="#F1F5F9" strokeWidth="15" r="15" cx="100" cy="65">
                        <animate attributeName="cy" calcMode="spline" dur="2s"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-0.2s" />
                    </circle>
                    <circle fill="#F1F5F9" stroke="#F1F5F9" strokeWidth="15" r="15" cx="160" cy="65">
                        <animate attributeName="cy" calcMode="spline" dur="2s"
                            values="65;135;65;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
        )
    }

    return (
        <>
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            onCommentAdd={handleCommentAdd}
            emptyMessage="No Video Available"
        />
        <BottomNav />
        </>
    )
}

export default Home
