import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IMaterial } from "./../../../types/IMaterial";

export const useAlterarMaterial = () => {
    return (material: IMaterial) => {
        return instanciaAxios
            .put(`materiais/${material.codigoMaterial}`, material)
            .then(() => {
                alert("Dados alterados com sucesso");
            })
            .catch((erro) => {
                console.log("Erro ao alterar os dados");
                console.log(erro);
            });
    };
};
