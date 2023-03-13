import instanciaAxios from "InstanciaAxios/instanciaAxios";

export const useCadastrarVeus = () => {
    return (nomeVeu: string) => {
        return instanciaAxios
            .post("veus", {
                nome: nomeVeu,
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
