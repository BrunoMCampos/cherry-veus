import { useState, useEffect } from "react";
import FormatarParaFloat from "types/FormatarParaFloat";
import style from "./Input.module.scss";

export default function InputPercentual({
    placeHolder,
    disabled = false,
    id,
    setter,
    campo,
    onBlur,
    valorPadrao=0,
}: {
    placeHolder?: string;
    disabled?: boolean;
    id?: string;
    campo: number;
    setter: (value: React.SetStateAction<number>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    valorPadrao?: number;
}) {
    const [valorDoInput, setValorDoInput] = useState("");

    useEffect(() => {
        setValorDoInput(`${campo.toFixed(2).replace(".", ",")} %`);
    }, []);
    useEffect(() => {
        if (campo == valorPadrao) {
            setValorDoInput(`${valorPadrao.toFixed(2).replace(".", ",")} %`);
        }
    }, [campo]);

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
                value={valorDoInput}
                onChange={(evento) => {
                    if (FormatarParaFloat(evento.target.value) <= 100) {
                        setValorDoInput(
                            `${FormatarParaFloat(evento.target.value)
                                .toFixed(2)
                                .replace(".", ",")}`
                        );
                        setter(FormatarParaFloat(evento.target.value));
                    }
                }}
                onBlur={(evento) => {
                    setValorDoInput(
                        `${FormatarParaFloat(evento.target.value)
                            .toFixed(2)
                            .replace(".", ",")} %`
                    );
                    if (onBlur != undefined) {
                        onBlur(evento);
                    }
                }}
                onFocus={() => {
                    setValorDoInput(`${valorDoInput.replace(" %", "")}`);
                }}
            />
        );
    }
}
