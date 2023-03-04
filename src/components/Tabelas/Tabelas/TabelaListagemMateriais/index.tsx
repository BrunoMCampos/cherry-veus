import style from "components/Tabelas/Tabela.module.scss";
import LinhasTabelaListagemMateriais from "components/Tabelas/Linhas/LinhasTabelaListagemMateriais";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function TabelaListagemMateriais({
    materiais,
}: {
    materiais?: DadosCompletosMaterial[];
}) {
    const cabecalho = [
        "Opções",
        "Código",
        "Nome",
        "Preço Unitário",
        "Data do Cadastro",
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
                {materiais?.map((item) => (
                    <LinhasTabelaListagemMateriais
                        key={item.codigoMaterial}
                        dados={item}
                    />
                ))}
            </tbody>
        </table>
    );
}
