export interface IOrcamento{
    codigoOrcamento: number,
    nomeVeu?: string,
    codigoVeu:number,
    percentualLucro?: number,
    custoTotal?: number,
    precoVenda?: number,
    dataDeCriacao?: string,
    custoMaoDeObra?:number,
    custoDespesas?:number,
    percentualImposto?:number
}