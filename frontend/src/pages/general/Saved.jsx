import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("https://watch2eat-backend.onrender.com/api/food/save", { withCredentials: true })
            .then(response => {
                const list = response.data.savedFoods || []
                const savedFoods = list.map((item) => ({
                    _id: item?.food?._id,
                    video: item?.food?.video,
                    description: item?.food?.description,
                    likeCount: item?.food?.likeCount ?? 0,
                    savesCount: item?.food?.savesCount ?? 0,
                    commentsCount: item?.food?.commentsCount ?? 0,
                    foodPartner: item?.food?.foodPartner,
                }))
                setVideos(savedFoods)
            })
            .catch(() => {
                setVideos([])
            })
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("https://watch2eat-backend.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            
        }
    }

    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved
