const VerificarNumerosInput = (
    evento: React.ChangeEvent<HTMLInputElement>,
    setter: (value: React.SetStateAction<number>) => void,
    campo: number
) => {
    if (evento.target.value == "") {
        if (campo.toString().length == 1) {
            setter(0);
        }
    } else if (isNaN(evento.target.valueAsNumber)) {
        evento.preventDefault();
    } else {
        const parsedText = parseFloat(evento.target.valueAsNumber.toFixed(2));
        if (parsedText > 100) {
            setter(100);
        } else {
            setter(parsedText);
        }
    }
};

export default VerificarNumerosInput;
