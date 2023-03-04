import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import Input from "components/Input";
import { Link, useParams } from "react-router-dom";

import style from "./CardMaterialOrcamento.module.scss";
import { DadosCompletosItemOrcamento } from "types/DadosCompletosItemOrcamento";

export default function CardMaterialOrcamento({
    dadosItemOrcamento,
}: {
    dadosItemOrcamento: DadosCompletosItemOrcamento;
}) {

    const parametros = useParams();

    return (
        <div className={style.Card}>
            <div className={style.Card__Cabecalho}>
                <span className={style.Card__Cabecalho__Titulo}>
                    {dadosItemOrcamento.nomeMaterial}
                </span>
                <Link to={`../orcamentos/novo/${parametros.codigoOrcamento}/editar-material/${parametros.codigoMaterial}`}>
                    <IconeEditar />
                </Link>
                <Link to={""}>
                    <IconeExcluir />
                </Link>
            </div>

            <div className={style.Card__DadosPrincipais}>
                <div className={style.Card__DadosPrincipais__Colunas}>
                    <span>Preço Unitário</span>
                    <Input disabled value={dadosItemOrcamento.precoUnitarioMaterial.toFixed(2)} />

                    <span>Perda Percentual</span>
                    <Input disabled value={dadosItemOrcamento.perdaPercentual.toFixed(2)} />

                    <span>Custo de Mão de Obra</span>
                    <Input disabled value={dadosItemOrcamento.custoMaoDeObra.toFixed(2)} />

                    <span>Quantidade Bruta Utilizada</span>
                    <Input disabled value={dadosItemOrcamento.quantidadeUtilizada.toFixed(2)} />
                </div>

                <div className={style.Card__DadosPrincipais__Colunas}>
                    <span>Outras Despesas</span>
                    <Input disabled value={dadosItemOrcamento.outrasDespesas.toFixed(2)} />

                    <span>Perda Bruta</span>
                    <Input disabled value={dadosItemOrcamento.perdaMaterial.toFixed(2)} />

                    <span>Custo de Perda</span>
                    <Input disabled value={dadosItemOrcamento.custoPerda.toFixed(2)} />

                    <span>Quantidade Total com Perda</span>
                    <Input disabled value={dadosItemOrcamento.quantidadeUtilizadaComPerda.toFixed(2)} />
                </div>
            </div>

            <div className={style.Card__DadosTotais}>
                <span>Custo Total de Matéria Prima com Perda</span>
                <Input disabled value={dadosItemOrcamento.custoMateriaPrimaComPerda.toFixed(2)} />

                <span>Custo Total do Item</span>
                <Input disabled value={dadosItemOrcamento.custoTotalItem.toFixed(2)} />
            </div>
        </div>
    );
}
