import style from "components/Botoes/Botoes.module.scss";

export default function BotaoSemIcone({children} : {children:string}){
    return(
        <button className={style.Botao}>
            {children}
        </button>
    );
}