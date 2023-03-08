import style from "components/Botoes/Botoes.module.scss";

export default function BotaoPaginaAnterior({
    disabled = false,
    children = "Pagina Anterior",
}: {
    disabled: boolean;
    children?: string;
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
            <button className={style.Botao} type="button">
                <span className="material-symbols-outlined">skip_previous</span>
                <span>&nbsp;</span>
                <span>{children}</span>
            </button>
        );
    }
}
