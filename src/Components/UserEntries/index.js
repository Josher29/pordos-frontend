import Entry from "../Entry"
import { useDispatch, useSelector } from "react-redux";
import {getOpinionByUserName} from "../../Slices/opinionSlice";
import { useEffect } from "react";


function UserEntries(props){
    const userOpinions = useSelector(
        (state) => state.opinion.opinions
    );

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getOpinionByUserName(props.username));
    },[dispatch,props.username,userOpinions],)
    

    return(
        <>
            {userOpinions.map((o)=> {
                if(o.user_name === props.username){
                return(
                    <Entry id={o.id} username={o.user_name} body={o.body} theme={o.theme_name} votes={o.votes}/>
                );}
            })}
        
        
        </>

    )


}

export default UserEntries;