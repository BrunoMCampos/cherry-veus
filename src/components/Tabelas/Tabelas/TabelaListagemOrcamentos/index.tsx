import LinhasTabelaListagemOrcamento from "../../Linhas/LinhasTabelaListagemOrcamento";

import style from "components/Tabelas/Tabela.module.scss";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";

export default function TabelaListagemOrcamentos({
    orcamentos,
}: {
    orcamentos?: DadosListagemGeralOrcamento[];
}) {
    const cabecalho = [
        "Opções",
        "Código",
        "Véu",
        "Percentual de Lucro",
        "Custo Total",
        "Preço de Venda",
        "Data de Criação",
    ];

    return (
        <table className={style.Tabela}>
            <thead>
                <tr>
                    {cabecalho.map((item, index) => (
                        <th key={index} className={style.CabecalhoTabela}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {orcamentos?.map((item) => (
                    <LinhasTabelaListagemOrcamento
                        key={item.codigoOrcamento}
                        dados={item}
                    />
                ))}
            </tbody>
        </table>
    );
}
