import { Link } from "react-router-dom";

import style from "./BarraDePesquisa.module.scss";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import Input from "components/Input";

export default function BarraDePesquisa({tituloPagina, linkCadastro}: {tituloPagina?:string, linkCadastro?: string}){
    return(
        <form className={style.BarraDePesquisa}>
            <Input placeHolder="Dados de Pesquisa"/>
            <BotaoPesquisar />
            {renderif(tituloPagina, linkCadastro)}
        </form>
    );

    
}

function renderif(tituloPagina?:string, linkCadastro?:string){
    if(linkCadastro != "" && linkCadastro != null && linkCadastro != undefined){
        if(tituloPagina == null || tituloPagina == undefined){
            tituloPagina = "";
        }
        return(
            <Link to={linkCadastro}>
                <BotaoAdicionar>
                    {tituloPagina}
                </BotaoAdicionar>
            </Link>
        );
    }
}