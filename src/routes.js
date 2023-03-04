import PaginaPadrao from "components/PaginaPadrao";
import Inicio from "pages/Inicio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultaDeVeus from "pages/Veus/ConsultaDeVeus";
import ConsultaDeMateriais from "pages/Materiais/ConsultaDeMateriais";
import CadastrarVeu from "pages/Veus/CadastrarVeu";
import CadastrarMaterial from "pages/Materiais/CadastrarMaterial";
import EditarVeu from "pages/Veus/EditarVeu";
import ExcluirVeu from "pages/Veus/ExcluirVeu";
import EditarMaterial from "pages/Materiais/EditarMaterial";
import ExcluirMaterial from "pages/Materiais/ExcluirMaterial";
import ConsultaDeOrcamentos from "pages/Orcamentos/ConsultarOrcamentos/ConsultaDeOrcamentos";
import CadastrarOrcamento from "pages/Orcamentos/CadastrarOrcamento";
import SelecionarVeuParaOrcamento from "pages/Orcamentos/SelecionarVeuParaOrcamento";
import SelecionarMaterialOrcamento from "pages/Orcamentos/SelecionarMaterialOrcamento";
import AdicionarMaterialOrcamento from "pages/Orcamentos/AdicionarMaterialOrcamento";

export default function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />}>
                    <Route index element={<Inicio />} />
                    <Route path="orcamentos" element={<ConsultaDeOrcamentos />}/>  
                    <Route path="orcamentos/novo/:codigo" element={<CadastrarOrcamento />}/>  
                    <Route path="orcamentos/editar/:codigo" element={<CadastrarOrcamento />}/>  
                    <Route path="orcamentos/novo/selecionar-veu" element={<SelecionarVeuParaOrcamento />}/>  
                    <Route path="orcamentos/novo/:codigo/selecionar-veu" element={<SelecionarVeuParaOrcamento />}/>  
                    <Route path="orcamentos/novo/:codigo/selecionar-material" element={<SelecionarMaterialOrcamento />}/>  
                    <Route path="orcamentos/novo/:codigoOrcamento/adicionar-material/:codigoMaterial" element={<AdicionarMaterialOrcamento />}/>  
                    <Route path="orcamentos/novo/:codigoOrcamento/editar-material/:codigoMaterial" element={<AdicionarMaterialOrcamento />}/>  
                    <Route path="orcamentos/novo/:codigo/selecionar-material/:pesquisa" element={<SelecionarMaterialOrcamento />}/>  
                    <Route path="orcamentos/novo/selecionar-veu/:pesquisa" element={<SelecionarVeuParaOrcamento />}/>  
                    <Route path="veus" element={<ConsultaDeVeus />}/>
                    <Route path="veus/:pesquisa" element={<ConsultaDeVeus />}/>
                    <Route path="veus/editar/:codigo" element={<EditarVeu />}/>
                    <Route path="veus/excluir/:codigo" element={<ExcluirVeu />}/>
                    <Route path="veus/cadastrar-veu" element={<CadastrarVeu />}/>
                    <Route path="materiais" element={<ConsultaDeMateriais />}/>
                    <Route path="materiais/editar/:codigo" element={<EditarMaterial />}/>
                    <Route path="materiais/excluir/:codigo" element={<ExcluirMaterial />}/>
                    <Route path="materiais/:pesquisa" element={<ConsultaDeMateriais />}/>
                    <Route path="materiais/novo-material" element={<CadastrarMaterial />}/>
                </Route>
            </Routes>
        </Router>
    );
}