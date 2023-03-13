import IconeEditar from "components/Icones/Editar";
import IconeExcluir from "components/Icones/Excluir";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDeletarItemOrcamento } from "state/hooks/itemOrcamento/useDeletarItemOrcamento";
import { IItemOrcamento } from "types/IItemOrcamento";
import style from "./CardMaterialOrcamento.module.scss";

export default function CardMaterialOrcamento({
    dadosItemOrcamento,
}: {
    dadosItemOrcamento: IItemOrcamento;
}) {
    const parametros = useParams();

    const navegar = useNavigate();

    const deletarItemOrcamento = useDeletarItemOrcamento();

    const excluirItem = () => {
        if (
            confirm(
                `Deseja realmente excluir o material: ${dadosItemOrcamento.nomeMaterial}?`
            )
        ) {
            deletarItemOrcamento(dadosItemOrcamento).then(() => {
                navegar(`../orcamentos/detalhar/${parametros.codigoOrcamento}`);
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
                    <span>{`R$ ${
                        dadosItemOrcamento.custoTotalItem
                            ? dadosItemOrcamento.custoTotalItem.toFixed(2).replace(".", ",")
                            : "0,00"
                    }`}</span>
                </div>
            </div>

            <div className={style.Card__DadosPrincipais}>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Preço Unitário</span>
                    <span>{`R$ ${
                        dadosItemOrcamento.precoUnitarioMaterial
                            ? dadosItemOrcamento.precoUnitarioMaterial.toFixed(2).replace(".", ",")
                            : "0,00"
                    }`}</span>
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
                    <span>{`R$ ${
                        dadosItemOrcamento.custoPerda
                            ? dadosItemOrcamento.custoPerda.toFixed(2).replace(".", ",")
                            : "0,00"
                    }`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Perda Bruta</span>
                    <span>{`${
                        dadosItemOrcamento.perdaMaterial
                            ? dadosItemOrcamento.perdaMaterial.toFixed(2).replace(".", ",")
                            : "0,00"
                    }`}</span>
                </div>
                <div className={style.Card__DadosPrincipais__Item}>
                    <span>Quantidade Total com Perda</span>
                    <span>{`${
                        dadosItemOrcamento.quantidadeUtilizadaComPerda
                            ? dadosItemOrcamento.quantidadeUtilizadaComPerda.toFixed(2).replace(".", ",")
                            : "0,00"
                    }`}</span>
                </div>
            </div>
        </div>
    );
}
