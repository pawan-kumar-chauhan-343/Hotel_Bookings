import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./GitHub.css"
import { Link } from 'react-router-dom';
const Pawan_GitHub = () => {
    const [profile, setProfile] = useState("")
    const userName = "pawan-kumar-chauhan-343" // Change gitHub user name
    // const userName ="mangeshp31"
    const getHotel = async () => {
        try {
            const response = await axios.get('https://api.github.com/users/' + userName);
            setProfile(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getHotel()
    }, [])

    console.log(profile)

    // ============================================
    return (
        <div className="bg_gitHub container">
            <div className='gitHub row'>
                <div className="image_div_gitHub col-md-4 ">
                    <img src={profile.avatar_url} alt="image" className='image_gitHub' />
                </div>

                <div className='details_gitHub  col-md-8'>
                    <div className="name_link_gitHub">
                        <div className='name_gitHub'>{profile.name}</div>
                        <Link to={profile.html_url} target='blank' className='link_gitHub'>Go To GitHub</Link>
                    </div>

                    <div className='bio_gitHub'>{profile.bio}</div>
                    <div className='login_gitHub'><b className='b_gitHub'>UserName</b> : {profile.login}</div>
                    <div className='project_gitHub'><b className='b_gitHub'>Public Projects</b> : {profile.public_repos} uploaded</div>
                    <div className='following_gitHub'><b className='b_gitHub'>Following</b> : {profile.following}</div>

                    <div className='followers_gitHub'><b className='b_gitHub'>Follows</b> : {profile.followers} </div>
                </div>
            </div>
        </div>
    )
}

export default Pawan_GitHub
