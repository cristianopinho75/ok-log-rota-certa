export const CORPORATE_EMAIL = "adm@oklogtransporte.com.br";

export type CargoType =
  | "Carga Geral"
  | "Carga Fracionada"
  | "Carga Dedicada"
  | "E-commerce / Volumes"
  | "Insumos Industriais";

export const CARGO_TYPES: CargoType[] = [
  "Carga Geral",
  "Carga Fracionada",
  "Carga Dedicada",
  "E-commerce / Volumes",
  "Insumos Industriais",
];

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  details: string;
  highlights: string[];
  sla: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "fracionada",
    title: "Carga Fracionada",
    shortDesc: "Envie lotes menores pagando apenas pelo espaço ocupado, com saídas diárias.",
    details:
      "Consolidamos sua mercadoria com segurança em rotas regulares para os principais polos econômicos, reduzindo custos operacionais sem abrir mão da previsibilidade.",
    highlights: [
      "Coleta programada na porta da sua empresa",
      "Rastreamento por nota fiscal ou código OKL",
      "Seguro rodoviário completo (RCTR-C e RCF-DC)",
    ],
    sla: "Entrega em 24h a 72h nas capitais",
  },
  {
    id: "dedicada",
    title: "Carga Dedicada",
    shortDesc: "Veículo exclusivo para sua operação, com rota direta e zero transbordo.",
    details:
      "Ideal para entregas urgentes, alto valor agregado ou janelas rígidas de recebimento. O veículo segue direto da origem ao destino com monitoramento 24h.",
    highlights: [
      "Agendamento direto na doca de destino",
      "Monitoramento via satélite em tempo real",
      "Relatório digital de comprovação de entrega",
    ],
    sla: "Saída imediata conforme janela contratada",
  },
  {
    id: "armazenagem",
    title: "Armazenagem",
    shortDesc: "Estruturas seguras para estoque, cross-docking e preparação de pedidos.",
    details:
      "Controle de inventário, paletização, separação e expedição integrados ao nosso transporte para encurtar o tempo entre o pedido e a entrega final.",
    highlights: [
      "Operação de cross-docking ágil",
      "Controle de entrada e saída por lote",
      "Área monitorada 24 horas por câmeras",
    ],
    sla: "Expedição no mesmo dia para pedidos até 14h",
  },
  {
    id: "urbana",
    title: "Distribuição Urbana",
    shortDesc: "Frota ágil para entregas em centros comerciais, shoppings e zonas restritas.",
    details:
      "Veículos leves preparados para circular em áreas de restrição urbana, garantindo pontualidade no abastecimento de lojas, escritórios e clientes finais.",
    highlights: [
      "Rotas otimizadas para grandes centros",
      "Veículos homologados para áreas de restrição",
      "Comprovante fotográfico no ato da entrega",
    ],
    sla: "Entregas expressas no mesmo dia (Same Day)",
  },
];

export type FleetCategory = "Utilitário" | "Van" | "VUC";

export interface FleetVehicle {
  category: FleetCategory;
  title: string;
  capacity: string;
  volume: string;
  idealFor: string;
  features: string[];
}

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    category: "Utilitário",
    title: "Fiorino / Utilitário Leve",
    capacity: "Até 650 kg",
    volume: "3,3 m³",
    idealFor: "Entregas expressas, documentos, peças técnicas e volumes compactos em centros urbanos.",
    features: ["Livre circulação em zonas restritas", "Rastreamento GPS 24h", "Coleta expressa em até 2h"],
  },
  {
    category: "Van",
    title: "Van Furgão Executiva",
    capacity: "Até 1.500 kg",
    volume: "11 m³",
    idealFor: "Distribuição urbana, e-commerce B2B, abastecimento de redes varejistas e carga fracionada.",
    features: ["Baú fechado com trava de segurança", "Sensores de porta e telemetria", "Rotas multi-paradas"],
  },
  {
    category: "VUC",
    title: "VUC — Veículo Urbano de Carga",
    capacity: "Até 3.500 kg",
    volume: "22 m³",
    idealFor: "Cargas paletizadas, transferências intermunicipais e abastecimento pesado em áreas urbanas.",
    features: ["Comporta até 6 paletes PBR", "Plataforma elevatória opcional", "Monitoramento dedicado"],
  },
];

export const FLEET_METRICS = [
  { value: "180+", label: "Veículos monitorados 24h" },
  { value: "99,4%", label: "Índice de pontualidade" },
  { value: "27 estados", label: "Cobertura rodoviária nacional" },
];

export interface TrackingStatus {
  code: string;
  status: string;
  nextStop: string;
  updatedAt: string;
  eta: string;
  steps: { label: string; done: boolean }[];
}

const PRESET_TRACKING: Record<string, Omit<TrackingStatus, "code">> = {
  "OKL-8421": {
    status: "Em trânsito",
    nextStop: "São Paulo, SP",
    updatedAt: "Atualizado há 12 min",
    eta: "Previsão de entrega: Hoje, até 17h30",
    steps: [
      { label: "Coleta realizada", done: true },
      { label: "Em transferência rodoviária", done: true },
      { label: "Próxima parada: São Paulo, SP", done: true },
      { label: "Saiu para entrega final", done: false },
    ],
  },
  "OKL-5190": {
    status: "Saiu para entrega",
    nextStop: "Campinas, SP",
    updatedAt: "Atualizado há 5 min",
    eta: "Previsão de entrega: Hoje, até 15h00",
    steps: [
      { label: "Coleta realizada", done: true },
      { label: "Triagem no centro logístico", done: true },
      { label: "Em rota urbana — Campinas, SP", done: true },
      { label: "Entrega em andamento", done: true },
    ],
  },
};

export function lookupTrackingCode(rawCode: string): TrackingStatus {
  const code = rawCode.trim().toUpperCase();
  const preset = PRESET_TRACKING[code];
  if (preset) {
    return { code, ...preset };
  }
  return {
    code,
    status: "Em trânsito",
    nextStop: "São Paulo, SP",
    updatedAt: "Atualizado agora",
    eta: "Previsão de entrega: Amanhã, até 16h00",
    steps: [
      { label: "Pedido recebido pela Ok Log", done: true },
      { label: "Coleta confirmada na origem", done: true },
      { label: "Em trânsito • Próxima parada: São Paulo, SP", done: true },
      { label: "Entrega ao destinatário", done: false },
    ],
  };
}

export interface QuoteEstimate {
  origin: string;
  destination: string;
  cargoType: CargoType;
  weightKg: number;
  estimatedPrice: string;
  estimatedDays: string;
  recommendedVehicle: FleetCategory;
}

export function calculateQuoteEstimate(
  origin: string,
  destination: string,
  cargoType: CargoType,
  weightKg: number,
): QuoteEstimate {
  const baseByType: Record<CargoType, number> = {
    "Carga Geral": 180,
    "Carga Fracionada": 145,
    "Carga Dedicada": 420,
    "E-commerce / Volumes": 130,
    "Insumos Industriais": 260,
  };
  const estimated = Math.round(baseByType[cargoType] + weightKg * 0.85);
  const recommendedVehicle: FleetCategory =
    weightKg <= 650 ? "Utilitário" : weightKg <= 1500 ? "Van" : "VUC";
  const estimatedDays = cargoType === "Carga Dedicada" ? "1 a 2 dias úteis" : "2 a 4 dias úteis";

  return {
    origin: origin.trim(),
    destination: destination.trim(),
    cargoType,
    weightKg,
    estimatedPrice: estimated.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    estimatedDays,
    recommendedVehicle,
  };
}

export const TESTIMONIALS = [
  {
    quote:
      "Reduzimos atrasos na distribuição para nossas filiais em São Paulo e Minas Gerais logo no primeiro mês com a Ok Log.",
    author: "Fernanda Almeida",
    role: "Gerente de Supply Chain • Metalúrgica Atlas",
  },
  {
    quote:
      "A cotação rápida e o acompanhamento claro das entregas deram previsibilidade total para nossa equipe comercial.",
    author: "Ricardo Nogueira",
    role: "Diretor de Operações • Distribuidora Vértice",
  },
  {
    quote:
      "Para cargas dedicadas com janela rígida de doca, a pontualidade e o cuidado dos motoristas fazem toda a diferença.",
    author: "Camila Duarte",
    role: "Coordenadora Logística • FarmaSul Brasil",
  },
];