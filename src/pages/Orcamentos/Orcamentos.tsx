import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import TabelaListagemOrcamentos from "components/Tabelas/Tabelas/TabelaListagemOrcamentos";
import { Link } from "react-router-dom";

import style from "./Orcamentos.module.scss";

export default function Orcamentos() {
    return (
        <> 
            <div className="FrameDePesquisa">
                <BarraDePesquisa />
                <Link to="novo-orcamento">
                    <BotaoAdicionar >
                        Novo Orcamento
                    </BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaListagemOrcamentos/>
            </div>
        </>
    );
}