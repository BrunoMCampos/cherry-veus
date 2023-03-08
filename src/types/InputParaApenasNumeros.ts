export default function InputParaApenasNumeros(
    evento: React.ChangeEvent<HTMLInputElement>,
    setter: (value: React.SetStateAction<string>) => void,
    limite?:number,
    casasDecimais=2
) {
    let valor = evento.target.value.replace(/[^0-9]/g,"");
    if (valor.replaceAll("0","") == "") {
        const valorZero = 0;
        setter(valorZero.toFixed(casasDecimais).replace(".",","));
    } else {
        valor = valor.substring(0,valor.length-casasDecimais) + "." + valor.substring(valor.length-casasDecimais,valor.length);
        const parsedText = parseFloat(valor);
        if(limite != undefined){
            if(limite > parsedText){
                setter(parsedText.toFixed(casasDecimais).replace(".",","));
            } else {
                setter(limite.toFixed(casasDecimais).replace(".",","));
            }
        } else {
            setter(parsedText.toFixed(casasDecimais).replace(".",","));
        }
    }
}
