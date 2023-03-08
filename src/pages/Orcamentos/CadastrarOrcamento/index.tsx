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
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import InputDinheiro from "components/InputDinheiro";
import InputPercentual from "components/InputPercentual";

export default function CadastrarOrcamento() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigoVeu, setCodigoVeu] = useState(0);
    const [codigoOrcamento, setCodigoOrcamento] = useState(0);
    const [itensOrcamento, setItensOrcamento] =
        useState<DadosCompletosItemOrcamento[]>();

    const [percentualLucro, setPercentualLucro] = useState(0);
    const [custoTotal, setCustoTotal] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [custoMaoDeObra, setCustoMaoDeObra] = useState(0);
    const [percentualImposto, setPercentualImposto] = useState(0);
    const [outrasDespesas, setOutrasDespesas] = useState(0);

    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    const [respostaAxios, setRespostaAxios] =
        useState<DadosListagemGeralOrcamento>({
            codigoOrcamento: 0,
            codigoVeu: 0,
            custoDespesas: 0,
            custoMaoDeObra: 0,
            custoTotal: 0,
            dataDeCriacao: "",
            nomeVeu: "",
            percentualImposto: 0,
            percentualLucro: 0,
            precoVenda: 0,
        });

    useEffect(() => {
        instanciaAxios
            .get<DadosListagemGeralOrcamento>(`orcamentos/${parametros.codigo}`)
            .then((resposta) => {
                setNomeVeu(resposta.data.nomeVeu);
                setCodigoOrcamento(resposta.data.codigoOrcamento);
                setPercentualLucro(resposta.data.percentualLucro);
                setPrecoVenda(resposta.data.precoVenda);
                setCustoTotal(resposta.data.custoTotal);
                setCodigoVeu(resposta.data.codigoVeu);
                setPercentualImposto(resposta.data.percentualImposto);
                setOutrasDespesas(resposta.data.custoDespesas);
                setCustoMaoDeObra(resposta.data.custoMaoDeObra);
                setRespostaAxios(resposta.data);
            });
        navegar(`orcamentos/${parametros.codigo}/itens-orcamento`);
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios
            .put(`orcamentos/${parametros.codigo}`, {
                codigoVeu: codigoVeu,
                percentualLucro: percentualLucro,
                custoMaoDeObra: custoMaoDeObra,
                custoDespesas: outrasDespesas,
                custoImpostoPercentual: percentualImposto,
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
                                <InputDinheiro
                                    disabled
                                    id="custoTotal"
                                    campo={custoTotal}
                                    setter={setCustoTotal}
                                    valorPadrao={respostaAxios.custoTotal}
                                ></InputDinheiro>
                            </div>
                            <div
                                className={
                                    style.FormCadastro__ValoresOrcamento__Item
                                }
                            >
                                <label htmlFor="percentualDeLucro">
                                    Percentual de Lucro(%)
                                </label>
                                <InputPercentual
                                    id="percentualDeLucro"
                                    campo={percentualLucro}
                                    setter={setPercentualLucro}
                                    valorPadrao={respostaAxios.percentualLucro}
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
                                    valorPadrao={respostaAxios.custoDespesas}
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
                                    valorPadrao={respostaAxios.precoVenda}
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
                                    valorPadrao={respostaAxios.percentualImposto}
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
                                    valorPadrao={respostaAxios.custoMaoDeObra}
                                ></InputDinheiro>
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
