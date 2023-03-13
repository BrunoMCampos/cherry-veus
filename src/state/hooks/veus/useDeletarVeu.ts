import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IVeu } from "types/IVeu";

export const useDeletarVeu = () => {
    return (veu: IVeu) => {
        return instanciaAxios
            .delete(`veus/${veu.codigoVeu}`)
            .then(() => {
                alert("Dados excluidos com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao excluir dados");
                console.log(erro);
            });
    };
};
