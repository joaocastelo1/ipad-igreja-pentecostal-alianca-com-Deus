import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description:
    "Saiba como a Igreja Pentecostal Aliança com Deus trata os dados pessoais enviados pelo site, incluindo pedidos de oração e informações de contato.",
  path: "/politica-de-privacidade",
});

const updatedAt = "14 de novembro de 2026";

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Privacidade"
        currentPage="Política de Privacidade"
        title={
          <>
            Seus dados tratados com{" "}
            <span className="gold-text italic">respeito</span>
          </>
        }
        description="Esta política explica, de forma simples, quais dados o site pode coletar, para que são usados e quais são os seus direitos."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="surface rounded-2xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                    <LockKeyhole className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                    Última atualização
                  </p>
                  <p className="mt-1.5 text-sm text-cream">{updatedAt}</p>
                  <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-relaxed text-mist">
                    Em caso de dúvidas sobre esta política ou sobre os seus
                    dados, fale com a igreja.
                  </p>
                  <a
                    href={getWhatsAppLink(
                      "Olá! Tenho uma dúvida sobre a Política de Privacidade do site da igreja.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm mt-4 w-full"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Falar conosco
                  </a>
                  <Link
                    href="/"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-mist/60 transition-colors hover:text-gold-300"
                  >
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    Voltar ao início
                  </Link>
                </div>
              </Reveal>
            </aside>

            <Reveal delay={80} className="prose-church max-w-3xl">
              <p>
                A Igreja Pentecostal Aliança com Deus — IPAD respeita a
                privacidade das pessoas que visitam este site. Esta política
                descreve quais informações podem ser coletadas, a finalidade do
                tratamento e as medidas adotadas para protegê-las.
              </p>

              <h2>1. Quais dados coletamos</h2>
              <p>
                O site coleta apenas as informações necessárias para atender
                você e exercer a atividade pastoral da igreja:
              </p>
              <div className="not-prose my-6 overflow-hidden rounded-xl border border-white/[0.08]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-gold-300">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Dado
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Finalidade
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] text-mist">
                    <tr>
                      <td className="px-4 py-3 align-top text-cream">Nome</td>
                      <td className="px-4 py-3">
                        Identificar quem enviou o pedido de oração e permitir o
                        retorno, quando solicitado.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 align-top text-cream">
                        WhatsApp (opcional)
                      </td>
                      <td className="px-4 py-3">
                        Entrar em contato somente quando a pessoa autoriza no
                        formulário.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 align-top text-cream">
                        Pedido de oração
                      </td>
                      <td className="px-4 py-3">
                        Receber, registrar e interceder pelo pedido junto à
                        equipe pastoral.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 align-top text-cream">
                        Dados técnicos de segurança
                      </td>
                      <td className="px-4 py-3">
                        Prevenir spam, abusos e acessos indevidos ao
                        formulário, como registros de data e hora.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Não solicitamos documentos, dados financeiros ou informações
                sensíveis além daquilo que você escolher compartilhar
                livremente no texto do pedido. Recomendamos evitar detalhes
                desnecessários.
              </p>

              <h2>2. Como utilizamos os dados</h2>
              <ul>
                <li>Receber e organizar os pedidos de oração enviados;</li>
                <li>
                  Orar e prestar atendimento pastoral, quando houver autorização
                  para contato;
                </li>
                <li>
                  Manter a segurança do site e prevenir envios automatizados ou
                  abusivos;
                </li>
                <li>Cumprir obrigações legais aplicáveis.</li>
              </ul>
              <p>
                Seus dados não são vendidos, alugados ou utilizados para
                publicidade. Os pedidos de oração não são exibidos
                publicamente.
              </p>

              <h2>3. Base legal e consentimento</h2>
              <p>
                O tratamento ocorre com base no consentimento fornecido ao
                enviar o formulário e no legítimo interesse da igreja em
                realizar seu atendimento pastoral e manter a segurança do site.
                O contato por WhatsApp só acontece se você marcar a opção
                correspondente.
              </p>

              <h2>4. Compartilhamento</h2>
              <p>
                Os dados podem ser processados por provedores de infraestrutura
                necessários ao funcionamento do site, como serviços de
                hospedagem e banco de dados, sempre limitados à finalidade de
                armazenar e proteger as informações. Não compartilhamos dados
                com terceiros para fins comerciais.
              </p>

              <h2>5. Armazenamento e prazo</h2>
              <p>
                Os pedidos são mantidos apenas pelo tempo necessário ao
                atendimento pastoral e ao cumprimento de obrigações legais.
                Posteriormente, podem ser excluídos ou anonimizados. Você pode
                solicitar a exclusão dos seus dados a qualquer momento.
              </p>

              <h2>6. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger as
                informações, incluindo restrição de acesso à área
                administrativa, validação dos dados recebidos e controle de
                envios abusivos. Nenhum sistema é completamente imune a
                incidentes, mas trabalhamos para reduzir riscos.
              </p>

              <h2>7. Cookies</h2>
              <p>
                O site não utiliza cookies de publicidade ou rastreamento. O
                armazenamento local pode ser usado apenas para funcionamento
                técnico e, na área administrativa, para manter a sessão de
                acesso da equipe autorizada.
              </p>

              <h2>8. Seus direitos</h2>
              <p>
                Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode
                solicitar a confirmação do tratamento, o acesso, a correção, a
                anonimização ou a exclusão dos seus dados, além de revogar o
                consentimento. Para exercer esses direitos, entre em contato
                pelo WhatsApp informado nesta página.
              </p>

              <h2>9. Links externos</h2>
              <p>
                O site pode conter links para WhatsApp, Instagram, Google Maps
                e outras plataformas. O uso desses serviços está sujeito às
                políticas de privacidade dos respectivos fornecedores.
              </p>

              <h2>10. Alterações</h2>
              <p>
                Esta política pode ser atualizada para refletir mudanças no
                site ou na legislação. A data de última atualização será sempre
                indicada nesta página.
              </p>

              <h2>11. Contato</h2>
              <p>
                Em caso de dúvidas ou solicitações relacionadas aos seus dados,
                fale com a Igreja Pentecostal Aliança com Deus pelo WhatsApp{" "}
                <a
                  href={getWhatsAppLink(
                    "Olá! Gostaria de falar sobre a Política de Privacidade e meus dados.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clicando aqui
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
