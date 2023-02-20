import React from "react";
import FormDePesquisa from "../FormDePesquisa";
import Tabela from "../Tabela";
import style from "./Body.module.scss";

function Body(){
    return(
        <div className={style.Principal}>
            <div>
                <FormDePesquisa/>
            </div>
            <div className={style.FrameDeTabela}>
                <Tabela/>
            </div>
        </div>
    );
}

export default Body;