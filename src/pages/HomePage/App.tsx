import React from "react";
import NavegacaoLateral from "../../components/NavegacaoLateral";
import Cabecalho from "../../components/Cabecalho";
import MenuDireito from "../../components/MenuDireito";
import Body from "../../components/Body";
import style from "./App.module.scss";

function App() {
    return (
        <div>
            <Cabecalho />
            <div className={style.CorpoInterno}>
                <NavegacaoLateral />
                <Body/>
                <MenuDireito />
            </div>
        </div>
    );
}

export default App;
