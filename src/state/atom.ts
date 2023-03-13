import { atualizarListaDeItensOrcamento } from "state/seletor/itensOrcamento/useListaDeItensOrcamento";
import { atom } from "recoil";
import { atualizarListaDeMateriais } from "state/seletor/materiais/useListaDeMateriais";
import { atualizarListaDeOrcamentos } from "state/seletor/orcamentos/useListaDeOrcamentos";
import { atualizarListaDeVeus } from "state/seletor/veus/useListaDeVeus";
import { IMaterial } from "types/IMaterial";
import { IOrcamento } from "types/IOrcamento";
import { IVeu } from "types/IVeu";
import { IItemOrcamento } from "./../types/IItemOrcamento";
import { IPageable } from "./../types/IPageable";

export const listaDeVeusState = atom<IPageable<IVeu>>({
    key: "listaDeVeusState",
    default: atualizarListaDeVeus,
});

export const listaDeMateriaisState = atom<IPageable<IMaterial>>({
    key: "listaDeMateriaisState",
    default: atualizarListaDeMateriais,
});

export const listaDeOrcamentosState = atom<IPageable<IOrcamento>>({
    key: "listaDeOrcamentosState",
    default: atualizarListaDeOrcamentos,
});

export const listaDeItensOrcamentoState = atom<IPageable<IItemOrcamento>>({
    key: "listaDeItensOrcamentoState",
    default: atualizarListaDeItensOrcamento
});
