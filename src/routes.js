import NovoOrcamento from "pages/NovoOrcamento";
import PaginaPadrao from "components/PaginaPadrao";
import Inicio from "pages/Inicio";
import Orcamentos from "pages/Orcamentos/Orcamentos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelecionarVeu from "pages/SelecionarVeu";

export default function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />}>
                    <Route index element={<Inicio />} />
                    <Route path="orcamentos" element={<Orcamentos />}/>  
                    <Route path="orcamentos/novo-orcamento" element={<NovoOrcamento />}/>
                    <Route path="orcamentos/novo-orcamento/selecionar-veu" element={<SelecionarVeu />}/>
                </Route>
            </Routes>
        </Router>
    );
}