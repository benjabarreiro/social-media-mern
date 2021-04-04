import React, { useEffect, useState } from 'react'
import './Home.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {Image} from 'cloudinary-react';
import Axios from 'axios';

function Home() {

    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", false);
        }
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/upload").then((response) => {
            setUploads(response.data);
        });
    }, []);

    const likePost = (id, key) => {
        var tempLikes = uploads;
        tempLikes[key].likes = tempLikes[key] + 1;
        Axios.post('http://localhost:3001/upload/like', {userLiking: localStorage.getItem("username"), postId: id}).then((response) => {
            setUploads(tempLikes);
        });
    };
    return (
        <div className="Home">

            {uploads.map((val, key) => {
                return(
                    <div key={val.id} className="Post">
                        <div className="Image"><Image cloudName="dmpmsmabd" publicId={val.image} /></div>
                        <div className="Content">
                            <div className="title">{val.title} / by @{val.author}</div>
                            <div className="description">{val.description}</div>
                        </div>
                        <div className="Engagement">
                            <ThumbUpAltIcon id="likeButton" onClick={() => {
                                likePost(val.id, key);
                            }} />
                            {val.likes}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
