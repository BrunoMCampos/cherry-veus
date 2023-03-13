import { IItemOrcamento } from "types/IItemOrcamento";
import instanciaAxios from "InstanciaAxios/instanciaAxios";

export const useCadastrarItemOrcamento = () => {
    return (codigoMaterial: number, codigoOrcamento: number) => {
        console.log(codigoOrcamento);
        return instanciaAxios
            .post<IItemOrcamento>(
                `orcamentos/${codigoOrcamento}/itens-orcamento`,
                {
                    codigoMaterial: codigoMaterial,
                }
            )
            .then((resposta) => {
                return resposta.data;
            })
            .catch((erro) => {
                alert("Erro ao cadastrar dados");
                console.log(erro);
            });
    };
};
