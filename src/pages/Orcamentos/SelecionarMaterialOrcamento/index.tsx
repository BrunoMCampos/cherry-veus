import BarraDePesquisa from "components/BarraDePesquisa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageable } from "types/IPageable";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "pages/Materiais/Materiais.module.scss";
import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import { DadosCompletosMaterial } from "types/DadosCompletosMaterial";
import TabelaSelecionarMaterialOrcamento from "components/Tabelas/Tabelas/TabelaSelecionarMaterialOrcamento";

export default function SelecionarMaterialOrcamento(){

    const parametros = useParams();

    const [materiais, setMateriais] = useState<DadosCompletosMaterial[]>();
    const [proximaPagina, setProximaPagina] = useState("");
    const [paginaAnterior, setPaginaAnterior] = useState("");

    useEffect(() => {
        if(parametros.pesquisa == null){
            navegar(`materiais?pesquisa=&codigoOrcamento=${parametros.codigo}`);
        } else {
            navegar(`materiais?pesquisa=${parametros.pesquisa}&codigoOrcamento=${parametros.codigo}`);
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
            .get<IPageable<DadosCompletosMaterial>>(destino)
            .then((resposta) => {
                setMateriais(resposta.data.content);
                if(resposta.data.last == false){
                    setProximaPagina(`materiais?pesquisa=${pesquisa}&page=${resposta.data.number+1}&codigoOrcamento=${parametros.codigo}`);
                } else {
                    setProximaPagina("");
                }
                if(resposta.data.first == false){
                    setPaginaAnterior(`materiais?pesquisa=${pesquisa}&page=${resposta.data.number-1}&codigoOrcamento=${parametros.codigo}`);
                } else{
                    setPaginaAnterior("");
                }
            });
    };

    return(
        <>
            <div className="FrameDePesquisa">
                <BarraDePesquisa destino={`/orcamentos/novo/${parametros.codigo}/selecionar-material/`}/>
            </div>
            <div className="FrameDeTabela">
                <TabelaSelecionarMaterialOrcamento materiais={materiais}/>
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