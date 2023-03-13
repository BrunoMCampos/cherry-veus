import style from "./BarraDePesquisa.module.scss";
import BotaoPesquisar from "components/Botoes/BotaoPesquisar";
import Input from "components/Input";
import { useState } from "react";
import { SetterOrUpdater } from "recoil";
import { IPageable } from "types/IPageable";
import instanciaAxios from "InstanciaAxios/instanciaAxios";

export default function BarraDePesquisa<T>({
    setterRecoil,
    entidade,
}: {
    setterRecoil: SetterOrUpdater<IPageable<T>>;
    entidade: string;
}) {
    const [pesquisa, setPesquisa] = useState("");

    const submeterForm = (evento?: React.FormEvent<HTMLFormElement>) => {
        evento?.preventDefault();
        instanciaAxios
            .get<IPageable<T>>(`${entidade}?pesquisa=${encodeURI(pesquisa.replace(",","."))}`)
            .then((resposta) => {
                setterRecoil(resposta.data);
            });
    };

    return (
        <form className={style.BarraDePesquisa} onSubmit={submeterForm}>
            <Input
                placeHolder="Dados da Pesquisa"
                id="BarraDePesquisa"
                value={pesquisa}
                onChange={(evento) => setPesquisa(evento.target.value)}
            />
            <div onClick={() => submeterForm()}>
                <BotaoPesquisar />
            </div>
        </form>
    );
}
