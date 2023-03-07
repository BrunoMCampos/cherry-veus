import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import CardMaterialOrcamento from "components/CardMaterialOrcamento";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosItemOrcamento } from "types/DadosCompletosItemOrcamento";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";
import { IPageable } from "types/IPageable";

import style from "pages/Orcamentos/Orcamentos.module.scss";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import VerificarNumerosInput from "types/VerificarNumerosInput";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import BotaoConfirmar from "components/Botoes/BotaoConfirmar";

export default function ExcluirOrcamento() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [itensOrcamento, setItensOrcamento] =
        useState<DadosCompletosItemOrcamento[]>();

    const [percentualLucro, setPercentualLucro] = useState(0);
    const [custoTotal, setCustoTotal] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);

    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    useEffect(() => {
        instanciaAxios
            .get<DadosListagemGeralOrcamento>(`orcamentos/${parametros.codigo}`)
            .then((resposta) => {
                setNomeVeu(resposta.data.nomeVeu);
                setPercentualLucro(resposta.data.percentualLucro);
                setPrecoVenda(resposta.data.precoVenda);
                setCustoTotal(resposta.data.custoTotal);
            });
        navegar(`orcamentos/${parametros.codigo}/itens-orcamento`);
    }, [parametros]);

    const proximaPg = () => {
        navegar(proximaPagina);
    };

    const pgAnterior = () => {
        navegar(paginaAnterior);
    };

    const navegar = (destino: string) => {
        instanciaAxios
            .get<IPageable<DadosCompletosItemOrcamento>>(destino)
            .then((resposta) => {
                setItensOrcamento(resposta.data.content);
                if (resposta.data.last == false) {
                    setProximaPagina(
                        `orcamentos/${parametros.codigo}/itens-orcamento?page=${
                            resposta.data.number + 1
                        }`
                    );
                } else {
                    setProximaPagina("");
                }
                if (resposta.data.first == false) {
                    setPaginaAnterior(
                        `orcamentos/${parametros.codigo}/itens-orcamento?page=${
                            resposta.data.number - 1
                        }`
                    );
                } else {
                    setPaginaAnterior("");
                }
            });
    };

    const excluirOrcamento = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (confirm("Deseja realmente excluir este orçamento?")) {
            instanciaAxios
                .delete(`orcamentos/${parametros.codigo}`)
                .then(() => {
                    navigate("../orcamentos");
                });
        }
    };

    return (
        <form
            className={style.FormCadastro}
            onSubmit={(evento) => excluirOrcamento(evento)}
        >
            <div className={style.FormCadastro__Dados}>
                <div className={style.FormCadastro__Dados__Item}>
                    <label htmlFor="veu">Véu:</label>
                    <Input disabled id="veu" value={nomeVeu} />
                </div>
                <div className={style.FormCadastro__ValoresOrcamento}>
                    <div className={style.FormCadastro__ValoresOrcamento__Item}>
                        <label htmlFor="custoTotal">Custo Total</label>
                        <Input
                            disabled
                            id="custoTotal"
                            value={`R$ ${custoTotal
                                .toFixed(2)
                                .replace(".", ",")}`}
                        ></Input>
                    </div>
                    <div className={style.FormCadastro__ValoresOrcamento__Item}>
                        <label htmlFor="percentualDeLucro">
                            Percentual de Lucro
                        </label>
                        <Input
                            disabled
                            id="percentualDeLucro"
                            value={`${percentualLucro
                                .toFixed(2)
                                .replace(".", ",")} %`}
                        ></Input>
                    </div>
                    <div className={style.FormCadastro__ValoresOrcamento__Item}>
                        <label htmlFor="precoDeVenda">Preço de Venda</label>
                        <Input
                            disabled
                            id="precoDeVenda"
                            value={`R$ ${precoVenda
                                .toFixed(2)
                                .replace(".", ",")}`}
                        ></Input>
                    </div>
                    <div className={style.FormCadastro__Excluir}>
                        <BotaoConfirmar>Excluir</BotaoConfirmar>
                    </div>
                </div>
                <div className={style.FormCadastro__Dados__Cards}>
                    {itensOrcamento?.map((item) => (
                        <CardMaterialOrcamento
                            dadosItemOrcamento={item}
                            key={item.codigoItemOrcamento}
                        />
                    ))}
                </div>
                <div className={style.FrameDeBotoes}>
                    {(paginaAnterior != "" && (
                        <div onClick={pgAnterior}>
                            <BotaoPaginaAnterior disabled={false} />
                        </div>
                    )) || (
                        <div>
                            <BotaoPaginaAnterior disabled={true} />
                        </div>
                    )}
                    {(proximaPagina != "" && (
                        <div onClick={proximaPg}>
                            <BotaoProximaPagina disabled={false} />
                        </div>
                    )) || (
                        <div>
                            <BotaoProximaPagina disabled={true} />
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
