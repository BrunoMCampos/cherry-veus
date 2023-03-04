import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";

export default function EditarMaterial() {
    const navigate = useNavigate();

    const parametros = useParams();

    const dadosEmBranco:DadosCompletosMaterial = {
        codigoMaterial:0,
        nome:"",
        dataCadastro:"",
        preco:0
    };

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [codigo, setCodigo] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [preco, setPreco] = useState(0);

    const [dados, setDados] = useState(dadosEmBranco);

    useEffect(() => {
        if (parametros.codigo) {
            instanciaAxios
                .get<DadosCompletosMaterial>(`materiais/${parametros.codigo}`
                )
                .then((resposta) => {
                    setCodigo(resposta.data.codigoMaterial);
                    setNomeMaterial(resposta.data.nome);
                    setDataCadastro(resposta.data.dataCadastro);
                    setPreco(resposta.data.preco);
                    setDados(resposta.data);
                });
        }
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios.put(`materiais/${codigo}`, {
            nome:nomeMaterial,
            precoUnitario:preco
        })
            .then(() => {
                alert("Dados atualizados com sucesso!");
                navigate("../materiais");
            });
    };

    const limparCampos = () =>{
        setCodigo(dados.codigoMaterial);
        setNomeMaterial(dados.nome);
        setDataCadastro(dados.dataCadastro);
        setPreco(dados.preco);
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
                        id="nomeMaterial"
                        value={nomeMaterial}
                        onChange={(evento) => setNomeMaterial(evento.target.value)}
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
                    <label htmlFor="precoUnitario">Preço Unitário:</label>
                    <Input 
                        type="number"
                        id="precoUnitario"
                        value={preco.toString()}
                        onChange={(evento) => setPreco(evento.target.valueAsNumber)}
                    />
                </div>
            </div>
            <div className={style.Botoes}>
                <Link to={"../materiais"}>
                    <BotaoCancelar />
                </Link>
                <BotaoLimpar onClick={limparCampos}/>
                <BotaoSalvar />
            </div>
        </form>
    );
}
