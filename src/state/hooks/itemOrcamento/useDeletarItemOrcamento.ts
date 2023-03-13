import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IItemOrcamento } from "types/IItemOrcamento";

export const useDeletarItemOrcamento = () => {
    return (itemOrcamento: IItemOrcamento) => {
        return instanciaAxios
            .delete(
                `orcamentos/${itemOrcamento.codigoOrcamento}/itens-orcamento/${itemOrcamento.codigoItemOrcamento}`
            )
            .then(() => {
                alert("Dados excluidos com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao excluir dados");
                console.log(erro);
            });
    };
};
