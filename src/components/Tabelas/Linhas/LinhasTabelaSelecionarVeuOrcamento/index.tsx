import { DadosLinhaTabelaVeu } from "types/DadosLinhaTabelaVeu";

import style from "components/Tabelas/Tabela.module.scss";
import IconeConfirmar from "components/Icones/Confirmar";
import { useNavigate, useParams } from "react-router-dom";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";

export default function LinhasTabelaSelecionarVeuOrcamento({
    dadosVeu
}: {
    dadosVeu: DadosLinhaTabelaVeu
}) {

    const parametros = useParams();

    const navegacao = useNavigate();

    const diaCadastro = dadosVeu.dataCadastro.substring(8, 10);
    const mesCadastro = dadosVeu.dataCadastro.substring(5, 7);
    const anoCadastro = dadosVeu.dataCadastro.substring(0, 4);

    const dataFormatada = diaCadastro + "/" + mesCadastro + "/" + anoCadastro;

    const cadastrarOrcamento = () =>{
        if(parametros.codigo == null){
            instanciaAxios
                .post<DadosListagemGeralOrcamento>("orcamentos",{
                    codigoVeu: dadosVeu.codigoVeu
                })
                .then(resposta =>{
                    navegacao(`/orcamentos/novo-orcamento/${resposta.data.codigoOrcamento}`);
                });
        } else {
            instanciaAxios
                .put<DadosListagemGeralOrcamento>("orcamentos",{
                    codigoOrcamento: parametros.codigo,
                    codigoVeu: dadosVeu.codigoVeu
                })
                .then(resposta =>{
                    navegacao(`/orcamentos/novo-orcamento/${resposta.data.codigoOrcamento}`);
                });
        }
    };

    return (
        <tr className={style.LinhasTabela}>
            <td onClick={cadastrarOrcamento}>
                <IconeConfirmar />
            </td>
            <td>{dadosVeu.codigoVeu}</td>
            <td>{dadosVeu.nome}</td>
            <td>{dataFormatada}</td>
            <td>{dadosVeu.totalVendido + " Un."}</td>
        </tr>
    );
}
