import style from "components/Tabelas/Tabela.module.scss";
import LinhasTabelaListagemVeus from "components/Tabelas/Linhas/LinhasTabelaListagemVeus";
import { DadosCompletosVeu } from "types/DadosCompletosVeu";

export default function TabelaListagemVeus({
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
                        <LinhasTabelaListagemVeus
                            key={item.codigoVeu}
                            dados={item}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
