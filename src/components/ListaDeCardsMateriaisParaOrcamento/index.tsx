import CardMaterialOrcamento from "components/CardMaterialOrcamento";

import style from "./ListaDeCardsMateriaisParaOrcamento.module.scss";

export default function ListaDeCardsMateriaisParaOrcamento(){
    return(
        <div className={style.ListaDeCards}>
            <CardMaterialOrcamento/>
            <CardMaterialOrcamento/>
            <CardMaterialOrcamento/>
            <CardMaterialOrcamento/>
        </div>
    );
}