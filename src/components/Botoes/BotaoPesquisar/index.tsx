import style from "components/Botoes/Botoes.module.scss";

export default function BotaoPesquisar({children = "Pesquisar", onClick}:{children?:string, onClick?:()=>JSX.Element}){
    return(
        <button className={style.Botao} onClick={onClick}>
            <span className="material-symbols-outlined">search</span>
            <span>&nbsp;</span>
            <span>{children}</span>
        </button>
    );
}