import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import TabelaListagemMateriais from "components/Tabelas/Tabelas/TabelaListagemMateriais";
import { Link } from "react-router-dom";

export default function ConsultaDeMateriais(){
    return(
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa />
                <Link to="novo-material">
                    <BotaoAdicionar>
                        Cadastrar Material
                    </BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaListagemMateriais/>
            </div>
        </>
    );
}