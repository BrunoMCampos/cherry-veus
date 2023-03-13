import BarraDeSelecaoDeVeuParaOrcamento from "components/BarraDeSelecaoDeVeuParaOrcamento";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoExcluir from "components/Botoes/BotaoExcluir";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import BotoesPaginacao from "components/Botoes/BotoesPaginacao";
import CardMaterialOrcamento from "components/CardMaterialOrcamento";
import InputDinheiro from "components/InputDinheiro";
import InputPercentual from "components/InputPercentual";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Orcamentos/Orcamentos.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listaDeItensOrcamentoState } from "state/atom";
import { useAlterarOrcamento } from "state/hooks/orcamentos/useAlterarOrcamento";
import { useDeletarOrcamento } from "state/hooks/orcamentos/useDeletarOrcamento";
import ConverterDataAmericanaParaBrasil from "types/ConverterDataAmericadaParaBrasil";
import { IItemOrcamento } from "types/IItemOrcamento";
import { IOrcamento } from "types/IOrcamento";
import { IPageable } from "types/IPageable";

export default function DetalharOrcamento() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigoVeu, setCodigoVeu] = useState(0);

    const [percentualLucro, setPercentualLucro] = useState(0);
    const [custoTotal, setCustoTotal] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [custoMaoDeObra, setCustoMaoDeObra] = useState(0);
    const [percentualImposto, setPercentualImposto] = useState(0);
    const [outrasDespesas, setOutrasDespesas] = useState(0);

    const [orcamento, setOrcamento] = useState<IOrcamento>();

    const itensOrcamento = useRecoilValue(listaDeItensOrcamentoState);
    const setItensOrcamento = useSetRecoilState(listaDeItensOrcamentoState);

    const deletarOrcamento = useDeletarOrcamento();
    const alterarOrcamento = useAlterarOrcamento();

    useEffect(() => {
        instanciaAxios
            .get<IOrcamento>(`orcamentos/${parametros.codigoOrcamento}`)
            .then((resposta) => {
                setNomeVeu(resposta.data.nomeVeu ? resposta.data.nomeVeu : "");
                setPercentualLucro(
                    resposta.data.percentualLucro
                        ? resposta.data.percentualLucro
                        : 0
                );
                setPrecoVenda(
                    resposta.data.precoVenda ? resposta.data.precoVenda : 0
                );
                setCustoTotal(
                    resposta.data.custoTotal ? resposta.data.custoTotal : 0
                );
                setCodigoVeu(resposta.data.codigoVeu);
                setPercentualImposto(
                    resposta.data.percentualImposto
                        ? resposta.data.percentualImposto
                        : 0
                );
                setOutrasDespesas(
                    resposta.data.custoDespesas
                        ? resposta.data.custoDespesas
                        : 0
                );
                setCustoMaoDeObra(
                    resposta.data.custoMaoDeObra
                        ? resposta.data.custoMaoDeObra
                        : 0
                );
                setOrcamento(resposta.data);

                instanciaAxios
                    .get<IPageable<IItemOrcamento>>(
                        `orcamentos/${parametros.codigoOrcamento}/itens-orcamento`
                    )
                    .then((resposta) => {
                        setItensOrcamento(resposta.data);
                    });
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        alterarOrcamento({
            codigoOrcamento: orcamento?.codigoOrcamento
                ? orcamento.codigoOrcamento
                : 0,
            codigoVeu: codigoVeu,
            percentualLucro: percentualLucro,
            custoDespesas: outrasDespesas,
            custoMaoDeObra: custoMaoDeObra,
            percentualImposto: percentualImposto,
        }).then(() => {
            window.scrollTo(0, 0);
            navigate(`../orcamentos/detalhar/${parametros.codigoOrcamento}`);
        });
    };

    const excluirOrcamento = () => {
        if (
            confirm(
                `Deseja realmente excluir o orçamento: ${orcamento?.codigoOrcamento}?`
            )
        ) {
            if (orcamento) {
                deletarOrcamento(orcamento).then(() =>
                    navigate("../orcamentos")
                );
            } else {
                alert("Erro ao excluir orçamento!");
                console.log("Orçamento inexistente: " + orcamento);
            }
        }
    };

    const voltar = () => {
        navigate("../orcamentos");
    };

    return (
        <>
            <div className={style.SubTituloDetalhar}>
                <h2 className={style.SubTituloDetalhar__Texto}>
                    Código do Orçamento: {orcamento?.codigoOrcamento} - Data:{" "}
                    {ConverterDataAmericanaParaBrasil(orcamento?.dataDeCriacao)}
                </h2>
                <BotaoPaginaAnterior disabled={false} onClick={voltar}>
                    Voltar
                </BotaoPaginaAnterior>
            </div>
            <form className={style.FormCadastro} onSubmit={aoSubmeterForm}>
                <div className={style.FormCadastro__Dados}>
                    <BarraDeSelecaoDeVeuParaOrcamento nomeVeu={nomeVeu} />
                    <div className={style.FormCadastro__ValoresOrcamento}>
                        <div
                            className={
                                style.FormCadastro__ValoresOrcamento__Coluna
                            }
                        >
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Linha
                                }
                            >
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="custoTotal">
                                        Custo Total
                                    </label>
                                    <InputDinheiro
                                        disabled
                                        id="custoTotal"
                                        campo={custoTotal}
                                        setter={setCustoTotal}
                                        valorPadrao={
                                            orcamento ? orcamento.custoTotal : 0
                                        }
                                    ></InputDinheiro>
                                </div>
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="percentualDeLucro">
                                        Lucro (%)
                                    </label>
                                    <InputPercentual
                                        id="percentualDeLucro"
                                        campo={percentualLucro}
                                        setter={setPercentualLucro}
                                        valorPadrao={
                                            orcamento
                                                ? orcamento.percentualLucro
                                                : 0
                                        }
                                    ></InputPercentual>
                                </div>
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="custoDespesas">
                                        Outras Despesas (R$)
                                    </label>
                                    <InputDinheiro
                                        id="custoDespesas"
                                        campo={outrasDespesas}
                                        setter={setOutrasDespesas}
                                        valorPadrao={
                                            orcamento
                                                ? orcamento.custoDespesas
                                                : 0
                                        }
                                    ></InputDinheiro>
                                </div>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Linha
                                }
                            >
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="precoDeVenda">
                                        Preço de Venda
                                    </label>
                                    <InputDinheiro
                                        disabled
                                        id="precoDeVenda"
                                        campo={precoVenda}
                                        setter={setPrecoVenda}
                                        valorPadrao={
                                            orcamento ? orcamento.precoVenda : 0
                                        }
                                    ></InputDinheiro>
                                </div>
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="impostoPercentual">
                                        Percentual de Imposto Sobre Venda (%)
                                    </label>
                                    <InputPercentual
                                        id="impostoPercentual"
                                        campo={percentualImposto}
                                        setter={setPercentualImposto}
                                        valorPadrao={
                                            orcamento
                                                ? orcamento.percentualImposto
                                                : 0
                                        }
                                    ></InputPercentual>
                                </div>
                                <div
                                    className={
                                        style.FormCadastro__ValoresOrcamento__Item
                                    }
                                >
                                    <label htmlFor="custoMaoDeObra">
                                        Custo de Mão de Obra (R$)
                                    </label>
                                    <InputDinheiro
                                        id="custoMaoDeObra"
                                        campo={custoMaoDeObra}
                                        setter={setCustoMaoDeObra}
                                        valorPadrao={
                                            orcamento
                                                ? orcamento.custoMaoDeObra
                                                : 0
                                        }
                                    ></InputDinheiro>
                                </div>
                            </div>
                        </div>
                        <div className={style.FormCadastro__SalvarECancelar}>
                            <BotaoSalvar />
                            <Link to={"../orcamentos"}>
                                <BotaoCancelar />
                            </Link>
                            <div onClick={excluirOrcamento}>
                                <BotaoExcluir />
                            </div>
                        </div>
                    </div>
                    <div className={style.FormCadastro__Dados__Cards}>
                        {itensOrcamento.content.map((item) => (
                            <CardMaterialOrcamento
                                dadosItemOrcamento={item}
                                key={item.codigoItemOrcamento}
                            />
                        ))}
                    </div>
                    <div className={style.FrameDeBotoes}>
                        <BotoesPaginacao
                            listaRecoil={itensOrcamento}
                            setterRecoil={setItensOrcamento}
                        />
                    </div>
                </div>
            </form>
        </>
    );
}
