import style from "components/Tabelas/Tabela.module.scss";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";
import LinhasTabelaSelecionarMaterialOrcamento from "components/Tabelas/Linhas/LinhasTabelaSelecionarMaterialOrcamento";

export default function TabelaSelecionarMaterialOrcamento({
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
                    <LinhasTabelaSelecionarMaterialOrcamento
                        key={item.codigoMaterial}
                        dados={item}
                    />
                ))}
            </tbody>
        </table>
    );
}
