import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosVeu } from "types/DadosCompletosVeu";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import Input from "components/Input";
import BotaoConfirmar from "components/Botoes/BotaoConfirmar";

export default function ExcluirVeu() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigo, setCodigo] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [totalVendido, setTotalVendido] = useState(0);

    useEffect(() => {
        if (parametros.codigo) {
            axios
                .get<DadosCompletosVeu>(
                    `http://localhost:8080/veus/${parametros.codigo}`
                )
                .then((resposta) => {
                    setCodigo(resposta.data.codigoVeu);
                    setNomeVeu(resposta.data.nome);
                    setDataCadastro(resposta.data.dataCadastro);
                    setTotalVendido(resposta.data.totalVendido);
                });
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        axios.delete(`http://localhost:8080/veus/${codigo}`)
            .then(() => {
                alert("Dados excluidos com sucesso!");
                navigate("../veus");
            });
    };

    return (
        <form className={style.Form} onSubmit={aoSubmeterForm}>
            <div className={style.Dados}>
                <div className={style.Dados__Item}>
                    <label htmlFor="codigoVeu">Código:</label>
                    <Input
                        id="codigoVeu"
                        value={codigo.toString()}
                        type="number"
                        disabled
                    />
                </div>
                <div className={style.Dados__Item}>
                    <label htmlFor="nomeVeu">Nome do Véu:</label>
                    <Input
                        disabled
                        id="nomeVeu"
                        value={nomeVeu}
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
                    <label htmlFor="totalVendido">Total Vendido:</label>
                    <Input 
                        disabled
                        type="number"
                        id="totalVendido"
                        value={totalVendido.toString()}
                    />
                </div>
            </div>
            <div className={style.Botoes}>
                <Link to={"../veus"}>
                    <BotaoCancelar />
                </Link>
                <BotaoConfirmar />
            </div>
        </form>
    );
}
