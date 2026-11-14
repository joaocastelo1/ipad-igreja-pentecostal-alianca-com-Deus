import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "domingo",
    day: "Domingo",
    title: "Culto de Celebração",
    time: "Horário a confirmar",
    description:
      "Um tempo de adoração, Palavra e comunhão para toda a família.",
    location: "IPAD — São Bernardo/MA",
    highlighted: true,
  },
  {
    id: "quarta",
    day: "Quarta-feira",
    title: "Culto de Oração e Palavra",
    time: "Horário a confirmar",
    description:
      "Uma noite para buscar a presença de Deus, interceder e aprender na Palavra.",
    location: "IPAD — São Bernardo/MA",
  },
  {
    id: "sexta",
    day: "Sexta-feira",
    title: "Culto e Programação Especial",
    time: "Horário a confirmar",
    description:
      "Programações especiais, encontros e momentos de edificação para a igreja.",
    location: "IPAD — São Bernardo/MA",
  },
];

export const scheduleNote =
  "Os horários e a programação podem ser confirmados diretamente com a igreja pelo WhatsApp.";

export const visitorNote =
  "Se for a sua primeira visita, chegue alguns minutos antes. Teremos alegria em receber você e sua família.";
