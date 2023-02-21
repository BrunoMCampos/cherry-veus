import BarraDeSelecaoDeVeuParaOrcamento from "components/BarraDeSelecaoDeVeuParaOrcamento";
import ListaDeCardsMateriaisParaOrcamento from "components/ListaDeCardsMateriaisParaOrcamento";

import style from "./NovoOrcamento.module.scss";

export default function NovoOrcamento(){
    return(
        <>
            <BarraDeSelecaoDeVeuParaOrcamento />
            <ListaDeCardsMateriaisParaOrcamento />
        </>
    );
}