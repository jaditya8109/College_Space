import "./profile.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/leftbar/Leftbar';
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { useState } from "react"
import { useEffect } from "react";
import axios from "axios"
import {useParams} from "react-router"

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    fetchUser();
  }, [username] )

  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
          <div className="profileRightTop">
              <div className="profileCover">
                  <img src={user.coverPicture || PF+"person/noCover.png"} alt="" srcset="" className="profileCoverImg"/>
                  <img src={user.profilePicture || PF+"person/noAvatar.png"} alt="" srcset="" className="profileUserImg"/>
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <h4 className="profileInfoDesc">{user.desc}</h4>
              </div>
            </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            {/* creating logic for diff righbar */}
            <RightBar user={user} />
          </div>
      </div>
      
    </div>
</>
  )
}
