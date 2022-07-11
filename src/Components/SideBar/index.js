import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillBulb } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import {getAllThemes} from "../../Slices/themeSlice";
import { useEffect } from "react";


function SideBar(){
    const themes = useSelector(
      (state) => state.theme.themes
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(getAllThemes());
    },[dispatch])

    return (
        <>
      <div className="float-left md:w-[280px] lg:sticky lg:top-[80px]  lg:flex-initial  flex flex-col items-start justify-start  md:items-center mt-20 lg:min-h-[250vh]  my-10 lg:my-1  mx-2">
        <div className="sticky w-full shadow-md rounded-xl py-1 bg-white  flex flex-column justify-center  flex-wrap items-center h-max">
          <ul className="w-full  max-w-[100%]   flex flex-col justify-center items-center flex-wrap gap-3">
            <li className="p-3 mt-3 font-bold text-lg  flex  gap-5 flex-row items-center justify-center rounded-md
            bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
            hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]">
              <IoMdCreate/>
              <a href="/new-theme">Crear Tema</a>
            </li>
          </ul>
          <div className="w-320">
                <h1 className="mx-12 text-lg font-bold">Temas que sigues</h1>
                {themes.map((t) => {
                  return (
                    <div className="flex flex-row mx-12 my-3"  onClick={() => navigate(`/theme/${t.name}`)}>
                      <AiFillBulb className="text-lg"/>
                      <h2  className="text-lg text-center">{t.name}</h2>
                    </div>
                  );
                })}
          </div>
              
        </div>
        
      </div>
        </>
    )

}

export default SideBar;