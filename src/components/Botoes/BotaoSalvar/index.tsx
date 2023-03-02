import style from "components/Botoes/Botoes.module.scss";

export default function BotaoSalvar(){
    return(
        <button className={style.Botao} type="submit">
            <span className="material-symbols-outlined">save</span>
            <span>&nbsp;</span>
            <span>Salvar</span>
        </button>
    );
}