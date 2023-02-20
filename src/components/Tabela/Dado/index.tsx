import React from "react";
import style from "../Tabela.module.scss";

export default function Dado({
    codigo,
    veu,
    percentualDeLucro,
    custoTotal,
    precoDeVenda,
    dataDeCriacao,
}: {
    codigo: string;
    veu: string;
    percentualDeLucro: string;
    custoTotal: string;
    precoDeVenda: string;
    dataDeCriacao: string;
}) {
    return (
        <tr className={style.LinhasTabela}>
            <td className={style.PrimeiroItem}>
                <a href="##">
                    <span className="material-symbols-outlined">edit</span>
                </a>
                <a href="##">
                    <span className="material-symbols-outlined">delete</span>
                </a>
            </td>
            <td>{codigo}</td>
            <td>{veu}</td>
            <td>{percentualDeLucro}</td>
            <td>{custoTotal}</td>
            <td>{precoDeVenda}</td>
            <td className={style.UltimoItem}>{dataDeCriacao}</td>
        </tr>
    );
}
