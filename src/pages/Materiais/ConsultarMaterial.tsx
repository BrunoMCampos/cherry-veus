import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import TabelaConsulta from "components/Tabelas/TabelaConsulta";
import BotoesPaginacao from "components/Botoes/BotoesPaginacao";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { listaDeMateriaisState } from "state/atom";
import ConverterDataAmericanaParaBrasil from "types/ConverterDataAmericadaParaBrasil";
import { IMaterial } from "types/IMaterial";
import { IPageable } from "types/IPageable";
import {
    listarMateriais,
    useListaDeMateriais,
} from "state/seletor/materiais/useListaDeMateriais";
import { useEffect } from "react";

export default function ConsultarMaterial() {
    const materiais: IPageable<IMaterial> = useListaDeMateriais();
    const setMateriais = useSetRecoilState<IPageable<IMaterial>>(
        listaDeMateriaisState
    );

    useEffect(() => {
        listarMateriais().then((resposta) => {
            setMateriais(resposta);
        });
    }, []);

    return (
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa
                    entidade="materiais"
                    setterRecoil={setMateriais}
                />
                <Link to="../materiais/novo">
                    <BotaoAdicionar>Cadastrar Material</BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaConsulta
                    dados={materiais.content}
                    colunas={[
                        {
                            cabecalho: "Código",
                            elemento: (linha) => linha.codigoMaterial,
                        },
                        {
                            cabecalho: "Nome",
                            elemento: (linha) => linha.nome,
                        },
                        {
                            cabecalho: "Preço Unitário",
                            elemento: (linha) =>
                                linha.precoUnitario.toLocaleString("pt-BR", {
                                    currency: "BRL",
                                    style: "currency",
                                }),
                        },
                        {
                            cabecalho: "Data do Cadastro",
                            elemento: (linha) =>
                                ConverterDataAmericanaParaBrasil(
                                    linha.dataCadastro
                                ),
                        },
                    ]}
                    getPrimaryKeyFromLine={(linha) => linha.codigoMaterial}
                    tituloTabela="Materiais"
                />
                <BotoesPaginacao
                    listaRecoil={materiais}
                    setterRecoil={setMateriais}
                />
            </div>
        </>
    );
}
