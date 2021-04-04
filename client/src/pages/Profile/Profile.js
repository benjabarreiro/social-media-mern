import React, { useEffect, useState } from 'react';
import './Profile.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {Image} from 'cloudinary-react';
import Axios from 'axios';

function Profile() {

    const [yourUploads, setYourUploads] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/upload/byUser/${localStorage.getItem("username")}`).then((response) => {
            setYourUploads(response.data);
        })
    })
    return (
        <div className="Profile">
            <h1>{localStorage.getItem("username")}</h1>
            {yourUploads.map((val, key) => {
                return(
                    <div key={val.id} className="Post">
                        <div className="Image"><Image cloudName="dmpmsmabd" publicId={val.image} /></div>
                        <div className="Content">
                            <div className="title">{val.title} / by @{val.author}</div>
                            <div className="description">{val.description}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile
