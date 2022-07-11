import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";
import Modal from "../../Components/Modal";
import {getUser} from "../../Slices/userSlice";
import UserEntries from "../../Components/UserEntries"
import Entry from"../../Components/Entry";
import {getOpinionByUserName} from "../../Slices/opinionSlice";

function Profile (){
    
    
    const [showModal,setShowModal] = useState(false);
    const [img,setImg] = useState();
    const user = useSelector((state) => state.user.user.user);
    const {username} = useParams();

    const dispatch = useDispatch();
    console.log(username);
    //dispatch(getUser(username));
    getOpinionByUserName(username);

    const userProfile = useSelector(
        (state) => state.user
    ); 

    console.log(userProfile)
    const opinions = useSelector(
        (state) => state.opinion.opinions
    );
    

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };

    useEffect(()=>{
        dispatch(getUser(username))
        dispatch(getOpinionByUserName(username))
    },[dispatch,username,],)

   

    return(
        <>
            <div>
                <Header />
            </div>
            <div className="h-screen bg-gray-50">
            <div className="lg:max-w-4xl max-w-full mx-auto flex items-center justify-center flex-col ">
                    <div className="self-center flex my-3 w-full flex-row flex-wrap items-center justify-center gap-3 min-h-[50px]">
                        <img
                        className="mx-2 my-1 object-center object-cover  p-2 w-32 h-32 rounded-full"
                        alt="perfil"
                        src={userProfile.userRequested.photo}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 ">
                        <div className="flex items-center w-full flex-wrap gap-3">
                            <h1 className="font-bold text-lg">{userProfile.userRequested.name}</h1>
                            {userProfile.userRequested.name === user.name ?
                                <button
                                className="h-[48px] w-full rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                                hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                                margin="1"
                                size="xs"
                                bgColor="bg-deepBlue"
                                textColor="white"
                                title="Edit Profile"
                                onClick={() => {setShowModal(true)}}>
                                Editar el perfil
                                </button> :
                            <></> }
                            <Modal title="Editar perfil" open={showModal} onClose={()=>setShowModal(false)}>
                                <p className="font-bold text-xl">Editar el perfil</p>

                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Nombre
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                id = "user"
                                type = "text"
                                placeholder="Inserte su nombre"
                                />
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                id = "email"
                                type = "text"
                                placeholder="Inserte su correo electrónico"
                                />
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Foto de perfil
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                id="file"
                                onChange={onImageChange}
                                type="file"
                                placeholder="Su foto de perfil"
                                />
                                <div className="self-center">
                                    <img
                                    className="mx-2 my-1 object-center object-cover  p-2 w-32 h-32 rounded-full"
                                    src={img}
                                    />
                                </div>
                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                    Contraseña
                                </label>
                                <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                                id="password"
                                type="password"
                                placeholder="Inserte la nueva contraseña"
                                />
                                <div className="w-full flex flex-row py-3 items-end justify-end flex-wrap gap-1">
                                    <button
                                    className="rounded-md py-2 px-4 bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                                    hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                                    onClick={() => {}}
                                    >
                                    Enviar cambios
                                    </button>
                                </div>
                            </Modal>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
                            <h1 className="text-black">
                                <b className="text-slate-900"> {0}</b>{" "}
                                Reacciones
                            </h1>
                            <h1>
                                <b className="text-slate-900"> {0}</b> Posts
                            </h1>
                        </div>
                        <div className="flex md:self-start self-center">
                            <p className="font-normal text-sm text-black opacity-80">
                            {userProfile.userRequested.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center flex-col">
                    <h1 className="text-2xl py-2 text-slate-900 font-bold">
                        {0 ? "Tus publicaciones" : "Sin publicaciones"}
                    </h1>
                    {opinions.map((o) => {
                         if(o.user_name === userProfile.userRequested.name){
                            return (
                            <Entry id={o.id} username={o.user_name} body={o.body} theme={o.theme_name} votes={o.votes}></Entry>
                            );
                         }
                        })}
                </div>
            </div>
        </>
    )
}

export default Profile;