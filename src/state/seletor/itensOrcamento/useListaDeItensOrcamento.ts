import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { selector } from "recoil";
import { IPageable } from "types/IPageable";

import { IItemOrcamento } from "types/IItemOrcamento";

export const atualizarListaDeItensOrcamento = selector({
    key: "atualizarListaDeItensOrcamento",
    get: async () => {
        const resposta: IPageable<IItemOrcamento> = {
            content: [],
            nextPage: "",
            previousPage: "",
            totalElements: 0,
            totalPages: 0,
        };
        return resposta;
    },
});

export const listarItensOrcamento = async (codigoOrcamento?: string) => {
    const resposta: IPageable<IItemOrcamento> = await (
        await instanciaAxios.get<IPageable<IItemOrcamento>>(
            `orcamentos/${codigoOrcamento}/itens-orcamento`
        )
    ).data;
    return resposta;
};
