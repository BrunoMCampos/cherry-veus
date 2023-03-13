import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IMaterial } from "types/IMaterial";
import InputNumerico from "components/InputNumerico";
import InputDinheiro from "components/InputDinheiro";
import BotaoExcluir from "components/Botoes/BotaoExcluir";
import { useDeletarMaterial } from "state/hooks/materiais/useDeletarMaterial";
import { useAlterarMaterial } from "state/hooks/materiais/useAlterarMaterial";

export default function DetalharMaterial() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeMaterial, setNomeMaterial] = useState("");
    const [codigo, setCodigo] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [preco, setPreco] = useState(0);

    const [material, setDados] = useState<IMaterial>();

    const deletarMaterial = useDeletarMaterial();
    const alterarMaterial = useAlterarMaterial();

    useEffect(() => {
        instanciaAxios
            .get<IMaterial>(`materiais/${parametros.codigoMaterial}`)
            .then((resposta) => {
                setCodigo(resposta.data.codigoMaterial);
                setNomeMaterial(resposta.data.nome);
                setDataCadastro(resposta.data.dataCadastro);
                setPreco(resposta.data.precoUnitario);
                setDados(resposta.data);
            })
            .catch((erro) => {
                console.log(
                    `Erro ao solicitar os dados do material no Backend: ${erro}`
                );
            });
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        console.log("Preço: " + preco);
        alterarMaterial({
            codigoMaterial: codigo,
            dataCadastro: dataCadastro,
            nome: nomeMaterial,
            precoUnitario: preco,
        }).then(() => {
            navigate("../materiais");
        });
    };

    const excluirMaterial = () => {
        if (confirm(`Deseja realmente excluir o item ${nomeMaterial}?`)) {
            if (material) {
                deletarMaterial(material).then(() => navigate("../materiais"));
            } else {
                alert("Erro ao excluir material!");
                console.log("Material inexistente: " + material);
            }
        }
    };

    const limparCampos = () => {
        if (material) {
            setCodigo(material.codigoMaterial);
            setNomeMaterial(material.nome);
            setDataCadastro(material.dataCadastro);
            setPreco(material.precoUnitario);
        } else {
            console.log("Erro ao inserir dados nos compos, dados indefinidos!");
        }
    };

    return (
        <form className={style.Form} onSubmit={aoSubmeterForm}>
            <div className={style.Dados}>
                <div className={style.Dados__Item}>
                    <label htmlFor="codigoMaterial">Código:</label>
                    <InputNumerico
                        id="codigoMaterial"
                        campo={codigo}
                        disabled
                        casasDecimais={0}
                        setter={setCodigo}
                    />
                </div>
                <div className={style.Dados__Item}>
                    <label htmlFor="nomeMaterial">Nome do Material:</label>
                    <Input
                        id="nomeMaterial"
                        value={nomeMaterial}
                        onChange={(evento) =>
                            setNomeMaterial(evento.target.value)
                        }
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
                    <InputDinheiro
                        id="precoUnitario"
                        campo={preco}
                        setter={setPreco}
                        valorPadrao={material?.precoUnitario}
                    />
                </div>
            </div>
            <div className={style.Botoes}>
                <Link to={"../materiais"}>
                    <BotaoCancelar />
                </Link>
                <BotaoLimpar onClick={limparCampos} />
                <BotaoSalvar />
                <div onClick={excluirMaterial}>
                    <BotaoExcluir />
                </div>
            </div>
        </form>
    );
}
