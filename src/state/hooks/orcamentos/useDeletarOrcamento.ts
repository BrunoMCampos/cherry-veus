import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IOrcamento } from "types/IOrcamento";

export const useDeletarOrcamento = () => {
    return (orcamento: IOrcamento) => {
        return instanciaAxios
            .delete(`orcamentos/${orcamento.codigoOrcamento}`)
            .then(() => {
                alert("Dados excluidos com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao excluir dados");
                console.log(erro);
            });
    };
};
