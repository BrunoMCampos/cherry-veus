import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import InputDinheiro from "components/InputDinheiro";
import style from "pages/Materiais/Materiais.module.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCadastrarMaterial } from "state/hooks/materiais/useCadastrarMaterial";

export default function CadastrarMaterial() {
    const navigate = useNavigate();

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [precoUnitario, setPrecoUnitario] = useState(0);

    const cadastrarMaterial = useCadastrarMaterial();

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        cadastrarMaterial(nomeMaterial, precoUnitario).then(() => {
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
                        <InputDinheiro
                            id="precoUnitario"
                            campo={precoUnitario}
                            setter={setPrecoUnitario}
                        />
                    </div>
                </div>
                <div className={style.Botoes}>
                    <Link to={"../materiais"}>
                        <BotaoCancelar />
                    </Link>
                    <BotaoLimpar
                        onClick={() => {
                            setNomeMaterial("");
                            setPrecoUnitario(0);
                        }}
                    />
                    <BotaoSalvar />
                </div>
            </form>
        </>
    );
}
