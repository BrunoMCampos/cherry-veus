import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotoesPaginacao from "components/Botoes/BotoesPaginacao";
import TabelaConsulta from "components/Tabelas/TabelaConsulta";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listaDeOrcamentosState } from "state/atom";
import ConverterDataAmericanaParaBrasil from "types/ConverterDataAmericadaParaBrasil";
import { useEffect } from "react";
import { listarOrcamentos } from "state/seletor/orcamentos/useListaDeOrcamentos";

export default function ConsultarOrcamentos() {
    const orcamentos = useRecoilValue(listaDeOrcamentosState);
    const setOrcamentos = useSetRecoilState(listaDeOrcamentosState);

    useEffect(() => {
        listarOrcamentos().then((resposta) => setOrcamentos(resposta));
    }, []);

    return (
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa
                    entidade="orcamentos"
                    setterRecoil={setOrcamentos}
                />
                <Link to="selecionar-veu">
                    <BotaoAdicionar>Novo Orcamento</BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaConsulta
                    dados={orcamentos.content}
                    colunas={[
                        {
                            cabecalho: "Código",
                            elemento: (linha) => linha.codigoOrcamento,
                        },
                        {
                            cabecalho: "Véu",
                            elemento: (linha) =>
                                linha.nomeVeu ? linha.nomeVeu : "",
                        },
                        {
                            cabecalho: "Percentual de Lucro",
                            elemento: (linha) =>
                                `${linha.percentualLucro?.toLocaleString(
                                    "pt-BR",
                                    { minimumFractionDigits: 2 }
                                )} %`,
                        },
                        {
                            cabecalho: "Custo Total",
                            elemento: (linha) =>
                                `${linha.custoTotal?.toLocaleString("pt-BR", {
                                    currency: "BRL",
                                    style: "currency",
                                })}`,
                        },
                        {
                            cabecalho: "Preço de Venda",
                            elemento: (linha) =>
                                `${linha.precoVenda?.toLocaleString("pt-BR", {
                                    currency: "BRL",
                                    style: "currency",
                                })}`,
                        },
                        {
                            cabecalho: "Data de Criação",
                            elemento: (linha) =>
                                ConverterDataAmericanaParaBrasil(
                                    linha.dataDeCriacao
                                ),
                        },
                    ]}
                    getPrimaryKeyFromLine={(linha) => linha.codigoOrcamento}
                    tituloTabela="Orcamentos"
                />
                <BotoesPaginacao
                    listaRecoil={orcamentos}
                    setterRecoil={setOrcamentos}
                />
            </div>
        </>
    );
}
