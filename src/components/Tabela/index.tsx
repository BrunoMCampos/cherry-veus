import Dado from "./Dado";
import style from "./Tabela.module.scss";

function Tabela() {
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
            veu: "Véu Hanah",
            percentualDeLucro: "30%",
            custoTotal: "R$ 60,71",
            precoDeVenda: "R$ 156,00",
            dataDeCriacao: "13/02/2023",
        },
        {
            codigo: "008",
            veu: "Véu Caroline",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 130,00",
            dataDeCriacao: "11/02/2023",
        },
        {
            codigo: "052",
            veu: "Véu Esmeralda",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 139,00",
            dataDeCriacao: "11/01/2023",
        },
        {
            codigo: "073",
            veu: "Véu Kamilly",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 125,00",
            dataDeCriacao: "11/06/2022",
        },
        {
            codigo: "066",
            veu: "Véu Esmeralda",
            percentualDeLucro: "30%",
            custoTotal: "R$ 50,71",
            precoDeVenda: "R$ 149,00",
            dataDeCriacao: "20/06/2022",
        }
    ];
    return (
        <table className={style.Tabela}>
            <>
                <thead>
                    <>
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
                    </>
                </thead>
                <tbody>
                    {dados.map(item => (
                        <Dado key={item.codigo} {...item} />
                    ))}
                </tbody>
            </>
        </table>
    );
}

export default Tabela;
