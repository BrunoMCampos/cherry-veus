import style from "components/Botoes/Botoes.module.scss";

export default function BotaoExcluir(){
    return(
        <button className={`${style.Botao} ${style.BotaoExcluir}`} type="button">
            <span className="material-symbols-outlined">delete</span>
            <span>&nbsp;</span>
            <span>Excluir</span>
        </button>
    );
}