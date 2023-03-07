import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import TabelaListagemOrcamentos from "components/Tabelas/Tabelas/TabelaListagemOrcamentos";
import { Link, useParams } from "react-router-dom";

import style from "pages/Orcamentos/Orcamentos.module.scss";
import { useEffect, useState } from "react";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import { IPageable } from "types/IPageable";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import { DadosListagemGeralOrcamento } from "types/DadosListagemGeralOrcamento";

export default function ConsultaDeOrcamentos() {

    const parametros = useParams();

    const [orcamentos, setOrcamentos] = useState<DadosListagemGeralOrcamento[]>();
    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    useEffect(() => {
        if(parametros.pesquisa == null){
            navegar("orcamentos");
        } else {
            navegar(`orcamentos?pesquisa=${parametros.pesquisa}`);
        }
    }, [parametros]);

    const proximaPg = () => {
        navegar(proximaPagina);
    };

    const pgAnterior = () => {
        navegar(paginaAnterior);
    };

    const navegar = (destino:string) => {
        let pesquisa:string;
        if(parametros.pesquisa == null){
            pesquisa = "";
        } else{
            pesquisa = parametros.pesquisa;
        }
        instanciaAxios
            .get<IPageable<DadosListagemGeralOrcamento>>(destino)
            .then((resposta) => {
                setOrcamentos(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`orcamentos?pesquisa=${pesquisa}&page=${resposta.data.number+1}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`orcamentos?pesquisa=${pesquisa}&page=${resposta.data.number-1}`);
                } else{
                    setPaginaAnterior("");
                }
            });
    };

    return (
        <> 
            <div className="FrameDePesquisa">
                <BarraDePesquisa destino="orcamentos/"/>
                <Link to="novo/selecionar-veu">
                    <BotaoAdicionar >
                        Novo Orcamento
                    </BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaListagemOrcamentos orcamentos={orcamentos}/>
                <div className={style.FrameDeBotoes}>
                    {paginaAnterior!="" && 
                        <div onClick={pgAnterior}>
                            <BotaoPaginaAnterior disabled={false}/>
                        </div>
                    ||
                        <div>
                            <BotaoPaginaAnterior disabled={true}/>
                        </div>
                    }
                    {proximaPagina!="" && 
                        <div onClick={proximaPg}>
                            <BotaoProximaPagina disabled={false}/>
                        </div>
                    ||
                        <div>
                            <BotaoProximaPagina disabled={true}/>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}