import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import { Link } from "react-router-dom";

import style from "components/Tabelas/Tabela.module.scss";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function LinhasTabelaListagemMateriais({dados}:{dados:DadosCompletosMaterial}){

    const diaCadastro = dados.dataCadastro.substring(8,10);
    const mesCadastro = dados.dataCadastro.substring(5,7);
    const anoCadastro = dados.dataCadastro.substring(0,4);

    const dataFormatada = diaCadastro + "/" + mesCadastro + "/" + anoCadastro;

    return(
        <tr className={style.LinhasTabela}>
            <td>
                <Link to={"editar/" + dados.codigoMaterial}>
                    <IconeEditar />
                </Link>
                <Link to={"excluir/" + dados.codigoMaterial}>       
                    <IconeExcluir />
                </Link>
            </td>
            <td>{dados.codigoMaterial}</td>
            <td>{dados.nome}</td>
            <td>{"R$ " + dados.preco.toFixed(2).replace(".",",")}</td>
            <td>{dataFormatada}</td>
        </tr>
    );
}