import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DadosVeuOrcamento } from "types/DadosVeuOrcamento";
import style from "../Tabela.module.scss";

export default function Dado({dados, icones}:{dados:DadosVeuOrcamento, icones:string[]}){

    const [icons, setIcons] = useState(icones);

    return (
        <tr className={style.LinhasTabela}>
            <td className={style.PrimeiroItem}>
                {renderIf(icons)}
            </td>
            <td>{dados.codigo}</td>
            <td>{dados.nomeVeu}</td>
            <td>{dados.percentualDeLucro}</td>
            <td>{dados.custoTotal}</td>
            <td>{dados.precoDeVenda}</td>
            <td className={style.UltimoItem}>{dados.dataDeCriacao}</td>
        </tr>
    );
    
}

function renderIf(icones:string[]){
    if(icones != null){
        icones.map((item,index) =>{
            console.log("a");
            return(
                <span key={index}>item</span>
            );
        });
    } else{
        return(
            <span>aaa</span>
        );
    }
}

/*if(icones.length != 0){
    icones.map(item => {
        if(item == "Editar"){
            return(
                <Link key={item} to="##">
                    <span className="material-symbols-outlined">edit</span>
                </Link>
            );
        }
        else if(item == "Deletar"){
            return(
                <Link key={item} to="##">
                    <span className="material-symbols-outlined">delete</span>
                </Link>
            );
        }
        else if(item == "Selecionar"){
            return(
                <Link key={item} to="##">
                    <span className="material-symbols-outlined">select</span>
                </Link>
            );
        }
    });
}else{
    return(
        <span>a</span>
    );
}*/