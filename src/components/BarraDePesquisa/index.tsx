import style from "./BarraDePesquisa.module.scss";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import Input from "components/Input";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function BarraDePesquisa({ destino }: { destino?: string }) {
    const [pesquisa, setPesquisa] = useState("");

    const submeterForm = (evento: React.FormEvent<HTMLFormElement>) =>{
        evento.preventDefault();
        document.getElementById("botaoPesquisar")?.click();
    };

    return (
        <form className={style.BarraDePesquisa} onSubmit={submeterForm}>
            <Input
                placeHolder="Dados da Pesquisa"
                id="BarraDePesquisa"
                value={pesquisa}
                onChange={(evento) => setPesquisa(evento.target.value)}
            />
            <Link to={"../" + destino + pesquisa} id="botaoPesquisar">
                <BotaoPesquisar />
            </Link>
        </form>
    );
}