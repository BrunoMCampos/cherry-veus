import style from "components/Botoes/Botoes.module.scss";

export default function BotaoCancelar(){
    return(
        <button className={style.Botao} type="button">
            <span className="material-symbols-outlined">cancel</span>
            <span>&nbsp;</span>
            <span>Cancelar</span>
        </button>
    );
}