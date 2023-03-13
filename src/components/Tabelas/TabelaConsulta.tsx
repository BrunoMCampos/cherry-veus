import { Link } from "react-router-dom";
import style from "components/Tabelas/Tabela.module.scss";
import IconeDados from "components/Icones/Dados";

interface IProps<T> {
    dados: T[];
    colunas: {
        cabecalho: string;
        elemento: (linha: T) => string | number;
    }[];
    getPrimaryKeyFromLine: (linha: T) => string | number;
    tituloTabela:string
}

export default function TabelaConsulta<T>({
    dados,
    colunas,
    getPrimaryKeyFromLine,
    tituloTabela
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
                            <Link to={`detalhar/${getPrimaryKeyFromLine(linha)}`}>
                                <IconeDados />
                            </Link>
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
