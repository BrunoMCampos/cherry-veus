import BotaoCancelar from "components/Botoes/BotaoCancelar";
import BotaoLimpar from "components/Botoes/BotaoLimpar";
import BotaoSalvar from "components/Botoes/BotaoSalvar";
import Input from "components/Input";
import style from "pages/Materiais/Materiais.module.scss";

export default function CadastrarMaterial(){
    return(
        <>
            <h2>Cadastrar Material</h2>
            <form className={style.FormCadastro}>
                <div className={style.Dados}>
                    <div>
                        <label htmlFor="nomeMaterial">Nome do Material:</label>
                        <Input id="nomeMaterial"/>
                    </div>
                    <div>
                        <label htmlFor="precoUnitario">Preço Unitário:</label>
                        <Input id="precoUnitario"/>
                    </div>
                    <div>
                        <label htmlFor="unidadePadrao">Unidade Padrão:</label>
                        <Input id="unidadePadrao"/>
                    </div>
                </div>
                <div className={style.Botoes}>
                    <BotaoCancelar/>
                    <BotaoLimpar />
                    <BotaoSalvar/>
                </div>
            </form>
        </>
    );
}