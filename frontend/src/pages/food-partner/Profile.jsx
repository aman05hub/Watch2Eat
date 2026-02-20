import React, { useState,useEffect } from 'react';
import '../../styles/profile.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { id } = useParams();
    const [profile,setProfile] = useState(null);
    const [videos,setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials: true})
        .then(response => {
            setProfile(response.data.foodPartner);
            setVideos(response.data.foodPartner.foodItems);
        },[id])
    })

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                        <img className="profile-avatar" src="https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile Avatar" />
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business Name">{profile?.name}</h1>
                        <p className="profile-pill profile-address" title="Business Address">{profile?.address}</p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Profile statistics">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">Total Meals</span>
                        <span className="profile-stat-value">{profile?.totalMeals}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer serve</span>
                        <span className="profile-stat-value">{profile?.customerServed}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Video gallery">
                {videos.map((v) =>(
                    <div key={v._id} className="profile-grid-item">
                       
                            <video 
                            className="profile-grid-video"
                            style={{ objectFit: 'cover' , width: '100%' , height: '100%'}}
                            src={v.video} muted></video>
                        
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile;  //4:33