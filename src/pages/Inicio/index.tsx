import CardHomePage from "components/CardHomePage/index";
import Filtro from "components/Filtro";

import style from "./Inicio.module.scss";

export default function Inicio(){
    return(
        <section>
            <Filtro />
            <div className={style.ListaDeCards}>
                <CardHomePage />
            </div>
        </section>
    );
}