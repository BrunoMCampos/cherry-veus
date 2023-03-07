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
import InputParaApenasNumeros from "types/InputParaApenasNumeros";

export default function CadastrarOrcamento() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigoVeu, setCodigoVeu] = useState(0);
    const [codigoOrcamento, setCodigoOrcamento] = useState(0);
    const [itensOrcamento, setItensOrcamento] =
        useState<DadosCompletosItemOrcamento[]>();

    const [percentualLucro, setPercentualLucro] = useState("");
    const [custoTotal, setCustoTotal] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [custoMaoDeObra, setCustoMaoDeObra] = useState("");
    const [percentualImposto, setPercentualImposto] = useState("");
    const [outrasDespesas, setOutrasDespesas] = useState("");

    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    useEffect(() => {
        instanciaAxios
            .get<DadosListagemGeralOrcamento>(`orcamentos/${parametros.codigo}`)
            .then((resposta) => {
                setNomeVeu(resposta.data.nomeVeu);
                setCodigoOrcamento(resposta.data.codigoOrcamento);
                setPercentualLucro(
                    resposta.data.percentualLucro.toFixed(2).replace(".", ",") + " %"
                );
                setPrecoVenda(resposta.data.precoVenda);
                setCustoTotal(resposta.data.custoTotal);
                setCodigoVeu(resposta.data.codigoVeu);
                setPercentualImposto(
                    resposta.data.percentualImposto.toFixed(2).replace(".", ",") + " %"
                );
                setOutrasDespesas(
                    "R$ " + resposta.data.custoDespesas.toFixed(2).replace(".", ",")
                );
                setCustoMaoDeObra(
                    "R$ " + resposta.data.custoMaoDeObra.toFixed(2).replace(".", ",")
                );
            });
        navegar(`orcamentos/${parametros.codigo}/itens-orcamento`);
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios
            .put(`orcamentos/${parametros.codigo}`, {
                codigoVeu: codigoVeu,
                percentualLucro: percentualLucro.replace(",", ".").replace(" %",""),
                custoMaoDeObra: custoMaoDeObra.replace(",", ".").replace("R$ ",""),
                custoDespesas: outrasDespesas.replace(",", ".").replace("R$ ",""),
                custoImpostoPercentual: percentualImposto.replace(",", ".").replace(" %",""),
            })
            .then(() => {
                navigate(`../orcamentos/editar/${parametros.codigo}`);
                window.scrollTo(0, 0);
            });
    };

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

    return (
        <form className={style.FormCadastro} onSubmit={aoSubmeterForm}>
            <div className={style.FormCadastro__Dados}>
                <div className={style.FormCadastro__Dados__Item}>
                    <label htmlFor="veu">Véu:</label>
                    <Input disabled id="veu" value={nomeVeu} />
                    <Link
                        to={`/orcamentos/novo/${codigoOrcamento}/selecionar-veu`}
                    >
                        <BotaoPesquisar>Alterar Véu</BotaoPesquisar>
                    </Link>
                    <Link
                        to={`/orcamentos/novo/${codigoOrcamento}/selecionar-material`}
                    >
                        <BotaoAdicionar>Adicionar Material</BotaoAdicionar>
                    </Link>
                </div>
                <div className={style.FormCadastro__ValoresOrcamento}>
                    <div
                        className={style.FormCadastro__ValoresOrcamento__Coluna}
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
                                <label htmlFor="custoTotal">Custo Total</label>
                                <Input
                                    disabled
                                    id="custoTotal"
                                    value={`R$ ${custoTotal
                                        .toFixed(2)
                                        .replace(".", ",")}`}
                                ></Input>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Item
                                }
                            >
                                <label htmlFor="percentualDeLucro">
                                    Percentual de Lucro(%)
                                </label>
                                <Input
                                    type="text"
                                    id="percentualDeLucro"
                                    value={`${percentualLucro}`}
                                    onChange={(evento) => {
                                        InputParaApenasNumeros(
                                            evento,
                                            setPercentualLucro,
                                            100
                                        );
                                    }}
                                    onBlur={() => {
                                        setPercentualLucro(
                                            `${percentualLucro} %`
                                        );
                                    }}
                                    onFocus={() => {
                                        setPercentualLucro(
                                            `${percentualLucro.replace(" %","")}`
                                        );
                                    }}
                                ></Input>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Item
                                }
                            >
                                <label htmlFor="custoDespesas">
                                    Outras Despesas (R$)
                                </label>
                                <Input
                                    type="text"
                                    id="custoDespesas"
                                    value={`${outrasDespesas}`}
                                    onChange={(evento) => {
                                        InputParaApenasNumeros(
                                            evento,
                                            setOutrasDespesas
                                        );
                                    }}
                                    onBlur={() => {
                                        setOutrasDespesas(
                                            `R$ ${outrasDespesas}`
                                        );
                                    }}
                                    onFocus={() => {
                                        setOutrasDespesas(
                                            `${outrasDespesas.replace("R$ ","")}`
                                        );
                                    }}
                                ></Input>
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
                                <Input
                                    disabled
                                    id="precoDeVenda"
                                    value={`R$ ${precoVenda
                                        .toFixed(2)
                                        .replace(".", ",")}`}
                                ></Input>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Item
                                }
                            >
                                <label htmlFor="impostoPercentual">
                                    Percentual de Imposto Sobre Venda (%)
                                </label>
                                <Input
                                    type="text"
                                    id="impostoPercentual"
                                    value={`${percentualImposto}`}
                                    onChange={(evento) => {
                                        InputParaApenasNumeros(
                                            evento,
                                            setPercentualImposto,
                                            100
                                        );
                                    }}
                                    onBlur={() => {
                                        setPercentualImposto(
                                            `${percentualImposto} %`
                                        );
                                    }}
                                    onFocus={() => {
                                        setPercentualImposto(
                                            `${percentualImposto.replace(" %","")}`
                                        );
                                    }}
                                ></Input>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Item
                                }
                            >
                                <label htmlFor="custoMaoDeObra">
                                    Custo de Mão de Obra (R$)
                                </label>
                                <Input
                                    type="text"
                                    id="custoMaoDeObra"
                                    value={`${custoMaoDeObra}`}
                                    onChange={(evento) => {
                                        InputParaApenasNumeros(
                                            evento,
                                            setCustoMaoDeObra
                                        );
                                    }}
                                    onBlur={() => {
                                        setCustoMaoDeObra(
                                            `R$ ${custoMaoDeObra}`
                                        );
                                    }}
                                    onFocus={() => {
                                        setCustoMaoDeObra(
                                            `${custoMaoDeObra.replace("R$ ","")}`
                                        );
                                    }}
                                ></Input>
                            </div>
                        </div>
                    </div>
                    <div className={style.FormCadastro__SalvarECancelar}>
                        <BotaoSalvar />
                        <Link to={"../orcamentos"}>
                            <BotaoCancelar />
                        </Link>
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
