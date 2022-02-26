import "./profile.css"
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/leftbar/Leftbar';
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
          <div className="profileRightTop">
              <div className="profileCover">
                  <img src={`${PF}post/3.jpeg`} alt="" srcset="" className="profileCoverImg"/>
                  <img src={`${PF}person/7.jpeg`} alt="" srcset="" className="profileUserImg"/>
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">Aditya Jain</h4>
                  <h4 className="profileInfoDesc">Hello my friends</h4>
              </div>
            </div>
          <div className="profileRightBottom">
            <Feed/>
            {/* creating logic for diff righbar */}
            <RightBar profile/>
          </div>
      </div>
      
    </div>
</>
  )
}
