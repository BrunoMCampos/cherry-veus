import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import { Link } from "react-router-dom";

import style from "components/Tabelas/Tabela.module.scss";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";

export default function LinhasTabelaListagemOrcamento({dados}:{dados:DadosListagemGeralOrcamento}){

    const diaCadastro = dados.dataDeCriacao.substring(8,10);
    const mesCadastro = dados.dataDeCriacao.substring(5,7);
    const anoCadastro = dados.dataDeCriacao.substring(0,4);

    const dataFormatada = diaCadastro + "/" + mesCadastro + "/" + anoCadastro;

    return(
        <tr className={style.LinhasTabela}>
            <td>
                <Link to={"editar/" + dados.codigoOrcamento}>
                    <IconeEditar />
                </Link>
                <Link to={"excluir/" + dados.codigoOrcamento}>       
                    <IconeExcluir />
                </Link>
            </td>
            <td>{dados.codigoOrcamento}</td>
            <td>{dados.nomeVeu}</td>
            <td>{dados.percentualLucro.toFixed(2).replace(".",",") + " %"}</td>
            <td>{"R$ " + dados.custoTotal?.toFixed(2).replace(".",",")}</td>
            <td>{"R$ " + dados.precoVenda?.toFixed(2).replace(".",",")}</td>
            <td>{dataFormatada}</td>
        </tr>
    );
}