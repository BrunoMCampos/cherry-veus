import PaginaPadrao from "components/PaginaPadrao";
import Inicio from "pages/Inicio";
import Orcamentos from "pages/Orcamentos/Orcamentos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConsultaDeVeus from "pages/Veus/ConsultaDeVeus";
import ConsultaDeMateriais from "pages/Materiais/ConsultaDeMateriais";
import CadastrarVeu from "pages/Veus/CadastrarVeu";
import CadastrarMaterial from "pages/Materiais/CadastrarMaterial";
import EditarVeu from "pages/Veus/EditarVeu";
import ExcluirVeu from "pages/Veus/ExcluirVeu";

export default function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />}>
                    <Route index element={<Inicio />} />
                    <Route path="orcamentos" element={<Orcamentos />}/>  
                    <Route path="veus" element={<ConsultaDeVeus />}/>
                    <Route path="veus/:pesquisa" element={<ConsultaDeVeus />}/>
                    <Route path="veus/editar/:codigo" element={<EditarVeu />}/>
                    <Route path="veus/excluir/:codigo" element={<ExcluirVeu />}/>
                    <Route path="veus/cadastrar-veu" element={<CadastrarVeu />}/>
                    <Route path="materiais" element={<ConsultaDeMateriais />}/>
                    <Route path="materiais/novo-material" element={<CadastrarMaterial />}/>
                </Route>
            </Routes>
        </Router>
    );
}