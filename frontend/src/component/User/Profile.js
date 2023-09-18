import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetatData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import "./Profile.css";
import ProfileImage from "../../images/Profile.png";

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated === false){
            navigate("/login");
        }
    }, [isAuthenticated])

    console.log("user::::", user);
    return ( 
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
          {user && (
            <MetaData title={`${user.name}'s Profile`} />    
          )}
            <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                {user && user.avatar && <img src={user.avatar ? user.avatar.url : ProfileImage} />}
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  {user && (
                  <p>{user.name}</p>
                  )}
                </div>
                <div>
                  <h4>Email</h4>
                  {user && (
                  <p>{user.email}</p>
                  )}
                </div>
                {user ? (
                  <div>
                    <h4>Joined On</h4>
                    {user.createdAt && <p>{String(user.createdAt).substr(0, 10)}</p>}   
                  </div>    
                ) : (
                  <p>Loading...</p> 
                )}
  
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
       );
}
 
export default Profile;