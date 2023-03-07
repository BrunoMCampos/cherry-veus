import InputParaApenasNumeros from "types/InputParaApenasNumeros";
import style from "./Input.module.scss";

export default function InputDinheiro({
    placeHolder,
    disabled = false,
    id,
    setter,
    campo,
    onBlur
}: {
    placeHolder?: string;
    disabled?: boolean;
    id?: string,
    setter:(value: React.SetStateAction<string>) => void,
    campo:string,
    onBlur?:React.FocusEventHandler<HTMLInputElement>
}) {
    if (disabled) {
        return (
            <input
                type="text"
                placeholder={placeHolder}
                className={style.CaixaDeTexto}
                id={id}
                disabled
            />
        );
    } else {
        return (
            <input
                type="text"
                placeholder={placeHolder}
                className={style.CaixaDeTexto}
                id={id}
                value={`${campo}`}
                onChange={(evento) => {
                    InputParaApenasNumeros(evento, setter);
                }}
                onBlur={() => {
                    setter(`R$ ${campo}`);
                    if(onBlur != undefined){
                        onBlur;
                    }
                }}
                onFocus={() => {
                    setter(`${campo.replace("R$ ", "")}`);
                }}
            />
        );
    }
}
