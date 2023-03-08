import style from "./Input.module.scss";

import { useEffect, useState } from "react";
import FormatarParaFloat from "types/FormatarParaFloat";

export default function InputNumerico({
    placeHolder,
    disabled = false,
    id,
    setter,
    campo,
    casasDecimais = 2,
    onBlur,
    valorPadrao=0,
}: {
    placeHolder?: string;
    disabled?: boolean;
    id?: string;
    campo: number;
    setter: (value: React.SetStateAction<number>) => void;
    casasDecimais: number;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    valorPadrao?: number;
}) {
    const [valorDoInput, setValorDoInput] = useState("");

    useEffect(() => {
        setValorDoInput(`${campo.toFixed(casasDecimais).replace(".", ",")}`);
    }, []);

    useEffect(() => {
        if (campo == valorPadrao) {
            setValorDoInput(
                `${valorPadrao.toFixed(casasDecimais).replace(".", ",")}`
            );
        } else if(disabled) {
            setValorDoInput(
                `${campo.toFixed(casasDecimais).replace(".", ",")}`
            );
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
                value={valorDoInput}
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
                    setValorDoInput(
                        `${FormatarParaFloat(evento.target.value, casasDecimais)
                            .toFixed(casasDecimais)
                            .replace(".", ",")}`
                    );
                    setter(
                        FormatarParaFloat(evento.target.value, casasDecimais)
                    );
                }}
                onBlur={(evento) => {
                    if (onBlur != undefined) {
                        onBlur(evento);
                    }
                }}
            />
        );
    }
}
