import style from "components/Tabelas/Tabela.module.scss";
import { DadosCompletosVeu } from "types/DadosCompletosVeu";
import LinhasTabelaSelecionarVeuOrcamento from "components/Tabelas/Linhas/LinhasTabelaSelecionarVeuOrcamento";

export default function TabelaSelecionarVeuOrcamento({
    veus,
}: {
    veus?: DadosCompletosVeu[];
}) {
    const cabecalho = [
        "Opções",
        "Código",
        "Nome",
        "Data do Cadastro",
        "Total já Vendido",
    ];

    return (
        <div className={style.FrameDeTabelaEBotoes}>
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
                    {veus?.map((item) => (
                        <LinhasTabelaSelecionarVeuOrcamento
                            key={item.codigoVeu}
                            dadosVeu={item}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
