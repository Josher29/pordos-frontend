import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import SideBar from "../../Components/SideBar";
import Header from "../../Components/Header";
import NewThemeForm from "../../Components/NewThemeForm";


function NewTheme(){
    return(
    <>
    <div className="h-screen bg-gray-50">
        <div>
            <Header />
            <SideBar />
        </div>
        <div className="contents justify-center text-center" 
        >
                <NewThemeForm />
        </div>
    </div>
    </>
    )
}

export default NewTheme;