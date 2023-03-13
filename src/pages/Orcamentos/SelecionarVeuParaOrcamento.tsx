import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotoesPaginacao from "components/Botoes/BotoesPaginacao";
import TabelaConfirmacao from "components/Tabelas/TabelaConfirmacao";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listaDeVeusState } from "state/atom";
import { useAlterarOrcamento } from "state/hooks/orcamentos/useAlterarOrcamento";
import { IOrcamento } from "types/IOrcamento";

export default function SelecionarVeuParaOrcamento() {
    const parametros = useParams();

    const navegar = useNavigate();

    const veus = useRecoilValue(listaDeVeusState);
    const setVeus = useSetRecoilState(listaDeVeusState);

    const alterarOrcamento = useAlterarOrcamento();

    function aoSelecionarVeu(key: number) {
        if (parametros.codigoOrcamento) {
            alterarOrcamento({
                codigoOrcamento: parseInt(parametros.codigoOrcamento),
                codigoVeu: key,
            }).then(() => {
                navegar(`../orcamentos/detalhar/${parametros.codigoOrcamento}`);
            });
        } else {
            instanciaAxios
                .post<IOrcamento>("orcamentos", {
                    codigoVeu: key,
                })
                .then((resposta) => {
                    navegar(
                        `../orcamentos/detalhar/${resposta.data.codigoOrcamento}`
                    );
                });
        }
    }

    return (
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa entidade="veus" setterRecoil={setVeus} />
                <Link
                    to={
                        parametros.codigoOrcamento
                            ? `../orcamentos/detalhar/${parametros.codigoOrcamento}`
                            : "../orcamentos"
                    }
                >
                    <BotaoPaginaAnterior disabled={false}>
                        Voltar
                    </BotaoPaginaAnterior>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaConfirmacao
                    dados={veus.content}
                    getPrimaryKeyFromLine={(linha) => linha.codigoVeu}
                    tituloTabela="Selecionar Véu a ser Orçado"
                    colunas={[
                        {
                            cabecalho: "Codigo",
                            elemento: (linha) => linha.codigoVeu,
                        },
                        {
                            cabecalho: "Nome do Véu",
                            elemento: (linha) => linha.nome,
                        },
                    ]}
                    funcaoAoConfirmar={aoSelecionarVeu}
                />
                <BotoesPaginacao listaRecoil={veus} setterRecoil={setVeus} />
            </div>
        </>
    );
}
