import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import { postLogin } from "../../Slices/userSlice";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const theme = useSelector((state) => state.app.theme);
    const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const errorMessage = useSelector((state) => state.user.errorMessage);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    return userIsLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <div className="grid grid-cols-2 gap-4 bg-gradient-to-r from-[#fff] via-[#9bb1ff] to-[#7790ee]">
        <div className="flex items-center justify-center h-screen top-1/2 flex-col">
          <Logo width="w-96" height="h-96"></Logo>
          <h2 className="font-bold">Opiná y conocé lo que opinan los demás de lo que está pasando ahora mismo!</h2>
        </div>
        <div className="w-2/4">
          <div className="flex items-center justify-center h-screen ml-32">
            <div className="text-center">
              <div className="mb-4">
                <h1 className="text-3xl font-bold">¡Bienvenido!</h1>
              </div>
              <div className="mb-4">
                <input
                  placeholder="Email"
                  className={`placeholder:text-black pl-4 h-[48px] w-full rounded-md ${theme.inputBg} ${theme.inputText}`}
                  value={username}
                  onChange={(evt) => {
                    setUsername(evt.target.value);
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
              </div>
              {errorMessage && <span className="text-red-500">{errorMessage}</span>}
              <button
                className="h-[48px] w-full rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                onClick={() => {
                  dispatch(
                    postLogin({
                      username,
                      password,
                    })
                  ).then(navigate("/"));
                }}
              >
                Iniciar Sesión
              </button>
              <button className="my-3  h-[48px] w-full rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                onClick={() => navigate("/register")} 
              >
                Registrarse
                </button>    
                 
               <p className="font-bold">Olvidé mi Contraseña</p>   



            </div>
          </div>
        </div>
      </div>
    );
  }
  