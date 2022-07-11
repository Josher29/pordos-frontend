import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import Header from "../../Components/Header";
import Post from "../../Components/Post";
import Entry from "../../Components/Entry";
import {getAllOpinions} from "../../Slices/opinionSlice";

function Home() {

    const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();
    
    const opinions = useSelector(
      (state) => state.opinion.opinions
    );

    useEffect(()=>{
        dispatch(getAllOpinions()); 
    },[dispatch,],)

    return !userIsLoggedIn ? (
      <Navigate to="/Login" />
      ) : (
        <>
        <div>
          <Header />
          <SideBar></SideBar>
        </div>
        <div className="h-max bg-gray-50">
          <div>
            <Post></Post>
            <div>
              <h1 className="font-bold text-center m-12">Feed</h1>
              {opinions.map((o) => {
                return (
                  <Entry id={o.id} username={o.user_name} body={o.body} theme={o.theme_name} votes={o.votes}></Entry>
                );
              })}
            </div>
            
          </div>
        </div>
      </>
    );
  }
  
  
  export default Home;
  