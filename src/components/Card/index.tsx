import style from "./Card.module.scss";

export default function Card(){

    const cards = [{
        data:"02/02/2023",
        numeroPedido: "0000001",
        nomeCliente: "Noemi Martins Campos",
        valor: "R$ 180,00",
        status: "A produzir"
    },{
        data:"03/02/2023",
        numeroPedido: "0000002",
        nomeCliente: "Renata de Souza Martins Campos",
        valor: "R$ 200,00",
        status: "Produzido"
    },{
        data:"01/02/2023",
        numeroPedido: "0000003",
        nomeCliente: "Bruno Martins Campos",
        valor: "R$ 200,00",
        status: "Entregue"
    }];

    return(
        <>
            {cards.map(item =>(
                <div key={item.numeroPedido} className={style.Card}>
                    <p className={style.Card__Data}>{item.data}</p>
                    <p className={style.Card__Pedido}>Pedido Nº {item.numeroPedido}</p>
                    <p className={style.Card__Cliente}>Cliente: {item.nomeCliente}</p>
                    <p className={style.Card__Valor}>Valor: {item.valor}</p>
                    <p className={style.Card__Status}>Status: {item.status}</p>
                </div>
            ))}
        </>
    );
}