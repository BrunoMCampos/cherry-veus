import IconeConfirmar from "components/Icones/Confirmar";
import style from "components/Tabelas/Tabela.module.scss";

interface IProps<T> {
    dados: T[];
    colunas: {
        cabecalho: string;
        elemento: (linha: T) => string | number;
    }[];
    getPrimaryKeyFromLine: (linha: T) => number;
    tituloTabela: string;
    funcaoAoConfirmar: (key: number) => void;
}

export default function TabelaConfirmacao<T>({
    dados,
    colunas,
    getPrimaryKeyFromLine,
    tituloTabela,
    funcaoAoConfirmar,
}: IProps<T>) {
    return (
        <table className={style.Tabela}>
            <caption>{tituloTabela}</caption>
            <thead>
                <tr>
                    <th className={style.CabecalhoTabela}>Opções</th>
                    {colunas.map(({ cabecalho }, index) => (
                        <th key={index} className={style.CabecalhoTabela}>
                            {cabecalho}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dados.map((linha, indexLinha) => (
                    <tr key={indexLinha} className={style.LinhasTabela}>
                        <td>
                            <div
                                onClick={() =>
                                    funcaoAoConfirmar(
                                        getPrimaryKeyFromLine(linha)
                                    )
                                }
                            >
                                <IconeConfirmar />
                            </div>
                        </td>
                        {colunas.map((coluna, indexColuna) => (
                            <td
                                key={`${indexLinha}-${indexColuna}`}
                                className={style.LinhasTabela}
                            >
                                {coluna.elemento(linha)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
