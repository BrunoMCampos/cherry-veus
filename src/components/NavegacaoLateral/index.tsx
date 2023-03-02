import style from "./NavegacaoLateral.module.scss";
import { Link } from "react-router-dom";

export default function NavegacaoLateral(){

    const itensDeMenu = [{
        label:"HOME",
        to:"/"
    },{
        label:"VEUS",
        to:"/veus"
    },{
        label:"ORÇAMENTOS",
        to:"/orcamentos"
    },{
        label:"MATERIAIS",
        to:"/materiais"
    },{
        label:"CLIENTES",
        to:"/clientes"
    },{
        label:"VENDAS",
        to:"/vendas"
    }];

    return(
        <nav className={style.NavegacaoLateral}>
            <ul>
                {itensDeMenu.map((item,index)=>(
                    <li key={index}>
                        <Link to={item.to} >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}