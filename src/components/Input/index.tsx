import style from "./Input.module.scss";

export default function Input({placeHolder, disabled=false}:{placeHolder?:string, disabled?:boolean}){
    if(disabled){
        return(
            <input type="text" placeholder={placeHolder} className={style.CaixaDeTexto} disabled/>
        );
    } else {
        return(
            <input type="text" placeholder={placeHolder} className={style.CaixaDeTexto}/>
        );
    }
}