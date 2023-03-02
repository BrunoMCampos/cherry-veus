import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import { Link } from "react-router-dom";
import { DadosLinhaTabelaVeu } from "types/DadosLinhaTabelaVeu";

import style from "components/Tabelas/Tabela.module.scss";

export default function LinhasTabelaListagemVeus({dados}:{dados:DadosLinhaTabelaVeu}){

    const diaCadastro = dados.dataCadastro.substring(8,10);
    const mesCadastro = dados.dataCadastro.substring(5,7);
    const anoCadastro = dados.dataCadastro.substring(0,4);

    const dataFormatada = diaCadastro + "/" + mesCadastro + "/" + anoCadastro;

    return(
        <tr className={style.LinhasTabela}>
            <td>
                <Link to={`editar/${dados.codigoVeu}`}>
                    <IconeEditar />
                </Link>
                <Link to={`excluir/${dados.codigoVeu}`}>       
                    <IconeExcluir />
                </Link>
            </td>
            <td>{dados.codigoVeu}</td>
            <td>{dados.nome}</td>
            <td>{dataFormatada}</td>
            <td>{dados.totalVendido + " Un."}</td>
        </tr>
    );
}