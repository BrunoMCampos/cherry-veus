import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { selector, useRecoilValue } from "recoil";
import { listaDeMateriaisState } from "state/atom";
import { IMaterial } from "types/IMaterial";
import { IPageable } from "types/IPageable";

export const atualizarListaDeMateriais = selector({
    key: "atualizarListaDeMateriais",
    get: async () => {
        const resposta: IPageable<IMaterial> = await (
            await instanciaAxios.get<IPageable<IMaterial>>("materiais")
        ).data;
        return resposta;
    },
});

export const listarMateriais = async (codigoOrcamento?: number) => {
    if (codigoOrcamento) {
        const resposta: IPageable<IMaterial> = await (
            await instanciaAxios.get<IPageable<IMaterial>>(
                `materiais?codigoOrcamento=${codigoOrcamento}`
            )
        ).data;
        return resposta;
    } else {
        const resposta: IPageable<IMaterial> = await (
            await instanciaAxios.get<IPageable<IMaterial>>("materiais")
        ).data;
        return resposta;
    }
};

export const useListaDeMateriais = () => {
    return useRecoilValue(listaDeMateriaisState);
};
