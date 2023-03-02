import LinhasTabelaListagemOrcamento from "../../Linhas/LinhasTabelaListagemOrcamento";

import style from "components/Tabelas/Tabela.module.scss";
import { DadosLinhaTabelaMateriais } from "types/DadosLinhaTabelaMateriais";
import LinhasTabelaListagemMateriais from "components/Tabelas/Linhas/LinhasTabelaListagemMateriais";

export default function TabelaListagemMateriais() {

    const cabecalho = [
        "Opções",
        "Código",
        "Nome",
        "Preço Unitário",
        "Data do Cadastro"
    ];

    const dados:DadosLinhaTabelaMateriais[] = [
        {
            codigo: 1,
            nome: "Tule Poá",
            precoUnitario: 13.75,
            dataDoCadastro: "13/02/2023"
        },
        {
            codigo: 2,
            nome: "Tule de Véu",
            precoUnitario: 9.10,
            dataDoCadastro: "13/02/2023"
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
                    <LinhasTabelaListagemMateriais key={item.codigo} dados={item}/>
                ))}
            </tbody>
        </table>
    );
}