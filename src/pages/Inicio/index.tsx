import Card from "components/Card/index";
import Filtro from "components/Filtro";

import style from "./Inicio.module.scss";

export default function Inicio(){
    return(
        <section>
            <Filtro />
            <div className={style.ListaDeCards}>
                <Card />
            </div>
        </section>
    );
}