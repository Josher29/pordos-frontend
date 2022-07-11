import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addReaction, getOpinionById, getAllOpinions } from "../../Slices/opinionSlice";

function    Entry(props){
    const dispatch = useDispatch();
   
    //dispatch(getAllOpinions);

    const reactionCounter = useSelector(
        (state) => state.opinion.opinions
      );
    
      console.log("ops: "+reactionCounter[0].votes);
   
    return (
        <>
            <div className="flex justify-center">

            <div className="m-10 bg-white grid grid-cols-6  shadow-lg w-1/2">
                <img className ="rounded-full  row-span-2 m-3" width="130" height="130"
                alt="foto" src="https://scontent.fsjo6-1.fna.fbcdn.net/v/t1.6435-9/147852908_454116449051949_8225282982884903949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ax1GZazh4i0AX8Zc8Ot&_nc_ht=scontent.fsjo6-1.fna&oh=00_AT-gaJvWE27suyv-_2mW5A7XnkoGnGv5p31ZBVFXeK5cFQ&oe=62EB4086"></img>
                
              
                <div className="justify-start col-span-5 flex-col flex">
                    <h2 className="ml-6 mt-3 font-bold items-start col-span-2">{props.username}, Opina sobre {props.theme} que:</h2>
                    <h3 className="m-3 h-20 border-2" >{props.body}</h3> 
                </div>
                <button onClick={() => {(dispatch(addReaction({id:props.id}))) }} 
                className="w-24 h-12 col-start-5 p-1 m-1 font-bold text-lg rounded-md 
                bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]">X2</button> 
                <h2 className="font-bold mt-4 text-center text-lg">
                    x<span>{reactionCounter[props.id].votes}</span></h2>

            
            </div>

            </div>

            
        </>
    )}

 export default Entry;