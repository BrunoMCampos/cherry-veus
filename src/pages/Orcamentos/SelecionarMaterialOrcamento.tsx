import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import TabelaConfirmacao from "components/Tabelas/TabelaConfirmacao";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { listaDeMateriaisState } from "state/atom";
import { useCadastrarItemOrcamento } from "state/hooks/itemOrcamento/useCadastrarItemOrcamento";
import {
    listarMateriais,
    useListaDeMateriais,
} from "state/seletor/materiais/useListaDeMateriais";

export default function SelecionarMaterialOrcamento() {
    const parametros = useParams();

    const navegar = useNavigate();

    const materiais = useListaDeMateriais();
    const setMateriais = useSetRecoilState(listaDeMateriaisState);

    const cadastraritemOrcamento = useCadastrarItemOrcamento();

    const aoSelecionarMaterial = (key: number) => {
        console.log(parametros.codigoOrcamento);
        if (parametros.codigoOrcamento) {
            cadastraritemOrcamento(key, parseInt(parametros.codigoOrcamento))
                .then((resposta) => {
                    if (resposta != null) {
                        navegar(
                            `../orcamentos/detalhar/${parametros.codigoOrcamento}/dados-material/${resposta.codigoItemOrcamento}`
                        );
                    }
                })
                .catch((erro) => console.log(erro));
        } else {
            console.log("Erro");
        }
    };

    useEffect(() => {
        if (parametros.codigoOrcamento) {
            listarMateriais(parseInt(parametros.codigoOrcamento)).then(
                (resposta) => {
                    setMateriais(resposta);
                }
            );
        }
    }, []);

    return (
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa
                    entidade="materiais"
                    setterRecoil={setMateriais}
                />
                <Link
                    to={`../orcamentos/detalhar/${parametros.codigoOrcamento}`}
                >
                    <BotaoPaginaAnterior disabled={false}>
                        Voltar
                    </BotaoPaginaAnterior>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaConfirmacao
                    funcaoAoConfirmar={aoSelecionarMaterial}
                    dados={materiais.content}
                    colunas={[
                        {
                            cabecalho: "Código",
                            elemento: (material) => material.codigoMaterial,
                        },
                        {
                            cabecalho: "Nome do Material",
                            elemento: (material) => material.nome,
                        },
                        {
                            cabecalho: "Preço Unitário",
                            elemento: (material) =>
                                material.precoUnitario.toLocaleString("pt-BR", {
                                    currency: "BRL",
                                    style: "currency",
                                }),
                        },
                    ]}
                    getPrimaryKeyFromLine={(linha) => linha.codigoMaterial}
                    tituloTabela={"Selecionar Material para Orçamento"}
                />
            </div>
        </>
    );
}
