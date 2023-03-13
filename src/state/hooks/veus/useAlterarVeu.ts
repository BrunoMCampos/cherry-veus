import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IVeu } from "types/IVeu";

export const useAlterarVeu = () => {
    return (veu: IVeu) => {
        return instanciaAxios
            .put(`veus/${veu.codigoVeu}`, veu)
            .then(() => {
                alert("Dados alterados com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao alterar dados");
                console.log(erro);
            });
    };
};
