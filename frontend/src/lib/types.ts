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

export type Comentario = {
    id: string;
    pedido_id: string;
    autor: string;
    mensagem: string;
    data: Date;
}