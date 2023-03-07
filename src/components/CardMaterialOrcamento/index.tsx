import IconeExcluir from "components/Icones/Excluir";
import IconeEditar from "components/Icones/Editar";
import Input from "components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";

import style from "./CardMaterialOrcamento.module.scss";
import { DadosCompletosItemOrcamento } from "types/DadosCompletosItemOrcamento";
import instanciaAxios from "InstanciaAxios/instanciaAxios";

export default function CardMaterialOrcamento({
    dadosItemOrcamento,
}: {
    dadosItemOrcamento: DadosCompletosItemOrcamento;
}) {
    const parametros = useParams();

    const navegar = useNavigate();

    const excluirItem = () => {
        if (
            confirm(
                `Deseja realmente excluir o material: ${dadosItemOrcamento.nomeMaterial}?`
            )
        ) {
            instanciaAxios
                .delete(
                    `orcamentos/${parametros.codigo}/itens-orcamento/${dadosItemOrcamento.codigoItemOrcamento}`
                )
                .then(() => {
                    navegar(`../orcamentos/editar/${parametros.codigo}`);
                });
        }
    };

    return (
        <div className={style.Card}>
            <div className={style.Card__Cabecalho}>
                <div className={style.Card__Cabecalho__Linha}>
                    <span className={style.Card__Cabecalho__Linha__Titulo}>
                        {dadosItemOrcamento.nomeMaterial}
                    </span>
                    <Link
                        to={`../orcamentos/novo/${parametros.codigo}/editar-material/${dadosItemOrcamento.codigoItemOrcamento}`}
                    >
                        <IconeEditar />
                    </Link>
                    <div onClick={excluirItem} className={style.CursorPointer}>
                        <IconeExcluir />
                    </div>
                </div>
                <div className={style.Card__Cabecalho__Linha}>
                    <span className={style.Card__Cabecalho__Linha__Titulo}>
                        Custo Total do Item:
                    </span>
                    <span>{`R$ ${dadosItemOrcamento.custoTotalItem
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
            </div>

            <div className={style.Card__DadosPrincipais}>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Preço Unitário</span>
                    <span>{`R$ ${dadosItemOrcamento.precoUnitarioMaterial
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Quantidade Bruta Utilizada</span>
                    <span>{`${dadosItemOrcamento.quantidadeUtilizada
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Perda Percentual</span>
                    <span>
                        {`${dadosItemOrcamento.perdaPercentual
                            .toFixed(2)
                            .replace(".", ",")} %`}
                    </span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Custo de Perda</span>
                    <span>{`R$ ${dadosItemOrcamento.custoPerda
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Perda Bruta</span>
                    <span>{`${dadosItemOrcamento.perdaMaterial
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Quantidade Total com Perda</span>
                    <span>{`${dadosItemOrcamento.quantidadeUtilizadaComPerda
                        .toFixed(2)
                        .replace(".", ",")}`}</span>
                </div>
            </div>
        </div>
    );
}
