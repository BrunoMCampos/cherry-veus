import style from "components/Tabelas/Tabela.module.scss";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";
import IconeConfirmar from "components/Icones/Confirmar";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function LinhasTabelaSelecionarMaterialOrcamento({
    dados,
}: {
    dados: DadosCompletosMaterial;
}) {

    const navegacao = useNavigate();

    const parametros = useParams();

    const diaCadastro = dados.dataCadastro.substring(8, 10);
    const mesCadastro = dados.dataCadastro.substring(5, 7);
    const anoCadastro = dados.dataCadastro.substring(0, 4);

    const dataFormatada = diaCadastro + "/" + mesCadastro + "/" + anoCadastro;

    return (
        <tr className={style.LinhasTabela}>
            <td>
                <Link to={`../orcamentos/novo/${parametros.codigo}/adicionar-material/${dados.codigoMaterial}`}>
                    <IconeConfirmar />
                </Link>
            </td>
            <td>{dados.codigoMaterial}</td>
            <td>{dados.nome}</td>
            <td>{"R$ " + dados.preco.toFixed(2).replace(".", ",")}</td>
            <td>{dataFormatada}</td>
        </tr>
    );
}
