import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IItemOrcamento } from "./../../../types/IItemOrcamento";

export const useAlterarItemOrcamento = () => {
    return (itemOrcamento: IItemOrcamento) => {
        return instanciaAxios
            .put(
                `orcamentos/${itemOrcamento.codigoOrcamento}/itens-orcamento/${itemOrcamento.codigoItemOrcamento}`,
                itemOrcamento
            )
            .then(() => {
                alert("Dados salvos com sucesso");
            })
            .catch((erro) => {
                console.log("Erro ao salvar dados");
                console.log(erro);
            });
    };
};
