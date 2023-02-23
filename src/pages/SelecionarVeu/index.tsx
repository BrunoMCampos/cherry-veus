import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import Input from "components/Input";
import Tabela from "components/Tabela";

import style from "./SelecionarVeu.module.scss";

export default function SelecionarVeu(){

    const cabecalho = ["Código", "Nome do Véu", "Opções"];

    const dados = [{
        codigo: "066",
        veu: "Véu Esmeralda"
    }];

    return(
        <div className={style.Corpo}>
            <div className={style.BarraDePesquisa}>
                <Input />
                <BotaoPesquisar />
            </div>
            <div>
                <Tabela cabecalho={cabecalho} dados={dados}/>
            </div>
        </div>
    );
}