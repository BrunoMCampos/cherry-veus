import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import { Link } from "react-router-dom";

import style from "components/Tabelas/Tabela.module.scss";
import { DadosLinhaTabelaMateriais } from "types/DadosLinhaTabelaMateriais";

export default function LinhasTabelaListagemMateriais({dados}:{dados:DadosLinhaTabelaMateriais}){
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
            <td>{dados.nome}</td>
            <td>{"R$ " + dados.precoUnitario.toFixed(2).replace(".",",")}</td>
            <td>{dados.dataDoCadastro}</td>
        </tr>
    );
}