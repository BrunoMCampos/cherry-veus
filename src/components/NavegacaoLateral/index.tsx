import React from "react";
import style from "./NavegacaoLateral.module.scss";

function NavegacaoLateral(){
    return(
        <nav className={style.NavegacaoLateral}>
            <ul>
                <li><a href="##">HOME</a></li>
                <li><a href="##">VÉUS</a></li>
                <li><a href="##">ORÇAMENTOS</a></li>
                <li><a href="##">MATÉRIAS PRIMAS</a></li>
                <li><a href="##">CLIENTE</a></li>
                <li><a href="##">VENDAS</a></li>
            </ul>
        </nav>
    );
}

export default NavegacaoLateral;