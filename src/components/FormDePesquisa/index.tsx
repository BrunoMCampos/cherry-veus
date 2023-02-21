import { IconeBotao } from "types/IconeBotao";
import Botao from "./Botao/index";

import style from "./FormDePesquisa.module.scss";

function FormDePesquisa(){

    const iconeBotaoPesquisar: IconeBotao = {
        className:"material-symbols-outlined", 
        texto:"search"
    };

    const iconeBotaoAdicionar: IconeBotao = {
        className:"material-symbols-outlined", 
        texto:"add_circle"
    };

    return(
        <form className={style.BarraDePesquisa}>
            <input type="text" placeholder="Dados de Pesquisa" />
            <Botao 
                type="submit"
                texto="Pesquisar"
                icone={iconeBotaoPesquisar}
            />
            <a href="##">
                <Botao
                    type="button"
                    texto="Adicionar Orçamento"
                    icone={iconeBotaoAdicionar}
                />
            </a>
        </form>
    );
}

export default FormDePesquisa;