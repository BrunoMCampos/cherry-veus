import style from "./Filtro.module.scss";

export default function Filtro(){
    return(
        <div className={style.BarraDeFiltros}>
            <div className={style.Icones}>
                <span className="material-symbols-outlined">apps</span>
                <span className="material-symbols-outlined">format_list_bulleted</span>
            </div>
            <div className={style.Filtro}>
                <span>Ordenar</span>
                <select name="Seletor" id="Seletor">
                    <option value="VendasPorValorCrescente">Vendas por valor crescente</option>
                </select>
            </div>
        </div>
    );
}