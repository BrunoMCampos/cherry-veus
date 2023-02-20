import React from "react";
import style from "./FormDePesquisa.module.scss";

function FormDePesquisa(){
    return(
        <form className={style.BarraDePesquisa}>
            <input type="text" placeholder="Dados de Pesquisa" />
            <button className={style.Botao}>
                <span className="material-symbols-outlined">search</span>
                <span>Pesquisar</span>
            </button>
        </form>
    );
}

export default FormDePesquisa;