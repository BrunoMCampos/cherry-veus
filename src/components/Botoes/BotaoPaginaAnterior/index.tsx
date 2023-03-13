import style from "components/Botoes/Botoes.module.scss";

export default function BotaoPaginaAnterior({
    disabled = false,
    children = "Pagina Anterior",
    onClick
}: {
    disabled: boolean;
    children?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
    if (disabled) {
        return (
            <button className={style.Botao} type="button" disabled>
                <span className="material-symbols-outlined">skip_previous</span>
                <span>&nbsp;</span>
                <span>{children}</span>
            </button>
        );
    } else {
        return (
            <button className={style.Botao} type="button" onClick={onClick}>
                <span className="material-symbols-outlined">skip_previous</span>
                <span>&nbsp;</span>
                <span>{children}</span>
            </button>
        );
    }
}
