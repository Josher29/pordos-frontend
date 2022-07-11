import { useEffect} from "react";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import Entry from"../../Components/Entry";
import ThemeEntries from "../../Components/ThemeEntries";
import { useDispatch, useSelector } from "react-redux";
import { getThemeByName } from "../../Slices/themeSlice";
import {getOpinionByTheme} from "../../Slices/opinionSlice";
import { useParams } from "react-router-dom";


function Theme(){
    
    const {themeName} = useParams(); 
    const dispatch = useDispatch();
    getThemeByName(themeName)
    getOpinionByTheme(themeName)
    
    const theme = useSelector(
        (state) => state.theme.theme
    );
    
    const opinions = useSelector(
        (state) => state.opinion.opinions
    );

    console.log("consl: "+theme)
  
    useEffect(()=>{
        dispatch(getThemeByName(themeName))
        dispatch(getOpinionByTheme(themeName));
    },[dispatch,themeName])

    return(
        <>
            <div>
                <Header/>
                <SideBar />
            </div>
            <div className="h-screen bg-gray-50">
                <div className="contents justify-center text-center">
                    <img
                                className="justify-center item-center mx-auto my-1 p-2 w-32 h-32 rounded-full"
                                alt="perfil"
                                src={theme.photo}
                    />
                    <h1 className="font-bold text-3xl">{theme.name}</h1>
                    <h2 className="font-bold">{theme.description}</h2>
                    <div className="justify-center text-center">
                        &nbsp;&nbsp;
                        <h2 className="font-bold text-lg"> Publicaciones </h2>
                        <div>
                        {opinions.map((o) => {
                            if(o.theme_name === theme.name){
                            return (
                            <Entry id={o.id} username={o.user_name} body={o.body} theme={o.theme_name} votes={o.votes}></Entry>
                            );
                        }
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Theme;