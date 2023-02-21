import BotaoAdicionar from "components/BotaoAdicionar";
import BotaoPesquisar from "components/BotaoPesquisar";
import Input from "components/Input";

import style from "./BarraDeSelecaoDeVeuParaOrcamento.module.scss";

export default function BarraDeSelecaoDeVeuParaOrcamento(){
    return(
        <div className={style.Barra}>
            <span className={style.Barra__TextoVeu}>Véu:</span>
            <Input placeHolder="Selecione o Véu" disabled/>
            <BotaoPesquisar>
                Selecionar Véu
            </BotaoPesquisar>
            <BotaoAdicionar>
                Material
            </BotaoAdicionar>
        </div>
    );
}