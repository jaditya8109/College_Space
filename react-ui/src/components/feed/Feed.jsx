import { useEffect, useState } from "react";
import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import axios from "axios"
import { useContext } from "react";
import{AuthContext} from "../../context/AuthContext"
// import {Posts} from "../../dummyData"

export default function Feed({username}) {
  // use state hook
  const[posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
       ? await axios.get("/post/profile/" + username)
       : await axios.get("/post/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
    fetchPost();
  }, [username, user._id] )

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {posts.map((p) => ( 
            <Post key= {p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
