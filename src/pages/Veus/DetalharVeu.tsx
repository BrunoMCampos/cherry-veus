import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IVeu } from "types/IVeu";
import style from "pages/Veus/Veus.module.scss";
import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import BotaoExcluir from "components/Botoes/BotaoExcluir";
import { useDeletarVeu } from "state/hooks/veus/useDeletarVeu";
import { useAlterarVeu } from "state/hooks/veus/useAlterarVeu";

export default function DetalharVeu() {
    const navigate = useNavigate();

    const parametros = useParams();

    const [nomeVeu, setNomeVeu] = useState("");
    const [codigoVeu, setCodigoVeu] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [totalVendido, setTotalVendido] = useState(0);

    const [veu, setVeu] = useState<IVeu>();

    const deletarVeu = useDeletarVeu();
    const alterarVeu = useAlterarVeu();

    useEffect(() => {
        instanciaAxios
            .get<IVeu>(`veus/${parametros.codigoVeu}`)
            .then((resposta) => {
                setCodigoVeu(resposta.data.codigoVeu);
                setNomeVeu(resposta.data.nome);
                setDataCadastro(resposta.data.dataCadastro);
                setTotalVendido(resposta.data.totalVendido);
                setVeu(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        alterarVeu({
            codigoVeu: codigoVeu,
            dataCadastro: dataCadastro,
            nome: nomeVeu,
            totalVendido: totalVendido,
        }).then(() => {
            navigate("../veus");
        });
    };

    const limparCampos = () => {
        if (!veu) {
            setCodigoVeu(0);
            setNomeVeu("");
            setDataCadastro("");
            setTotalVendido(0);
        } else {
            setCodigoVeu(veu.codigoVeu);
            setNomeVeu(veu.nome);
            setDataCadastro(veu.dataCadastro);
            setTotalVendido(veu.totalVendido);
        }
    };

    const excluirVeu = () => {
        if (confirm(`Deseja realmente excluir o item ${nomeVeu}?`)) {
            if (veu) {
                deletarVeu(veu).then(() => navigate("../veus"));
            } else {
                alert("Erro ao excluir véu!");
                console.log("Véu inexistente: " + veu);
            }
        }
    };

    return (
        <form className={style.Form} onSubmit={aoSubmeterForm}>
            <div className={style.Dados}>
                <div className={style.Dados__Item}>
                    <label htmlFor="codigoVeu">Código:</label>
                    <Input
                        id="codigoVeu"
                        value={codigoVeu.toString()}
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
                <BotaoLimpar onClick={limparCampos} />
                <BotaoSalvar />
                <div onClick={excluirVeu}>
                    <BotaoExcluir />
                </div>
            </div>
        </form>
    );
}
