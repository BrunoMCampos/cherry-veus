import LinhasTabelaListagemOrcamento from "../../Linhas/LinhasTabelaListagemOrcamento";

import style from "components/Tabelas/Tabela.module.scss";

export default function TabelaListagemOrcamentos() {

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
            codigo: 7,
            nomeVeu: "Véu Hanah",
            percentualDeLucro: 30,
            custoTotal: 60.71,
            precoDeVenda: 156.00,
            dataDeCriacao: "13/02/2023",
        },
        {
            codigo: 8,
            nomeVeu: "Véu Caroline",
            percentualDeLucro: 30,
            custoTotal: 50.71,
            precoDeVenda: 130.00,
            dataDeCriacao: "11/02/2023",
        },
        {
            codigo: 52,
            nomeVeu: "Véu Esmeralda",
            percentualDeLucro: 30,
            custoTotal: 50.71,
            precoDeVenda: 139.00,
            dataDeCriacao: "11/01/2023",
        },
        {
            codigo: 73,
            nomeVeu: "Véu Kamilly",
            percentualDeLucro: 30,
            custoTotal: 50.71,
            precoDeVenda: 125.00,
            dataDeCriacao: "11/06/2022",
        },
        {
            codigo: 66,
            nomeVeu: "Véu Esmeralda",
            percentualDeLucro: 30,
            custoTotal: 50.71,
            precoDeVenda: 149.00,
            dataDeCriacao: "20/06/2022",
        }
    ];
    
    return (
        <table className={style.Tabela}>
            <thead>
                <tr>
                    {cabecalho.map((item, index) => (
                        <th
                            key={index}
                            className={style.CabecalhoTabela}
                        >
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dados.map(item => (
                    <LinhasTabelaListagemOrcamento key={item.codigo} dados={item}/>
                ))}
            </tbody>
        </table>
    );
}