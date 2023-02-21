import style from "./Cabecalho.module.scss";
import logo from "imgs/logo.png";

function Cabecalho(){
    return(
        <div className={style.Cabecalho}>
            <img src={logo} alt="Logo Cherry Véus" />

            <h1>CHERRY VÉUS</h1>

            <a href="##"><span className="material-symbols-outlined">logout</span></a>
        </div>
    );
}

export default Cabecalho;