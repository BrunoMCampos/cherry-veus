import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Orcamentos/Orcamentos.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function AdicionarMaterialOrcamento() {

    const navegacao = useNavigate();

    const parametros = useParams();

    const [precoUnitario, setPrecoUnitario] = useState(0);
    const [precoUnitarioPadrao, setPrecoUnitarioPadrao] = useState(0);
    const [quantidadeBrutaUtilizada, setQuantidadeBrutaUtilizada] = useState(0);
    const [perdaPercentual, setPerdaPercentual] = useState(0);
    const [custoMaoDeObra, setCustoMaoDeObra] = useState(0);
    const [outrasDespesas, setOutrasDespesas] = useState(0);
    const [perdaBruta, setPerdaBruta] = useState(0);
    const [custoPerda, setCustoPerda] = useState(0);
    const [quantidadeTotalComPerda, setQuantidadeTotalComPerda] = useState(0);
    const [custoTotalMateriaPrimaComPerda, setCustoTotalMateriaPrimaComPerda] =
        useState(0);
    const [custoTotalItem, setCustoTotalItem] = useState(0);

    useEffect(() => {
        instanciaAxios
            .get<DadosCompletosMaterial>(
                `materiais/${parametros.codigoMaterial}`
            )
            .then((resposta) => {
                setPrecoUnitarioPadrao(resposta.data.preco);
                setPrecoUnitario(resposta.data.preco);
            });
    }, [parametros]);

    const limparCampos = () => {
        setPrecoUnitario(precoUnitarioPadrao);
        setCustoMaoDeObra(0);
        setOutrasDespesas(0);
        setPerdaPercentual(0);
        setQuantidadeBrutaUtilizada(0);
        calcularCamposDisabled(true);
    };

    const calcularCamposDisabled = (limpar = false) => {
        let perdaB = quantidadeBrutaUtilizada * (perdaPercentual / 100);
        let custoP = perdaB * precoUnitario;
        let quantidadeTotalComP = quantidadeBrutaUtilizada + perdaB;
        let custoTotalMatPComP = quantidadeTotalComP*precoUnitario;
        let custoTotalIt = custoMaoDeObra+custoTotalMatPComP+outrasDespesas;

        if(limpar){
            perdaB = 0;
            custoP = 0;
            quantidadeTotalComP = 0;
            custoTotalMatPComP = 0;
            custoTotalIt = 0;
        }

        setPerdaBruta(perdaB);
        setCustoPerda(custoP);
        setQuantidadeTotalComPerda(quantidadeTotalComP);
        setCustoTotalMateriaPrimaComPerda(custoTotalMatPComP);
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
                evento.target.valueAsNumber.toFixed(2)
            );
            setter(parsedText);
        }
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios
            .post(`orcamentos/${parametros.codigoOrcamento}/itens-orcamento`,{
                codigoMaterial: parametros.codigoMaterial,
                quantidadeUtilizada: quantidadeBrutaUtilizada,
                perdaPercentual: perdaPercentual,
                perdaMaterial: perdaBruta,
                custoMaoDeObra: custoMaoDeObra,
                outrasDespesas: outrasDespesas
            })
            .then(() =>{
                navegacao(`/orcamentos/novo/${parametros.codigoOrcamento}`);
            });
    };

    return (
        <>
            <div className={style.SubTitulo}>
                <h2>Nome do Material</h2>
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
                            step=".01"
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
                            step=".01"
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
                            step=".01"
                        />
                    </div>
                    <div>
                        <label htmlFor="custoDeMaoDeObra">
                            Custo de Mão de Obra
                        </label>
                        <Input
                            type="number"
                            id="custoDeMaoDeObra"
                            value={custoMaoDeObra.toString()}
                            onChange={(evento) =>
                                verificarInputDeNumero(
                                    evento,
                                    setCustoMaoDeObra,
                                    custoMaoDeObra
                                )
                            }
                            onBlur={() => calcularCamposDisabled()}
                            min="0"
                            step=".01"
                        />
                    </div>
                    <div>
                        <label htmlFor="outrasDespesas">Outras Despesas</label>
                        <Input
                            type="number"
                            id="outrasDespesas"
                            value={outrasDespesas.toString()}
                            onChange={(evento) =>
                                verificarInputDeNumero(
                                    evento,
                                    setOutrasDespesas,
                                    outrasDespesas
                                )
                            }
                            onBlur={() => calcularCamposDisabled()}
                            min="0"
                            step=".01"
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
                            step=".01"
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
                            step=".01"
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
                            step=".01"
                        />
                    </div>
                    <div>
                        <label htmlFor="custoTotalDeMateriaPrimaComPerda">
                            Custo Total de Matéria Prima com Perda
                        </label>
                        <Input
                            type="number"
                            disabled
                            id="custoTotalDeMateriaPrimaComPerda"
                            value={custoTotalMateriaPrimaComPerda.toString()}
                            onChange={(evento) =>
                                setCustoTotalMateriaPrimaComPerda(
                                    evento.target.valueAsNumber
                                )
                            }
                            min="0"
                            step=".01"
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
                            step=".01"
                        />
                    </div>
                </div>
                <div className={style.FrameDeBotoes}>
                    <Link to={`../orcamentos/novo/${parametros.codigoOrcamento}`}>
                        <BotaoCancelar />
                    </Link>
                    <BotaoLimpar onClick={limparCampos} />
                    <BotaoSalvar />
                </div>
            </form>
        </>
    );
}
