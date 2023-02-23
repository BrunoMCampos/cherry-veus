import { DadosTabelaVeu } from "types/DadosTabelaVeu";
import DadosVeu from "./DadosVeu";
import style from "./Tabela.module.scss";

function Tabela({cabecalho, dados}:{cabecalho:string[], dados:DadosTabelaVeu[]}) {
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
                        <DadosVeu key={item.codigo} dados={item} />
                    ))}
                </tbody>
            </>
        </table>
    );
}

export default Tabela;
