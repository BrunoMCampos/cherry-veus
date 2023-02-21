import { Link } from "react-router-dom";

import style from "./FormDePesquisa.module.scss";
import BotaoPesquisar from "components/BotaoPesquisar";
import BotaoAdicionar from "components/BotaoAdicionar";
import Input from "components/Input";

function FormDePesquisa({tituloPagina, linkCadastro}: {tituloPagina:string, linkCadastro: string}){
    return(
        <form className={style.BarraDePesquisa}>
            <Input placeHolder="Dados de Pesquisa"/>
            <BotaoPesquisar />
            <Link to={linkCadastro}>
                <BotaoAdicionar>
                    {tituloPagina}
                </BotaoAdicionar>
            </Link>
        </form>
    );
}

export default FormDePesquisa;