import axios from "axios";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import style from "pages/Veus/Veus.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CadastrarVeu() {

    const navigate = useNavigate();

    const [nomeVeu, setNomeVeu] = useState("");

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        axios.post("http://localhost:8080/veus", {
            nome: nomeVeu
        })
            .then(() => {
                alert("Dados cadastrados com sucesso");
                navigate("../veus");
            });
    };

    return (
        <form className={style.Form} onSubmit={aoSubmeterForm}>
            <div className={style.Dados}>
                <div className={style.Dados__Item}>
                    <label htmlFor="nomeVeu">Nome do Véu:</label>
                    <Input id="nomeVeu" value={nomeVeu} onChange={evento => setNomeVeu(evento.target.value)}/>
                </div>
            </div>
            <div className={style.Botoes}>
                <Link to={"../veus"}>
                    <BotaoCancelar />
                </Link>
                <BotaoLimpar onClick={() => setNomeVeu("")}/>
                <BotaoSalvar />
            </div>
        </form>
    );
}
