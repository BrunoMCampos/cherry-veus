import FormDePesquisa from "components/FormDePesquisa";
import Tabela from "components/Tabela";

import style from "./Orcamentos.module.scss";

function Orcamentos() {
    return (
        <> 
            <div>
                <FormDePesquisa 
                    tituloPagina="Orçamento"
                    linkCadastro="novo-orcamento" />
            </div>
            <div className={style.FrameDeTabela}>
                <Tabela />
            </div>
        </>
    );
}

export default Orcamentos;
