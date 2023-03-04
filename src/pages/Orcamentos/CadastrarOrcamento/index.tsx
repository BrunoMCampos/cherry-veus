import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import CardMaterialOrcamento from "components/CardMaterialOrcamento";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DadosCompletosItemOrcamento } from "types/DadosCompletosItemOrcamento";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";
import { IPageable } from "types/IPageable";

import style from "pages/Orcamentos/Orcamentos.module.scss";

export default function CadastrarOrcamento() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigoOrcamento, setCodigoOrcamento] = useState(0);
    const [itensOrcamento, setItensOrcamento] =
        useState<DadosCompletosItemOrcamento[]>();

    useEffect(() => {
        instanciaAxios
            .get<DadosListagemGeralOrcamento>(`orcamentos/${parametros.codigo}`)
            .then((resposta) => {
                setNomeVeu(resposta.data.nomeVeu);
                setCodigoOrcamento(resposta.data.codigoOrcamento);
            });
        instanciaAxios
            .get<IPageable<DadosCompletosItemOrcamento>>(
                `orcamentos/${parametros.codigo}/itens-orcamento`
            )
            .then((resposta) => {
                setItensOrcamento(resposta.data.content);
            });
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        instanciaAxios
            .post("veus", {
                nome: nomeVeu,
            })
            .then(() => {
                alert("Dados cadastrados com sucesso");
                navigate("../veus");
            });
    };

    return (
        <form className={style.FormCadastro} onSubmit={aoSubmeterForm}>
            <div className={style.FormCadastro__Dados}>
                <div className={style.FormCadastro__Dados__Item}>
                    <label htmlFor="veu">Véu:</label>
                    <Input
                        disabled
                        id="veu"
                        value={nomeVeu}
                        onChange={(evento) => setNomeVeu(evento.target.value)}
                    />
                    <Link
                        to={`/orcamentos/novo/${codigoOrcamento}/selecionar-veu`}
                    >
                        <BotaoPesquisar>Alterar Véu</BotaoPesquisar>
                    </Link>
                    <Link
                        to={`/orcamentos/novo/${codigoOrcamento}/selecionar-material`}
                    >
                        <BotaoAdicionar>Adicionar Material</BotaoAdicionar>
                    </Link>
                </div>
                <div className={style.FormCadastro__Dados__Cards}>
                    {itensOrcamento?.map((item) => (
                        <CardMaterialOrcamento
                            dadosItemOrcamento={item}
                            key={item.codigoItemOrcamento}
                        />
                    ))}
                </div>
            </div>
            <div className={style.FrameDeBotoes}>
                <Link to={"../orcamentos"}>
                    <BotaoCancelar />
                </Link>
                <BotaoSalvar />
            </div>
        </form>
    );
}
