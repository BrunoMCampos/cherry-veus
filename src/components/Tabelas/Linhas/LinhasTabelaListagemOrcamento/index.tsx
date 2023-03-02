import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import { DadosLinhaTabelaOrcamento } from "types/DadosLinhaTabelaOrcamento";
import { Link } from "react-router-dom";

import style from "components/Tabelas/Tabela.module.scss";

export default function LinhasTabelaListagemOrcamento({dados}:{dados:DadosLinhaTabelaOrcamento}){
    return(
        <tr className={style.LinhasTabela}>
            <td>
                <Link to={"editar/" + dados.codigo}>
                    <IconeEditar />
                </Link>
                <Link to={"excluir/" + dados.codigo}>       
                    <IconeExcluir />
                </Link>
            </td>
            <td>{dados.codigo}</td>
            <td>{dados.nomeVeu}</td>
            <td>{dados.percentualDeLucro?.toFixed(2).replace(".",",") + " %"}</td>
            <td>{"R$ " + dados.custoTotal?.toFixed(2).replace(".",",")}</td>
            <td>{"R$ " + dados.precoDeVenda?.toFixed(2).replace(".",",")}</td>
            <td>{dados.dataDeCriacao}</td>
        </tr>
    );
}