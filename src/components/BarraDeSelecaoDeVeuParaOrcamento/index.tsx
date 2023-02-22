import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import DivFlutuante from "components/DivFlutuante";
import Input from "components/Input";
import { Link } from "react-router-dom";

import style from "./BarraDeSelecaoDeVeuParaOrcamento.module.scss";

export default function BarraDeSelecaoDeVeuParaOrcamento(){
    return(
        <div className={style.Barra}>
            <span className={style.Barra__TextoVeu}>Véu:</span>
            <Input placeHolder="Selecione o Véu" disabled/>
            <BotaoPesquisar onClick={ExibirDivFlutuante}>
                Selecionar Véu
            </BotaoPesquisar>
            <Link to="">
                <BotaoAdicionar>
                    Material
                </BotaoAdicionar>
            </Link>
        </div>
    );
}

function ExibirDivFlutuante(){
    console.log("te");
    return(
        <DivFlutuante/>
    );
}