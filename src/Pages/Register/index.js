import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";


export default function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [passwordError, setPasswordError] = useState (false);

    const [img,setImg] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };
  
    const theme = useSelector((state) => state.app.theme);
    const userIsLoggedIn = useSelector((state) => state.user.userIsLoggedIn);
    const errorMessage = useSelector((state) => state.user.errorMessage);

    useEffect((e) => {

        if(passwordChanged){
            if(password === passwordConfirmation){
                setPasswordError(false);
                setPasswordChanged(false);
            }
            else {
                setPasswordError(true);
            }
        }
    },[passwordConfirmation,passwordChanged,password]
    )

    const handlerPassConf = (e) => {
        setPasswordConfirmation(e.target.value);
        setPasswordChanged(true);
    }

    const handleRegistration = (username,email,password,img) => {
        dispatch(
            createUser({
                username,
                email,
                password,
                img,
            })
        ).then(result => {
            console.log(result.payload.status);
            if(result.payload.status === 200){
                navigate("/login");
            }
        })
        .catch(err => alert("No se pudo crear la cuenta, esto puede ser debido a que el usuario o el correo ya están en uso")) 
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#fff] via-[#9bb1ff] to-[#7790ee]">
           <div className="text-center  ">
                <div className="mb-5 flex justify-center">
                    <h1 className="text-4xl font-bold ">¡Registrate y sé parte de por dos!</h1>
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Usuario"
                        className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
                        value={username}
                        onChange={(evt) => {
                            setUsername(evt.target.value);
                        }}
                    />
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Email"
                        className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
                        value={email}
                        onChange={(evt) => {
                            setEmail(evt.target.value);
                        }}
                    />
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Contraseña"
                        className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
                        type="password"
                        value={password}
                        onChange={(evt) => {
                            setPassword(evt.target.value);
                        }}
                    />
                    {passwordError && passwordChanged ?
                        <div>
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Las contraseñas no coinciden!</p>
                        </div>
                        : "" }
                </div>
                <div className="mb-4">
                    <input
                        placeholder="Confirmar Contraseña"
                        className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
                        type="password"
                        value={passwordConfirmation}
                        onChange={(handlerPassConf)}
                    />
                </div>
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
                <div className="flex justify-center">
                    <img
                    className="mx-2 my-1 object-center object-cover  p-2 w-32 h-32 rounded-full"
                    src={img}
                    />
                </div>
                <button
                    className="h-[48px] w-full rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                    hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                    onClick={() => {
                        handleRegistration(username, email, password, img);
                    }}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}