import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Orcamentos/Orcamentos.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosItemOrcamento } from "types/DadosCompletosItemOrcamento";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function AdicionarMaterialOrcamento() {
    const navegacao = useNavigate();

    const parametros = useParams();

    const [nomeMaterial, setNomeMaterial] = useState("");

    const [precoUnitario, setPrecoUnitario] = useState(0);
    const [precoUnitarioPadrao, setPrecoUnitarioPadrao] = useState(0);

    const [quantidadeBrutaUtilizada, setQuantidadeBrutaUtilizada] = useState(0);

    const [perdaPercentual, setPerdaPercentual] = useState(0);

    const [perdaBruta, setPerdaBruta] = useState(0);

    const [custoPerda, setCustoPerda] = useState(0);

    const [quantidadeTotalComPerda, setQuantidadeTotalComPerda] = useState(0);

    const [custoTotalItem, setCustoTotalItem] = useState(0);

    const [respostaAxios, setRespostaAxios] =
        useState<DadosCompletosItemOrcamento>({
            codigoItemOrcamento: 0,
            codigoMaterial: 0,
            custoPerda: 0,
            custoTotalItem: 0,
            nomeMaterial: "",
            perdaMaterial: 0,
            perdaPercentual: 0,
            precoUnitarioMaterial: 0,
            quantidadeUtilizada: 0,
            quantidadeUtilizadaComPerda: 0,
        });

    useEffect(() => {
        if (window.location.href.includes("editar-material")) {
            instanciaAxios
                .get<DadosCompletosItemOrcamento>(
                    `orcamentos/${parametros.codigoOrcamento}/itens-orcamento/${parametros.codigoMaterial}`
                )
                .then((resposta) => {
                    setPrecoUnitario(resposta.data.precoUnitarioMaterial);
                    setPrecoUnitarioPadrao(resposta.data.precoUnitarioMaterial);
                    setQuantidadeBrutaUtilizada(
                        resposta.data.quantidadeUtilizada
                    );
                    setPerdaPercentual(resposta.data.perdaPercentual);
                    setNomeMaterial(resposta.data.nomeMaterial);
                    setRespostaAxios(resposta.data);
                });
        } else {
            instanciaAxios
                .get<DadosCompletosMaterial>(
                    `materiais/${parametros.codigoMaterial}`
                )
                .then((resposta) => {
                    setPrecoUnitario(resposta.data.preco);
                    setPrecoUnitarioPadrao(resposta.data.preco);
                    setNomeMaterial(resposta.data.nome);
                });
        }
        limparCampos();
    }, [parametros]);

    useEffect(() => {
        limparCampos();
    }, [respostaAxios]);

    const limparCampos = () => {
        setPrecoUnitario(precoUnitarioPadrao);
        setQuantidadeBrutaUtilizada(respostaAxios.quantidadeUtilizada);
        setPerdaPercentual(respostaAxios.perdaPercentual);
        calcularCamposDisabled(true);
    };

    const calcularCamposDisabled = (limpar = false) => {
        let perdaB;
        let custoP;
        let quantidadeTotalComP;
        let custoTotalIt;

        if (respostaAxios.codigoItemOrcamento != 0 && limpar) {
            perdaB = respostaAxios.perdaMaterial;
            custoP = respostaAxios.custoPerda;
            quantidadeTotalComP = respostaAxios.quantidadeUtilizadaComPerda;
            custoTotalIt = respostaAxios.custoTotalItem;
        } else {
            if (limpar) {
                perdaB = 0;
                custoP = 0;
                quantidadeTotalComP = 0;
                custoTotalIt = 0;
            } else {
                perdaB = quantidadeBrutaUtilizada * (perdaPercentual / 100);
                custoP = perdaB * precoUnitario;
                quantidadeTotalComP = quantidadeBrutaUtilizada + perdaB;
                custoTotalIt =  quantidadeTotalComPerda * precoUnitario;
            }
        }

        setPerdaBruta(perdaB);
        setCustoPerda(custoP);
        setQuantidadeTotalComPerda(quantidadeTotalComP);
        setCustoTotalItem(custoTotalIt);
    };

    const verificarInputDeNumero = (
        evento: React.ChangeEvent<HTMLInputElement>,
        setter: (value: React.SetStateAction<number>) => void,
        campo: number
    ) => {
        if (evento.target.value == "") {
            if (campo.toString().length == 1) {
                setter(0);
            }
        } else if (isNaN(evento.target.valueAsNumber)) {
            evento.preventDefault();
        } else {
            const parsedText = parseFloat(
                evento.target.valueAsNumber.toFixed(3)
            );
            setter(parsedText);
        }
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (window.location.href.includes("editar-material")) {
            instanciaAxios
                .put(
                    `orcamentos/${parametros.codigoOrcamento}/itens-orcamento/${respostaAxios.codigoItemOrcamento}`,
                    {
                        precoUnitarioMaterial: precoUnitario,
                        quantidadeUtilizada: quantidadeBrutaUtilizada,
                        perdaPercentual: perdaPercentual,
                    }
                )
                .then(() => {
                    navegacao(`/orcamentos/novo/${parametros.codigoOrcamento}`);
                });
        } else {
            instanciaAxios
                .post(
                    `orcamentos/${parametros.codigoOrcamento}/itens-orcamento`,
                    {
                        codigoMaterial: parametros.codigoMaterial,
                        quantidadeUtilizada: quantidadeBrutaUtilizada,
                        perdaPercentual: perdaPercentual,
                        perdaMaterial: perdaBruta,
                    }
                )
                .then(() => {
                    navegacao(`/orcamentos/novo/${parametros.codigoOrcamento}`);
                });
        }
    };

    return (
        <>
            <div className={style.SubTitulo}>
                <h2>{nomeMaterial}</h2>
            </div>
            <form className={style.Form} onSubmit={aoSubmeterForm}>
                <div className={style.Form__Dados}>
                    <div>
                        <label htmlFor="precoUnitario">Preço Unitário</label>
                        <Input
                            type="number"
                            id="precoUnitario"
                            value={precoUnitario.toString()}
                            onChange={(evento) =>
                                verificarInputDeNumero(
                                    evento,
                                    setPrecoUnitario,
                                    precoUnitario
                                )
                            }
                            onBlur={() => calcularCamposDisabled()}
                            min="0"
                            step="0.001"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantidadeBrutaUtilizada">
                            Quantidade Bruta Utilizada
                        </label>
                        <Input
                            type="number"
                            id="quantidadeBrutaUtilizada"
                            value={quantidadeBrutaUtilizada.toString()}
                            onChange={(evento) =>
                                verificarInputDeNumero(
                                    evento,
                                    setQuantidadeBrutaUtilizada,
                                    quantidadeBrutaUtilizada
                                )
                            }
                            onBlur={() => calcularCamposDisabled()}
                            min="0"
                            step="0.001"
                        />
                    </div>
                    <div>
                        <label htmlFor="perdaPercentual">
                            Perda Percentual
                        </label>
                        <Input
                            type="number"
                            id="perdaPercentual"
                            value={perdaPercentual.toString()}
                            onChange={(evento) => {
                                verificarInputDeNumero(
                                    evento,
                                    setPerdaPercentual,
                                    perdaPercentual
                                );
                            }}
                            onBlur={() => calcularCamposDisabled()}
                            min="0"
                            step="0.001"
                        />
                    </div>

                    <div>
                        <label htmlFor="perdaBruta">Perda Bruta</label>
                        <Input
                            type="number"
                            disabled
                            id="perdaBruta"
                            value={perdaBruta.toString()}
                            onChange={(evento) =>
                                setPerdaBruta(evento.target.valueAsNumber)
                            }
                            min="0"
                            step="0.001"
                        />
                    </div>
                    <div>
                        <label htmlFor="custoPerda">Custo de Perda</label>
                        <Input
                            type="number"
                            disabled
                            id="custoPerda"
                            value={custoPerda.toString()}
                            onChange={(evento) =>
                                setCustoPerda(evento.target.valueAsNumber)
                            }
                            min="0"
                            step="0.001"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantidadeTotalComPerda">
                            Quantidade Total com Perda
                        </label>
                        <Input
                            type="number"
                            disabled
                            id="quantidadeTotalComPerda"
                            value={quantidadeTotalComPerda.toString()}
                            onChange={(evento) =>
                                setQuantidadeTotalComPerda(
                                    evento.target.valueAsNumber
                                )
                            }
                            min="0"
                            step="0.001"
                        />
                    </div>

                    <div>
                        <label htmlFor="custoTotalItem">
                            Custo Total do Item
                        </label>
                        <Input
                            type="number"
                            disabled
                            id="custoTotalItem"
                            value={custoTotalItem.toString()}
                            onChange={(evento) =>
                                setCustoTotalItem(evento.target.valueAsNumber)
                            }
                            min="0"
                            step="0.001"
                        />
                    </div>
                </div>
                <div className={style.FrameDeBotoes}>
                    <Link
                        to={`../orcamentos/novo/${parametros.codigoOrcamento}`}
                    >
                        <BotaoCancelar />
                    </Link>
                    <BotaoLimpar onClick={limparCampos} />
                    <BotaoSalvar />
                </div>
            </form>
        </>
    );
}
