export default function ConverterDataAmericanaParaBrasil(data?: string) {
    if (data != undefined) {
        const diaCadastro = data.substring(8, 10);
        const mesCadastro = data.substring(5, 7);
        const anoCadastro = data.substring(0, 4);

        return diaCadastro + "/" + mesCadastro + "/" + anoCadastro;
    } else {
        return "00/00/0000";
    }
}
