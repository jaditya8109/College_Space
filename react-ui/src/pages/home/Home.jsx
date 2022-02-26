import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/leftbar/Leftbar';
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import "./home.css";

export default function Home() {
  return (
    // using fragments cause multiple components cannot be written one
    // below another just like that
    <>
        <Topbar/>
        <div className="homeContainer">
          <Sidebar/>
          <Feed/>
          <RightBar/>
        </div>
    </>
    
  )
}
