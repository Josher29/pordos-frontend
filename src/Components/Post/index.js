import { useSelector, useDispatch } from "react-redux";
import {getAllThemes} from "../../Slices/themeSlice";
import { useEffect } from "react";
import {createOpinion} from "../../Slices/opinionSlice";

function Post(){
    const themes = useSelector(
        (state) => state.theme.themes
      );
    const user = useSelector((state) => state.user.user.user);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllThemes());
      },[dispatch])

    var themeSelected;
    var bodyMessage;

    return (
        <>
            <div className="flex justify-center">
            <div className="m-10 bg-white grid grid-cols-6 shadow-lg w-1/2">
                <img className ="rounded-full m-3" width="150" height="150"
                alt="foto" src="https://scontent.fsjo6-1.fna.fbcdn.net/v/t1.6435-9/147852908_454116449051949_8225282982884903949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ax1GZazh4i0AX8Zc8Ot&_nc_ht=scontent.fsjo6-1.fna&oh=00_AT-gaJvWE27suyv-_2mW5A7XnkoGnGv5p31ZBVFXeK5cFQ&oe=62EB4086"></img>
                <input placeholder="¿Qué estás opinando?"  onChange={(evt) => { bodyMessage = evt.target.value;}} 
                className="-translate-y-[-45%] m-6 h-20 col-span-5 border-2" 
                value={bodyMessage}></input>
                <div className="flex gap-3 items-center justify-end col-span-6">
                <h3 className="font-bold text-lg"> Tema: </h3>
                <select  value={themeSelected} onChange={(evt) => { themeSelected = evt.target.value;}}
                className="m-3 p-3" name="themes" id="themes">
                    {themes.map((t)=>{
                        return(
                            <option value={t.name}>{t.name}</option>
                        )
                    })}
                </select>

                <button className="p-3 m-3 font-bold text-lg rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                onClick = {() => dispatch(
                    createOpinion({
                        name:user.name,
                        theme:themeSelected,
                        body:bodyMessage,
                    })
                )}
                
                >Opinar</button>
          
                </div>
            
            </div>

            </div>
        </>
)}

export default Post;
