export interface IItemOrcamento{
    codigoMaterial?:number,
    nomeMaterial?: string,
    precoUnitarioMaterial: number,
    codigoOrcamento: number
    perdaPercentual: number,
    perdaMaterial?: number,
    custoPerda?: number,
    quantidadeUtilizada: number,
    custoTotalItem?: number,
    codigoItemOrcamento: number,
    quantidadeUtilizadaComPerda?: number
}