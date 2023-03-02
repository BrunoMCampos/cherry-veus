import style from "components/Botoes/Botoes.module.scss";

export default function BotaoPaginaAnterior({disabled=false}:{disabled:boolean}){
    if(disabled){
        return(
            <button className={style.Botao} type="button" disabled>
                <span className="material-symbols-outlined">skip_previous</span>
                <span>&nbsp;</span>
                <span>Página Anterior</span>
            </button>
        );
    } else{
        return(
            <button className={style.Botao} type="button" >
                <span className="material-symbols-outlined">skip_previous</span>
                <span>&nbsp;</span>
                <span>Página Anterior</span>
            </button>
        );
    }
    
}