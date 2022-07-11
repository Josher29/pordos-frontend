import Entry from "../Entry"
import { useDispatch, useSelector } from "react-redux";
import {getOpinionByTheme} from "../../Slices/opinionSlice";
import { useEffect } from "react";


function ThemeEntries(props){
    

    const dispatch = useDispatch();

    const themeOpinions = useSelector(
        (state) => state.opinion.opinions
    );

    useEffect(()=>{
        dispatch(getOpinionByTheme(props.theme))
    },[dispatch,props.theme],)
    
    return(
        <>
            {
            themeOpinions.map((t)=> {
                console.log("to: "+themeOpinions[0])
                if(t.theme_name === props.theme){
                return(
                   <Entry ops={themeOpinions} id={t.id} username={t.user_name} body={t.body} theme={t.theme_name} votes={t.votes}/>
                );}
            })}
        
        
        </>
    )


}

export default ThemeEntries;