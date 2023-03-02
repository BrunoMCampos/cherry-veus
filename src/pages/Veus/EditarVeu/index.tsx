import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosVeu } from "types/DadosCompletosVeu";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";

export default function EditarVeu() {
    const navigate = useNavigate();

    const parametros = useParams();

    const dadosEmBranco:DadosCompletosVeu = {
        codigoVeu:0,
        nome:"",
        dataCadastro:"",
        totalVendido:0
    };

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigo, setCodigo] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [totalVendido, setTotalVendido] = useState(0);

    const [dados, setDados] = useState(dadosEmBranco);

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
                    setDados(resposta.data);
                    console.log(dados);
                });
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        axios.put(`http://localhost:8080/veus/${codigo}`, {
            nome:nomeVeu
        })
            .then(() => {
                alert("Dados atualizados com sucesso!");
                navigate("../veus");
            });
    };

    const limparCampos = () =>{
        setCodigo(dados.codigoVeu);
        setNomeVeu(dados.nome);
        setDataCadastro(dados.dataCadastro);
        setTotalVendido(dados.totalVendido);
        console.log(dados);
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
                        id="nomeVeu"
                        value={nomeVeu}
                        onChange={(evento) => setNomeVeu(evento.target.value)}
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
                <BotaoLimpar onClick={limparCampos}/>
                <BotaoSalvar />
            </div>
        </form>
    );
}
