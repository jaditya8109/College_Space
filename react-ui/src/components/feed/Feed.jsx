import { useEffect, useState } from "react";
import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import axios from "axios"
// import {Posts} from "../../dummyData"

export default function Feed() {
  // use state hook
  const[posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("post/timeline/62167470e785c1e4209508e0")
      setPosts(res.data)
    }
    fetchPost();
  }, [] )
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
