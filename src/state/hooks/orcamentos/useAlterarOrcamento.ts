import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IOrcamento } from "./../../../types/IOrcamento";

export const useAlterarOrcamento = () => {
    return (orcamento: IOrcamento) => {
        return instanciaAxios
            .put<IOrcamento>(
                `orcamentos/${orcamento.codigoOrcamento}`,
                orcamento
            )
            .then(() => {
                alert("Dados alterados com sucesso");
            })
            .catch((erro) => {
                console.log("Erro ao alterar os dados");
                console.log(erro);
            });
    };
};
