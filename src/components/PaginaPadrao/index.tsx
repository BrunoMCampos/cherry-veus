import Cabecalho from "components/Cabecalho";
import MenuDireito from "components/MenuDireito";
import NavegacaoLateral from "components/NavegacaoLateral";
import { Outlet } from "react-router-dom";

import style from "./PaginaPadrao.module.scss";

export default function PaginaPadrao(){
    return(
        <>
            <Cabecalho />
            <div className={style.CorpoInterno}>
                <NavegacaoLateral />
                <div className={style.Principal}>
                    <Outlet/>
                </div>
                <MenuDireito />
            </div>
        </>
    );
}