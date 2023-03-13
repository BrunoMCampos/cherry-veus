import { listaDeVeusState } from "state/atom";
import { IVeu } from "types/IVeu";
import { IPageable } from "types/IPageable";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { selector, useRecoilValue } from "recoil";

export const atualizarListaDeVeus = selector({
    key: "useListaDeVeus",
    get: async () => {
        const resposta: IPageable<IVeu> = await (
            await instanciaAxios.get<IPageable<IVeu>>("veus")
        ).data;
        return resposta;
    },
});

export const listarVeus = async () => {
    const resposta: IPageable<IVeu> = await (
        await instanciaAxios.get<IPageable<IVeu>>("veus")
    ).data;
    return resposta;
};

export const useListaDeVeus = () => {
    return useRecoilValue(listaDeVeusState);
};
