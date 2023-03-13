import style from "components/Botoes/Botoes.module.scss";

export default function BotaoProximaPagina({
    disabled = false,
    onClick,
}: {
    disabled: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    if (disabled) {
        return (
            <button className={style.Botao} type="button" disabled>
                <span className="material-symbols-outlined">skip_next</span>
                <span>&nbsp;</span>
                <span>Proxima Página</span>
            </button>
        );
    } else {
        return (
            <button className={style.Botao} type="button" onClick={onClick}>
                <span className="material-symbols-outlined">skip_next</span>
                <span>&nbsp;</span>
                <span>Proxima Página</span>
            </button>
        );
    }
}
