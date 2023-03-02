import axios from "axios";
import BarraDePesquisa from "components/BarraDePesquisa";
import BotaoAdicionar from "components/Botoes/BotaoAdicionar";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import TabelaListagemVeus from "components/Tabelas/Tabelas/TabelaListagemVeus";
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

    let url:string;

    useEffect(() => {
        if(parametros.pesquisa == null){
            url = "http://localhost:8080/veus?";
        } else {
            url = `http://localhost:8080/veus?pesquisa=${parametros.pesquisa}&`;
        }

        axios
            .get<IPageable<DadosLinhaTabelaVeu>>(url)
            .then((resposta) => {
                setVeus(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`${url}page=${resposta.data.number+1}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`${url}page=${resposta.data.number-1}`);
                } else{
                    setPaginaAnterior("");
                }
            });
    }, [parametros]);

    const proximaPg = () => {
        if(parametros.pesquisa == null){
            url = "http://localhost:8080/veus?";
        } else {
            url = `http://localhost:8080/veus?pesquisa=${parametros.pesquisa}&`;
        }
        axios
            .get<IPageable<DadosLinhaTabelaVeu>>(proximaPagina)
            .then((resposta) => {
                setVeus(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`${url}page=${resposta.data.number+1}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`${url}page=${resposta.data.number-1}`);
                } else{
                    setPaginaAnterior("");
                }
            });
    };

    const pgAnterior = () => {
        if(parametros.pesquisa == null){
            url = "http://localhost:8080/veus?";
        } else {
            url = `http://localhost:8080/veus?pesquisa=${parametros.pesquisa}&`;
        }
        axios
            .get<IPageable<DadosLinhaTabelaVeu>>(paginaAnterior)
            .then((resposta) => {
                setVeus(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`${url}page=${resposta.data.number+1}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`${url}page=${resposta.data.number-1}`);
                } else {
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