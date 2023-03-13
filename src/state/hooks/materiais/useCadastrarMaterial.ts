import instanciaAxios from "InstanciaAxios/instanciaAxios";

export const useCadastrarMaterial = () => {
    return (nomeMaterial: string, precoUnitario: number) => {
        return instanciaAxios
            .post("materiais", {
                nome: nomeMaterial,
                precoUnitario: precoUnitario,
            })
            .then(() => {
                alert("Dados cadastrados com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao cadastrar dados");
                console.log(erro);
            });
    };
};
