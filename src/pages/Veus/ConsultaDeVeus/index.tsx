import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import TabelaListagemVeus from "components/Tabelas/Tabelas/TabelaListagemVeus";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Veus/Veus.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DadosLinhaTabelaVeu } from "types/DadosLinhaTabelaVeu";
import { IPageable } from "types/IPageable";

export default function ConsultaDeVeus(){

    const parametros = useParams();

    const [veus, setVeus] = useState<DadosLinhaTabelaVeu[]>();
    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    useEffect(() => {
        if(parametros.pesquisa == null){
            navegar("veus");
        } else {
            navegar(`veus?pesquisa=${parametros.pesquisa}`);
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
            .get<IPageable<DadosLinhaTabelaVeu>>(destino)
            .then((resposta) => {
                setVeus(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`veus?pesquisa=${pesquisa}&page=${resposta.data.number+1}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`veus?pesquisa=${pesquisa}&page=${resposta.data.number-1}`);
                } else{
                    setPaginaAnterior("");
                }
            });
    };

    return(
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa destino="/veus/"/>
                <Link to="../veus/cadastrar-veu">
                    <BotaoAdicionar>
                        Cadastrar Véu
                    </BotaoAdicionar>
                </Link>
            </div>
            <div className="FrameDeTabela">
                <TabelaListagemVeus veus={veus}/>
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