import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IMaterial } from "./../../../types/IMaterial";

export const useDeletarMaterial = () => {
    return (material: IMaterial) => {
        return instanciaAxios
            .delete(`materiais/${material.codigoMaterial}`)
            .then(() => {
                alert("Dados excluidos com sucesso");
            })
            .catch((erro) => {
                alert("Erro ao excluir dados");
                console.log(erro);
            });
    };
};
