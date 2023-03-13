import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import TabelaConsulta from "components/Tabelas/TabelaConsulta";
import BotoesPaginacao from "components/Botoes/BotoesPaginacao";
import { Link } from "react-router-dom";
import ConverterDataAmericanaParaBrasil from "types/ConverterDataAmericadaParaBrasil";
import { IPageable } from "types/IPageable";
import { IVeu } from "types/IVeu";
import { useSetRecoilState } from "recoil";
import { listaDeVeusState } from "state/atom";
import { listarVeus, useListaDeVeus } from "state/seletor/veus/useListaDeVeus";
import { useEffect } from "react";

export default function ConsultarVeus() {
    const veus: IPageable<IVeu> = useListaDeVeus();
    const setVeus = useSetRecoilState<IPageable<IVeu>>(listaDeVeusState);

    useEffect(() => {
        listarVeus().then((resposta) => setVeus(resposta));
    }, []);

    return (
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa entidade="veus" setterRecoil={setVeus} />
                <Link to="../veus/novo">
                    <BotaoAdicionar>Cadastrar Véu</BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <>
                    <TabelaConsulta
                        tituloTabela="Veus"
                        dados={veus.content}
                        colunas={[
                            {
                                cabecalho: "Código",
                                elemento: (linha) => linha.codigoVeu,
                            },
                            {
                                cabecalho: "Nome",
                                elemento: (linha) => linha.nome,
                            },
                            {
                                cabecalho: "Data do Cadastro",
                                elemento: (linha) =>
                                    ConverterDataAmericanaParaBrasil(
                                        linha.dataCadastro
                                    ),
                            },
                            {
                                cabecalho: "Total Já Vendido",
                                elemento: (linha) => linha.totalVendido,
                            },
                        ]}
                        getPrimaryKeyFromLine={(linha) => linha.codigoVeu}
                    />
                    <BotoesPaginacao
                        listaRecoil={veus}
                        setterRecoil={setVeus}
                    ></BotoesPaginacao>
                </>
            </div>
        </>
    );
}
