import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import Input from "components/Input";
import { Link } from "react-router-dom";

import style from "./BarraDeSelecaoDeVeuParaOrcamento.module.scss";

export default function BarraDeSelecaoDeVeuParaOrcamento({nomeVeu}:{nomeVeu:string}){
    return(
        <div className={style.Barra}>
            <span className={style.Barra__TextoVeu}>Véu:</span>
            <Input placeHolder="Selecione o Véu" id="" value={nomeVeu} disabled/>
            <Link to="selecionar-veu">
                <BotaoPesquisar>
                    Selecionar Véu
                </BotaoPesquisar>
            </Link>
            <Link to="selecionar-material">
                <BotaoAdicionar>
                    Adicionar Material
                </BotaoAdicionar>
            </Link>
        </div>
    );
}