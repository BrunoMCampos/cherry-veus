import style from "components/Botoes/Botoes.module.scss";

export default function BotaoPesquisar({children = "Pesquisar"}:{children?:string}){
    return(
        <button className={style.Botao}>
            <span className="material-symbols-outlined">search</span>
            <span>&nbsp;</span>
            <span>{children}</span>
        </button>
    );
}