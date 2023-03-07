import style from "components/Botoes/Botoes.module.scss";

export default function BotaoSalvar({children="Salvar"}:{children?:string}){
    return(
        <button className={style.Botao} type="submit">
            <span className="material-symbols-outlined">save</span>
            <span>&nbsp;</span>
            <span>{children}</span>
        </button>
    );
}