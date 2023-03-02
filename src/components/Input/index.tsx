import style from "./Input.module.scss";

export default function Input({
    placeHolder,
    disabled = false,
    id,
    value,
    onChange,
    type="text"
}: {
    placeHolder?: string;
    disabled?: boolean;
    id: string;
    value?:string,
    onChange?:React.ChangeEventHandler<HTMLInputElement>,
    type?:React.HTMLInputTypeAttribute,
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
            />
        );
    }
}
