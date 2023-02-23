import IconeConfirmar from "components/Icones/Confirmar";
import IconeDeletar from "components/Icones/Deletar";
import IconeEditar from "components/Icones/Editar";
import { Link } from "react-router-dom";
import { DadosTabelaVeu } from "types/DadosTabelaVeu";
import style from "../Tabela.module.scss";

export default function DadosVeu({dados,tipoDeIcone}:{dados:DadosTabelaVeu, tipoDeIcone?:"IconeEditar" | "IconeDeletar" | "IconeEditarEDeletar" | "IconeConfirmar"}) {
    return (
        <tr className={style.LinhasTabela}>
            <td className={style.PrimeiroItem}>
                {renderSwitch(tipoDeIcone)}
            </td>
            <td>{dados.codigo}</td>
            <td>{dados.veu}</td>
            <td>{dados.percentualDeLucro}</td>
            <td>{dados.custoTotal}</td>
            <td>{dados.precoDeVenda}</td>
            <td className={style.UltimoItem}>{dados.dataDeCriacao}</td>
        </tr>
    );
}

function renderSwitch(tipoDeIcone?:"IconeEditar" | "IconeDeletar" | "IconeEditarEDeletar" | "IconeConfirmar"){
    switch(tipoDeIcone){
    case("IconeEditar"):
        return(
            <Link to="">
                <IconeEditar/>
            </Link>
        );
    case("IconeDeletar"):
        return(
            <Link to="">
                <IconeDeletar/>
            </Link>
        );
    case("IconeEditarEDeletar"):
        return(
            <>
                <Link to="">
                    <IconeEditar/>
                </Link>
                <Link to="">
                    <IconeDeletar/>
                </Link>
            </>
        );
    case("IconeConfirmar"):
        return(
            <Link to="">
                <IconeConfirmar/>
            </Link> 
        );
    }
}