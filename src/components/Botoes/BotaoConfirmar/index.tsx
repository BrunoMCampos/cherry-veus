import style from "components/Botoes/Botoes.module.scss";

export default function BotaoConfirmar({children="Confirmar"}:{children?:string}){
    return(
        <button className={style.Botao} type="submit">
            <span className="material-symbols-outlined">done</span>
            <span>&nbsp;</span>
            <span>{children}</span>
        </button>
    );
}