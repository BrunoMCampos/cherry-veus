import React from "react";
import style from "./Cabecalho.module.scss";

function Cabecalho(){
    return(
        <div className={style.Cabecalho}>
            <img src={require("../../imgs/logo.png")} alt="Logo Cherry Véus" />

            <h1>CHERRY VÉUS</h1>

            <a href="##"><span className="material-symbols-outlined">logout</span></a>
        </div>
    );
}

export default Cabecalho;