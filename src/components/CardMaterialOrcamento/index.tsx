import IconeDeletar from "components/Icones/Deletar";
import IconeEditar from "components/Icones/Editar";
import Input from "components/Input";
import { Link } from "react-router-dom";

import style from "./CardMaterialOrcamento.module.scss";

export default function CardMaterialOrcamento(){
    return(
        <div className={style.Card}>

            <div className={style.Card__Cabecalho}>
                <span className={style.Card__Cabecalho__Titulo}>Nome do Material</span>
                <Link to={""}>
                    <IconeEditar/>
                </Link>
                <Link to={""}>
                    <IconeDeletar/>
                </Link>
            </div>

            <div className={style.Card__DadosPrincipais}>

                <div className={style.Card__DadosPrincipais__Colunas}>
                    <span>Preço Unitário</span>
                    <Input placeHolder="R$ 0,00"/>

                    <span>Perda Percentual</span>
                    <Input placeHolder="15%"/>

                    <span>Custo de Mão de Obra</span>
                    <Input placeHolder="R$ 0,00"/>

                    <span>Quantidade Bruta Utilizada</span>
                    <Input placeHolder="150"/>
                </div>

                <div className={style.Card__DadosPrincipais__Colunas}>
                    <span>Outras Despesas</span>
                    <Input placeHolder="R$ 0,00"/>

                    <span>Perda Bruta</span>
                    <Input placeHolder="10" disabled/>

                    <span>Custo de Perda</span>
                    <Input placeHolder="R$ 0,00" disabled/>

                    <span>Quantidade Total com Perda</span>
                    <Input placeHolder="160" disabled/>
                </div>
            </div>

            <div className={style.Card__DadosTotais}>
                <span>Custo Total de Matéria Prima com Perda</span>
                <Input placeHolder="R$ 0,00" disabled/>

                <span>Custo Total do Item</span>
                <Input placeHolder="R$ 0,00" disabled/>
            </div>
        </div>
    );
}