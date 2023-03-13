import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import InputDinheiro from "components/InputDinheiro";
import InputNumerico from "components/InputNumerico";
import InputPercentual from "components/InputPercentual";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Orcamentos/Orcamentos.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlterarItemOrcamento } from "state/hooks/itemOrcamento/useAlterarItemOrcamento";
import { IItemOrcamento } from "types/IItemOrcamento";

export default function AdicionarMaterialOrcamento() {
    const navegacao = useNavigate();

    const parametros = useParams();

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState(0);
    const [quantidadeBrutaUtilizada, setQuantidadeBrutaUtilizada] = useState(0);
    const [perdaPercentual, setPerdaPercentual] = useState(0);
    const [perdaBruta, setPerdaBruta] = useState(0);
    const [custoPerda, setCustoPerda] = useState(0);
    const [quantidadeTotalComPerda, setQuantidadeTotalComPerda] = useState(0);
    const [custoTotalItem, setCustoTotalItem] = useState(0);

    const [itemOrcamento, setItemOrcamento] = useState<IItemOrcamento>();

    const alterarItemOrcamento = useAlterarItemOrcamento();

    useEffect(() => {
        if (parametros.codigoOrcamento && parametros.codigoItemOrcamento) {
            instanciaAxios
                .get<IItemOrcamento>(
                    `orcamentos/${parametros.codigoOrcamento}/itens-orcamento/${parametros.codigoItemOrcamento}`
                )
                .then((resposta) => {
                    setPrecoUnitario(resposta.data.precoUnitarioMaterial);
                    setQuantidadeBrutaUtilizada(
                        resposta.data.quantidadeUtilizada
                    );
                    setPerdaPercentual(resposta.data.perdaPercentual);
                    setNomeMaterial(
                        resposta.data.nomeMaterial
                            ? resposta.data.nomeMaterial
                            : ""
                    );
                    setItemOrcamento(resposta.data);
                })
                .catch((erro) => {
                    console.log(erro);
                });
            limparCampos();
        }
    }, [parametros]);

    // useEffect(() => {
    //     limparCampos();
    // }, [itemOrcamento]);

    const limparCampos = () => {
        if (itemOrcamento) {
            setPrecoUnitario(itemOrcamento.precoUnitarioMaterial);
            setQuantidadeBrutaUtilizada(itemOrcamento.quantidadeUtilizada);
            setPerdaPercentual(itemOrcamento.perdaPercentual);
            calcularCamposDisabled(true);
        }
    };

    const calcularCamposDisabled = (limpar = false) => {
        let perdaB;
        let custoP;
        let quantidadeTotalComP;
        let custoTotalIt;

        if (itemOrcamento && limpar) {
            perdaB = itemOrcamento.perdaMaterial;
            custoP = itemOrcamento.custoPerda;
            quantidadeTotalComP = itemOrcamento.quantidadeUtilizadaComPerda;
            custoTotalIt = itemOrcamento.custoTotalItem;
        } else {
            perdaB = quantidadeBrutaUtilizada * (perdaPercentual / 100);
            custoP = perdaB * precoUnitario;
            quantidadeTotalComP = quantidadeBrutaUtilizada + perdaB;
            custoTotalIt = quantidadeTotalComPerda * precoUnitario;
        }
        setPerdaBruta(perdaB ? perdaB : 0);
        setCustoPerda(custoP ? custoP : 0);
        setQuantidadeTotalComPerda(
            quantidadeTotalComP ? quantidadeTotalComP : 0
        );
        setCustoTotalItem(custoTotalIt ? custoTotalIt : 0);
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (itemOrcamento) {
            alterarItemOrcamento({
                codigoItemOrcamento: itemOrcamento.codigoItemOrcamento,
                codigoOrcamento: itemOrcamento.codigoOrcamento,
                precoUnitarioMaterial: precoUnitario,
                quantidadeUtilizada: quantidadeBrutaUtilizada,
                perdaPercentual: perdaPercentual,
            }).then(() => {
                navegacao(
                    `../orcamentos/detalhar/${parametros.codigoOrcamento}`
                );
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
                        <InputDinheiro
                            campo={precoUnitario}
                            setter={setPrecoUnitario}
                            id="precoUnitario"
                            onBlur={() => calcularCamposDisabled()}
                            valorPadrao={itemOrcamento?.precoUnitarioMaterial}
                        ></InputDinheiro>
                    </div>
                    <div>
                        <label htmlFor="quantidadeBrutaUtilizada">
                            Quantidade Bruta Utilizada
                        </label>
                        <InputNumerico
                            id="quantidadeBrutaUtilizada"
                            onBlur={() => calcularCamposDisabled()}
                            campo={quantidadeBrutaUtilizada}
                            casasDecimais={3}
                            setter={setQuantidadeBrutaUtilizada}
                            valorPadrao={itemOrcamento?.quantidadeUtilizada}
                        />
                    </div>
                    <div>
                        <label htmlFor="perdaPercentual">
                            Perda Percentual
                        </label>
                        <InputPercentual
                            campo={perdaPercentual}
                            setter={setPerdaPercentual}
                            id="perdaPercentual"
                            onBlur={() => calcularCamposDisabled()}
                            valorPadrao={itemOrcamento?.perdaPercentual}
                        />
                    </div>

                    <div>
                        <label htmlFor="perdaBruta">Perda Bruta</label>
                        <InputNumerico
                            disabled
                            id="perdaBruta"
                            campo={perdaBruta}
                            casasDecimais={3}
                            setter={setPerdaBruta}
                            valorPadrao={itemOrcamento?.perdaMaterial}
                        />
                    </div>
                    <div>
                        <label htmlFor="custoPerda">Custo de Perda</label>
                        <InputDinheiro
                            disabled
                            id="custoPerda"
                            campo={custoPerda}
                            setter={setCustoPerda}
                            valorPadrao={itemOrcamento?.custoPerda}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantidadeTotalComPerda">
                            Quantidade Total com Perda
                        </label>
                        <InputNumerico
                            disabled
                            id="quantidadeTotalComPerda"
                            campo={quantidadeTotalComPerda}
                            casasDecimais={3}
                            setter={setQuantidadeTotalComPerda}
                            valorPadrao={
                                itemOrcamento?.quantidadeUtilizadaComPerda
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="custoTotalItem">
                            Custo Total do Item
                        </label>
                        <InputDinheiro
                            disabled
                            id="custoTotalItem"
                            campo={custoTotalItem}
                            setter={setCustoTotalItem}
                            valorPadrao={itemOrcamento?.custoTotalItem}
                        />
                    </div>
                </div>
                <div className={style.FrameDeBotoes}>
                    <Link
                        to={`../orcamentos/detalhar/${parametros.codigoOrcamento}`}
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
