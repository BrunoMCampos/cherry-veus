import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import Input from "components/Input";
import BotaoConfirmar from "components/Botoes/BotaoConfirmar";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function ExcluirMaterial() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [codigo, setCodigo] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [preco, setPreco] = useState(0);

    useEffect(() => {
        if (parametros.codigo) {
            instanciaAxios
                .get<DadosCompletosMaterial>(
                    `materiais/${parametros.codigo}`
                )
                .then((resposta) => {
                    setCodigo(resposta.data.codigoMaterial);
                    setNomeMaterial(resposta.data.nome);
                    setDataCadastro(resposta.data.dataCadastro);
                    setPreco(resposta.data.preco);
                });
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios.delete(`materiais/${codigo}`)
            .then(() => {
                alert("Dados excluidos com sucesso!");
                navigate("../materiais");
            });
    };

    return (
        <form className={style.Form} onSubmit={aoSubmeterForm}>
            <div className={style.Dados}>
                <div className={style.Dados__Item}>
                    <label htmlFor="codigoMaterial">Código:</label>
                    <Input
                        id="codigoMaterial"
                        value={codigo.toString()}
                        type="number"
                        disabled
                    />
                </div>
                <div className={style.Dados__Item}>
                    <label htmlFor="nomeMaterial">Nome do Véu:</label>
                    <Input
                        disabled
                        id="nomeMaterial"
                        value={nomeMaterial}
                    />
                </div>
                <div className={style.Dados__Item}>
                    <label htmlFor="dataCadastro">Data do Cadastro:</label>
                    <Input
                        disabled
                        type="date"
                        id="dataCadastro"
                        value={dataCadastro}
                    />
                </div>
                <div className={style.Dados__Item}>
                    <label htmlFor="precoUnitario">Total Vendido:</label>
                    <Input 
                        disabled
                        type="number"
                        id="precoUnitario"
                        value={preco.toString()}
                    />
                </div>
            </div>
            <div className={style.Botoes}>
                <Link to={"../materiais"}>
                    <BotaoCancelar />
                </Link>
                <BotaoConfirmar />
            </div>
        </form>
    );
}
