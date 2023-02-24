import { useState } from "react";
import { DadosVeuOrcamento } from "types/DadosVeuOrcamento";
import Dado from "./Dado";

import style from "./Tabela.module.scss";

export default function Tabela({cabecalho, dados, icones}:{cabecalho:string[], dados:DadosVeuOrcamento[], icones:string[]}) {
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
                        <Dado key={item.codigo} dados={item} icones={icones}/>
                    ))}
                </tbody>
            </>
        </table>
    );
}