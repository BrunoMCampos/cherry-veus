import BarraDePesquisa from "components/BarraDePesquisa";
import Tabela from "components/Tabela";

export default function SelecionarVeuParaOrcamento(){
    
    const cabecalho = ["Código","Nome do Véu","Opções"];

    const dados = [{
        codigo: "001",
        nomeVeu: "Veu de Teste"
    }];

    const icones = ["Selecionar"];

    return(
        <div>
            <BarraDePesquisa />
            <div>
                <Tabela cabecalho={cabecalho} dados={dados} icones={icones}/>
            </div>
        </div>
    );
}