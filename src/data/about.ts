import type { MissionPillar, TimelineStep } from "@/types";

export const history = {
  eyebrow: "Nossa história",
  title: "Uma história que começou pela fé",
  lead: "Antes de existir uma estrutura, existia um chamado. E foi respondendo a esse chamado que tudo começou.",
  paragraphs: [
    "Os pastores Pedro e Simone eram missionários quando receberam o chamado para iniciar este ministério.",
    "Sem grandes recursos materiais, decidiram obedecer ao chamado de Deus e iniciar essa caminhada confiando na fé, na oração e na provisão divina.",
    "O ministério nasceu com um propósito profundo: viver a Palavra, buscar a presença do Espírito Santo, anunciar o Evangelho e servir vidas.",
    "Hoje, a Igreja Pentecostal Aliança com Deus reúne famílias em São Bernardo, Maranhão, e segue firme na convicção que marcou o seu início: ser uma igreja alinhada com Deus, orando, adorando e evangelizando.",
  ],
  quote:
    "Uma igreja não é feita apenas de paredes, mas de vidas que dizem sim a Deus.",
} as const;

export const timeline: TimelineStep[] = [
  {
    step: "01",
    title: "Chamado",
    description:
      "Missionários, Pedro e Simone receberam o chamado para iniciar um novo ministério.",
  },
  {
    step: "02",
    title: "Fé",
    description:
      "Sem grandes recursos, a certeza de que Deus proveria tudo o que fosse necessário.",
  },
  {
    step: "03",
    title: "Obediência",
    description:
      "Um passo de confiança: dizer sim a Deus e começar a caminhada.",
  },
  {
    step: "04",
    title: "Evangelismo",
    description:
      "O compromisso de anunciar Jesus a cada pessoa e a cada família.",
  },
  {
    step: "05",
    title: "Missões",
    description:
      "Levar a mensagem de Cristo além das paredes da igreja local.",
  },
  {
    step: "06",
    title: "Crescimento",
    description:
      "Uma história que continua sendo escrita pela graça e pelo cuidado de Deus.",
  },
];

export const missionPillars: MissionPillar[] = [
  {
    icon: "prayer",
    title: "Oração",
    description:
      "Buscar a Deus através da oração e da intercessão, colocando cada vida diante do Pai.",
  },
  {
    icon: "word",
    title: "Palavra",
    description:
      "Ensinar e viver os princípios da Palavra de Deus com fidelidade e clareza.",
  },
  {
    icon: "fire",
    title: "Espírito Santo",
    description:
      "Buscar a presença e a atuação do Espírito Santo em cada área da igreja.",
  },
  {
    icon: "evangelism",
    title: "Evangelismo",
    description:
      "Anunciar o Evangelho e alcançar vidas com o amor de Jesus Cristo.",
  },
  {
    icon: "missions",
    title: "Missões",
    description:
      "Levar a mensagem de Cristo para além da igreja local, alcançando novas vidas.",
  },
  {
    icon: "family",
    title: "Famílias",
    description:
      "Orar pela restauração e pelo fortalecimento das famílias, acreditando na transformação de vidas.",
  },
];

export const values = [
  {
    title: "Cristo no centro",
    description:
      "Toda a nossa caminhada encontra sentido em Jesus Cristo, Senhor e Salvador.",
  },
  {
    title: "Palavra e oração",
    description:
      "A Bíblia orienta os nossos passos; a oração sustenta a nossa caminhada.",
  },
  {
    title: "Acolhimento",
    description:
      "Cada pessoa é recebida com respeito, cuidado e amor, como parte da família.",
  },
  {
    title: "Serviço",
    description:
      "Servir a Deus, à igreja e à comunidade com humildade, compromisso e excelência.",
  },
] as const;
