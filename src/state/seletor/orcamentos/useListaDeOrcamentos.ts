import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { selector, useRecoilValue } from "recoil";
import { listaDeOrcamentosState } from "state/atom";
import { IOrcamento } from "types/IOrcamento";
import { IPageable } from "types/IPageable";

export const atualizarListaDeOrcamentos = selector({
    key: "useListaDeOrcamentos",
    get: async () => {
        const resposta: IPageable<IOrcamento> = await (
            await instanciaAxios.get("orcamentos")
        ).data;
        return resposta;
    },
});

export const listarOrcamentos = async () => {
    const resposta: IPageable<IOrcamento> = await (
        await instanciaAxios.get<IPageable<IOrcamento>>("orcamentos")
    ).data;
    return resposta;
};

export const useListaDeOrcamentos = () => {
    return useRecoilValue(listaDeOrcamentosState);
};
