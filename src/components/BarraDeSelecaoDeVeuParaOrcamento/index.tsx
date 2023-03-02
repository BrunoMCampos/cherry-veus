import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import Input from "components/Input";
import { Link } from "react-router-dom";

import style from "./BarraDeSelecaoDeVeuParaOrcamento.module.scss";

export default function BarraDeSelecaoDeVeuParaOrcamento(){
    return(
        <div className={style.Barra}>
            <span className={style.Barra__TextoVeu}>Véu:</span>
            <Input placeHolder="Selecione o Véu" id="" disabled/>
            <Link to="selecionar-veu">
                <BotaoPesquisar>
                    Selecionar Véu
                </BotaoPesquisar>
            </Link>
            <Link to="adicionar-material">
                <BotaoAdicionar>
                    Material
                </BotaoAdicionar>
            </Link>
        </div>
    );
}