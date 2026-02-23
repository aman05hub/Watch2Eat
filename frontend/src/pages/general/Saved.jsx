import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Saved = () => {
    const [ videos, setVideos ] = useState([])
    const [loading, setLoading] = useState(true)

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
            .finally(() => {
            setLoading(false)
        })
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("https://watch2eat-backend.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            
        }
    }

    if (loading) {
        return (
            <div style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#0b1a2f"
            }}>
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
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved
