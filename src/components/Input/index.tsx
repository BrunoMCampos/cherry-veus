import style from "./Input.module.scss";

export default function Input({
    placeHolder,
    disabled = false,
    id,
    value,
    onChange,
    type="text",
    onBlur,
    onFocus,
    min,
    max,
    step
}: {
    placeHolder?: string;
    disabled?: boolean;
    id?: string;
    value?:string,
    onChange?:React.ChangeEventHandler<HTMLInputElement>,
    type?:React.HTMLInputTypeAttribute,
    onBlur?:React.FocusEventHandler<HTMLInputElement>,
    onFocus?:React.FocusEventHandler<HTMLInputElement>
    min?:string | number,
    max?:string | number,
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
                max = {max}
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
                max = {max}
                step={step}
                onFocus={onFocus}
            />
        );
    }
}
