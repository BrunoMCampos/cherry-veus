import style from "./MenuDireito.module.scss";

function MenuDireito(){
    const dados = {
        vendasDoMes: "100",
        clientesDoMes: "10",
        faturamentoDoMes: "R$ 1.000,00",
        orcamentosDoMes: "10"
    };

    const dadosUsuario = {
        nome: "Bruno",
        urlFoto: "bruno.jpg"
    };

    const mensagem = "Orçamentos";

    return(
        <div className={style.MenuLateralDireito}>
            <div className={style.DadosUsuario}>
                <h2>{mensagem}</h2>
                <a href="##"><img src={require("../../imgs/usuarios/" + dadosUsuario.urlFoto)} alt="Foto" className={style.ImagemUsuario} /></a>
            </div>
            <div className={style.DadosDoSistema}>
                <div className={style.TextosDoSistema}>
                    <p className={style.TextosTitulosDoSistema}>Vendas do mês</p>
                    <span> {dados.vendasDoMes} </span>
                </div>
                <div className={style.TextosDoSistema}>
                    <p className={style.TextosTitulosDoSistema}>Clientes do mês</p>
                    <span> {dados.clientesDoMes} </span>
                </div>
                <div className={style.TextosDoSistema}>
                    <p className={style.TextosTitulosDoSistema}>Faturamento do mês</p>
                    <span> {dados.faturamentoDoMes} </span>
                </div>
                <div className={style.TextosDoSistema}>
                    <p className={style.TextosTitulosDoSistema}>Orçamentos do mês</p>
                    <span> {dados.orcamentosDoMes} </span>
                </div>
            </div>
        </div>
    );
}

export default MenuDireito;