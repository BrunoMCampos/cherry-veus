export default function FormatarParaFloat(
    valor:string,
    casasDecimais=2
) {
    valor = valor.replace(/[^0-9]/g,"");
    if (valor.replaceAll("0","") == "") {
        return(0);
    } else {
        valor = valor.substring(0,valor.length-casasDecimais) + "." + valor.substring(valor.length-casasDecimais,valor.length);
        const parsedText = parseFloat(valor);
        return(parsedText);
    }
}
