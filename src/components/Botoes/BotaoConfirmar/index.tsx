import style from "components/Botoes/Botoes.module.scss";

export default function BotaoConfirmar(){
    return(
        <button className={style.Botao} type="submit">
            <span className="material-symbols-outlined">done</span>
            <span>&nbsp;</span>
            <span>Confirmar</span>
        </button>
    );
}