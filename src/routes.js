import PaginaPadrao from "components/PaginaPadrao";
import Inicio from "pages/Inicio";
import CadastrarMaterial from "pages/Materiais/CadastrarMaterial";
import ConsultarMaterial from "pages/Materiais/ConsultarMaterial";
import DetalharMaterial from "pages/Materiais/DetalharMaterial";
import AdicionarMaterialOrcamento from "pages/Orcamentos/AdicionarMaterialOrcamento";
import ConsultarOrcamentos from "pages/Orcamentos/ConsultarOrcamentos";
import DetalharOrcamento from "pages/Orcamentos/DetalharOrcamento";
import SelecionarMaterialOrcamento from "pages/Orcamentos/SelecionarMaterialOrcamento";
import SelecionarVeuParaOrcamento from "pages/Orcamentos/SelecionarVeuParaOrcamento";
import CadastrarVeu from "pages/Veus/CadastrarVeu";
import ConsultarVeus from "pages/Veus/ConsultarVeus";
import DetalharVeu from "pages/Veus/DetalharVeu";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function AppRouter(){

    return(
        <Router>
            <Suspense fallback="Carregando">
                <Routes>
                    <Route path="/" element={<PaginaPadrao />}>
                        <Route index element={<Inicio />} />

                        <Route path="orcamentos" element={<ConsultarOrcamentos />}/>  
                        <Route path="orcamentos/:pesquisa" element={<ConsultarOrcamentos />}/>  

                        <Route path="orcamentos/detalhar/:codigoOrcamento" element={<DetalharOrcamento />}/>

                        <Route path="orcamentos/selecionar-veu" element={<SelecionarVeuParaOrcamento />}/>  
                        <Route path="orcamentos/selecionar-veu/:pesquisa" element={<SelecionarVeuParaOrcamento />}/>  
                        <Route path="orcamentos/detalhar/:codigoOrcamento/selecionar-veu" element={<SelecionarVeuParaOrcamento />}/>  
                        <Route path="orcamentos/detalhar/:codigoOrcamento/selecionar-veu/:pesquisa" element={<SelecionarVeuParaOrcamento />}/>  

                        <Route path="orcamentos/detalhar/:codigoOrcamento/selecionar-material" element={<SelecionarMaterialOrcamento />}/>  
                        <Route path="orcamentos/detalhar/:codigoOrcamento/selecionar-material/:pesquisa" element={<SelecionarMaterialOrcamento />}/>  

                        <Route path="orcamentos/detalhar/:codigoOrcamento/dados-material/:codigoItemOrcamento" element={<AdicionarMaterialOrcamento />}/>  

                        <Route path="veus" element={<ConsultarVeus />}/> 
                        <Route path="veus/:pesquisa" element={<ConsultarVeus />}/>
                        <Route path="veus/detalhar/:codigoVeu" element={<DetalharVeu />}/>
                        <Route path="veus/novo" element={<CadastrarVeu />}/>

                        <Route path="materiais" element={<ConsultarMaterial />}/>
                        <Route path="materiais/detalhar/:codigoMaterial" element={<DetalharMaterial />}/>
                        <Route path="materiais/:pesquisa" element={<ConsultarMaterial />}/>
                        <Route path="materiais/novo" element={<CadastrarMaterial />}/>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}