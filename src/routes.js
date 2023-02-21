import PaginaPadrao from "components/PaginaPadrao";
import Inicio from "pages/Inicio";
import Orcamentos from "pages/Orcamentos/Orcamentos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />}>
                    <Route index element={<Inicio />} />
                    <Route path="orcamentos" element={<Orcamentos />}/>
                </Route>
            </Routes>
        </Router>
    );
}