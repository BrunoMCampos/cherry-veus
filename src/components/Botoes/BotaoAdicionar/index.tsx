import style from "components/Botoes/Botoes.module.scss";

export default function BotaoAdicionar({children}:{children:string}){
    return(
        <button className={style.Botao} type="button">
            <span className="material-symbols-outlined">add_circle</span>
            <span>&nbsp;</span>
            <span>{children}</span>
        </button>
    );
}