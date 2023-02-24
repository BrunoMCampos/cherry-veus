import BarraDePesquisa from "components/BarraDePesquisa";
import Tabela from "components/Tabela";

import style from "./Orcamentos.module.scss";

export default function Orcamentos() {

    const cabecalho = [
        "Opções",
        "Código",
        "Véu",
        "Percentual de Lucro",
        "Custo Total",
        "Preço de Venda",
        "Data de Criação",
    ];

    const dados = [
        {
            codigo: "007",
            nomeVeu: "Véu Hanah",
            percentualDeLucro: "30%",
            custoTotal: "R$ 60,71",
            precoDeVenda: "R$ 156,00",
            dataDeCriacao: "13/02/2023",
        },
        {
            codigo: "008",
            nomeVeu: "Véu Caroline",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 130,00",
            dataDeCriacao: "11/02/2023",
        },
        {
            codigo: "052",
            nomeVeu: "Véu Esmeralda",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 139,00",
            dataDeCriacao: "11/01/2023",
        },
        {
            codigo: "073",
            nomeVeu: "Véu Kamilly",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 125,00",
            dataDeCriacao: "11/06/2022",
        },
        {
            codigo: "066",
            nomeVeu: "Véu Esmeralda",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 149,00",
            dataDeCriacao: "20/06/2022",
        }
    ];

    const icones =["Editar","Deletar"];

    return (
        <> 
            <div>
                <BarraDePesquisa 
                    tituloPagina="Orçamento"
                    linkCadastro="novo-orcamento" />
            </div>
            <div className={style.FrameDeTabela}>
                <Tabela cabecalho={cabecalho} dados={dados} icones={icones}/>
            </div>
        </>
    );
}