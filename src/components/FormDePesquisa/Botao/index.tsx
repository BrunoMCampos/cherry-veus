import { IconeBotao } from "types/IconeBotao";
import style from "../FormDePesquisa.module.scss";

export default function Botao(
    {texto, icone, type}: 
    {
        texto:string, 
        icone:IconeBotao, 
        type?:"button" | "submit" | "reset" | undefined
    }){
    return(
        <button type={type} className={style.Botao}>
            <span className={icone.className}>{icone.texto}</span>
            <span>&nbsp;</span>
            <span>{texto}</span>
        </button>
    );
}