import style from "components/Botoes/Botoes.module.scss";

export default function BotaoLimpar({
    onClick,
}: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button className={style.Botao} type="button" onClick={onClick}>
            <span className="material-symbols-outlined">restart_alt</span>
            <span>&nbsp;</span>
            <span>Limpar</span>
        </button>
    );
}
