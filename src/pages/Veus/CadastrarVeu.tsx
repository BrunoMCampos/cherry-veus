import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import style from "pages/Veus/Veus.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCadastrarVeus } from "state/hooks/veus/useCadastrarVeus";

export default function CadastrarVeu() {
    const navigate = useNavigate();

    const [nomeVeu, setNomeVeu] = useState("");

    const cadastrarVeu = useCadastrarVeus();

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        cadastrarVeu(nomeVeu).then(() => navigate("../veus"));
    };

    return (
        <>
            <h1 className={style.TituloPagina}>Cadastrar Véu</h1>
            <form className={style.Form} onSubmit={aoSubmeterForm}>
                <div className={style.Dados}>
                    <div className={style.Dados__Item}>
                        <label htmlFor="nomeVeu">Nome do Véu:</label>
                        <Input
                            id="nomeVeu"
                            value={nomeVeu}
                            onChange={(evento) =>
                                setNomeVeu(evento.target.value)
                            }
                        />
                    </div>
                </div>
                <div className={style.Botoes}>
                    <Link to={"../veus"}>
                        <BotaoCancelar />
                    </Link>
                    <BotaoLimpar onClick={() => setNomeVeu("")} />
                    <BotaoSalvar />
                </div>
            </form>
        </>
    );
}
