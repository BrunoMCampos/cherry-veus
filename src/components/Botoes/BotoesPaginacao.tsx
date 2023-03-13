import BotaoPaginaAnterior from "components/Botoes/BotaoPaginaAnterior";
import BotaoProximaPagina from "components/Botoes/BotaoProximaPagina";
import { IPageable } from "types/IPageable";
import { SetterOrUpdater } from "recoil";
import instanciaAxios from "InstanciaAxios/instanciaAxios";
import style from "components/Tabelas/Tabela.module.scss";

export default function BotoesPaginacao<T>({
    listaRecoil,
    setterRecoil,
}: {
    listaRecoil: IPageable<T>;
    setterRecoil: SetterOrUpdater<IPageable<T>>;
}) {

    const clicar = (destino: string) => {
        instanciaAxios.get<IPageable<T>>(destino).then((resposta) => {
            setterRecoil(resposta.data);
        });
    };

    return (
        <div className={style.FrameDeBotoes}>
            {(listaRecoil.previousPage != "" && (
                <BotaoPaginaAnterior
                    disabled={false}
                    onClick={() => clicar(listaRecoil.previousPage)}
                />
            )) || <BotaoPaginaAnterior disabled={true} />}
            {(listaRecoil.nextPage != "" && (
                <BotaoProximaPagina
                    disabled={false}
                    onClick={() => clicar(listaRecoil.nextPage)}
                />
            )) || <BotaoProximaPagina disabled={true} />}
        </div>
    );
}
