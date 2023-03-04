import style from "./Input.module.scss";

export default function Input({
    placeHolder,
    disabled = false,
    id,
    value,
    onChange,
    type="text",
    onBlur,
    min,
    step
}: {
    placeHolder?: string;
    disabled?: boolean;
    id?: string;
    value?:string,
    onChange?:React.ChangeEventHandler<HTMLInputElement>,
    type?:React.HTMLInputTypeAttribute,
    onBlur?:React.FocusEventHandler<HTMLInputElement>,
    min?:string | number | undefined,
    step?: string | number
}) {
    if (disabled) {
        return (
            <input
                type={type}
                placeholder={placeHolder}
                className={style.CaixaDeTexto}
                id={id}
                value={value}
                disabled
                min={min}
                step={step}
            />
        );
    } else {
        return (
            <input
                type={type}
                placeholder={placeHolder}
                className={style.CaixaDeTexto}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                min={min}
                step={step}
            />
        );
    }
}
