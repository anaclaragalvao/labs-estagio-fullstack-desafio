export type pedidoStatus = 'aberto' | 'em_andamento' | 'concluido';
export type pedidoPrioridade = 'baixa' | 'media' | 'alta';

export type Pedido = {
    id: string;
    titulo: string;
    descricao: string;
    status: pedidoStatus;
    prioridade: pedidoPrioridade;
    data_criacao: Date;
}