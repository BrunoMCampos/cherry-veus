import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Materiais/Materiais.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CadastrarMaterial() {
    const navigate = useNavigate();

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState(0);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios
            .post("materiais", {
                nome: nomeMaterial,
                precoUnitario: precoUnitario
            })
            .then(() => {
                alert("Dados cadastrados com sucesso");
                navigate("../materiais");
            });
    };

    return (
        <>
            <form className={style.FormCadastro} onSubmit={aoSubmeterForm}>
                <div className={style.Dados}>
                    <div>
                        <label htmlFor="nomeMaterial">Nome do Material:</label>
                        <Input
                            id="nomeMaterial"
                            value={nomeMaterial}
                            onChange={(evento) =>
                                setNomeMaterial(evento.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="precoUnitario">Preço Unitário:</label>
                        <Input
                            id="precoUnitario"
                            value={precoUnitario.toString()}
                            type="number"
                            onChange={(evento) =>
                                setPrecoUnitario(evento.target.valueAsNumber)
                            }
                        />
                    </div>
                </div>
                <div className={style.Botoes}>
                    <Link to={"../materiais"}>
                        <BotaoCancelar />
                    </Link>
                    <BotaoLimpar onClick={() =>{
                        setNomeMaterial("");
                        setPrecoUnitario(0);
                    }} />
                    <BotaoSalvar />
                </div>
            </form>
        </>
    );
}
