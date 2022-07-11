import React, { useState } from "react";
import { createTheme } from "../../Slices/themeSlice";
import {useDispatch} from "react-redux";

const options = [
    { value: "deportes", label: "Deporte" },
    { value: "musica", label: "Música" },
    { value: "estudios", label: "Estudio"}
]

function NewThemeForm() {

    const [img, setImg] = useState();

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImg(URL.createObjectURL(file));
    };

    const dispatch = useDispatch();

    const [themeName,setThemeName] = useState("");
    const [themeDescription, setThemeDescription] = useState("");

    return (
        <>
                <div className="m-10">
                    <p className="text-5xl">Crear tema</p>
                            <div>
                                <label>
                                    Portada:
                                    <div>
                                        <input type="file" onChange={onImageChange} />
                                        <div className="flex justify-center">
                                            <img className="mx-2 my-1 object-center object-cover  p-2 w-32 h-32 rounded-full"
                                            src={img} alt="selected theme img"/>
                                        </div>
                                    </div>
                                </label>
                            </div>
                                <div>
                                <label>
                                    Nombre del tema:
                                    <div>
                                        <input 
                                        type="text" 
                                        name="name" 
                                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker"
                                        placeholder="Nombre del tema"
                                        value={themeName}
                                        onChange = {(evt) => {
                                            setThemeName(evt.target.value);
                                        }}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Tipo:
                                </label>
                                <div>
                                    <select  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" name="type" id="type" options={options}>
                                       {options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                       ))} 
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>
                                    Descripción:
                                    <div>
                                        <input 
                                        type="text" 
                                        name="Descripción" 
                                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker"
                                        placeholder="Escriba la descripción del tema"
                                        value={themeDescription}
                                        onChange = {(evt) => {
                                            setThemeDescription(evt.target.value);
                                        }}
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="h-[48px] w-1/4 mt-2 rounded-md bg-gradient-to-r from-[#e8d273] via-[#f8e181] to-[#fffb99]
                                    hover:from-[#fffb99] hover:via-[#f8e181] hover:to-[#e8d273]"
                                    onClick={() => {
                                        dispatch(
                                            createTheme({
                                                img,
                                                themeName,
                                                themeDescription,
                                            })
                                        )
                                    }}
                                >
                                Crear tema
                                </button>   
                            </div>
                    </div>
        </>
    );
}

export default NewThemeForm