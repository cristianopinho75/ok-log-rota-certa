import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Quote, Truck } from "lucide-react";
import logoAsset from "@/assets/oklog-logo.png.asset.json";
import {
  CORPORATE_EMAIL,
  FLEET_METRICS,
  FLEET_VEHICLES,
  TESTIMONIALS,
  type FleetCategory,
} from "@/data/logistics";

const FLEET_FILTERS: Array<"Todos" | FleetCategory> = ["Todos", "Utilitário", "Van", "VUC"];

export function FleetAndFooter() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | FleetCategory>("Todos");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);

  const visibleVehicles =
    activeCategory === "Todos"
      ? FLEET_VEHICLES
      : FLEET_VEHICLES.filter((v) => v.category === activeCategory);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = contactName.trim();
    const email = contactEmail.trim();
    const message = contactMessage.trim();

    if (name.length < 2) {
      setContactError("Informe seu nome ou empresa.");
      setContactSent(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError("Informe um e-mail corporativo válido.");
      setContactSent(false);
      return;
    }
    if (message.length < 5) {
      setContactError("Escreva uma breve mensagem sobre sua necessidade.");
      setContactSent(false);
      return;
    }

    setContactError(null);
    setContactSent(true);
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  }

  return (
    <>
      <section id="frota" className="scroll-mt-20 border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-2xl bg-navy p-6 text-navy-foreground sm:grid-cols-3 sm:p-8">
            {FLEET_METRICS.map((metric) => (
              <div key={metric.label} className="sm:border-r sm:border-navy-foreground/15 sm:pr-6 last:border-r-0">
                <p className="font-display text-3xl font-extrabold text-cta sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-navy-muted">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Frota e Diferenciais
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Filtre por categoria de veículo e conheça a capacidade ideal para cada entrega.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar frota por categoria">
              {FLEET_FILTERS.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {visibleVehicles.map((vehicle) => (
              <article
                key={vehicle.category}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                      {vehicle.category}
                    </span>
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{vehicle.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{vehicle.idealFor}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-3.5 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Capacidade</dt>
                      <dd className="mt-0.5 font-bold text-foreground">{vehicle.capacity}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Volume útil</dt>
                      <dd className="mt-0.5 font-bold text-foreground">{vehicle.volume}</dd>
                    </div>
                  </dl>
                </div>

                <ul className="mt-5 space-y-2 border-t border-border pt-4">
                  {vehicle.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-status-active" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Confiança de quem move negócios todos os dias
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              A Ok Log Transporte combina gestão logística rigorosa, comunicação transparente e
              rastreamento contínuo para empresas que não podem parar.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.author}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <Quote className="h-6 w-6 text-cta" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                    “{item.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.8fr_1.1fr] lg:px-8">
          <div>
            <div className="inline-flex rounded-xl bg-card px-3.5 py-2">
              <img
                src={logoAsset.url}
                alt="Ok Log Transporte"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-muted">
              Soluções em transporte rodoviário, carga fracionada, carga dedicada e distribuição
              urbana com pontualidade e rastreamento.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-navy-muted">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cta" />
                <a href={`mailto:${CORPORATE_EMAIL}`} className="hover:text-navy-foreground hover:underline">
                  {CORPORATE_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-navy-foreground uppercase">
              Links úteis
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-muted">
              <li>
                <a href="#cotacao" className="transition-colors hover:text-navy-foreground">
                  Cotação Rápida
                </a>
              </li>
              <li>
                <a href="#rastreamento" className="transition-colors hover:text-navy-foreground">
                  Rastreamento de Carga
                </a>
              </li>
              <li>
                <a href="#servicos" className="transition-colors hover:text-navy-foreground">
                  Serviços e Soluções
                </a>
              </li>
              <li>
                <a href="#frota" className="transition-colors hover:text-navy-foreground">
                  Frota e Diferenciais
                </a>
              </li>
              <li>
                <a href="#sobre" className="transition-colors hover:text-navy-foreground">
                  Sobre e Depoimentos
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-5 sm:p-6">
            <h3 className="text-base font-bold text-navy-foreground">Contato Rápido</h3>
            <p className="mt-1 text-xs text-navy-muted">
              Envie sua mensagem para nossa equipe comercial ({CORPORATE_EMAIL}).
            </p>

            <form onSubmit={handleContactSubmit} className="mt-4 space-y-3" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Seu nome ou empresa"
                  aria-label="Seu nome ou empresa"
                  className="w-full rounded-lg border border-navy-foreground/20 bg-navy px-3 py-2 text-sm text-navy-foreground placeholder:text-navy-muted focus:border-cta focus:outline-none"
                />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Seu e-mail corporativo"
                  aria-label="Seu e-mail corporativo"
                  className="w-full rounded-lg border border-navy-foreground/20 bg-navy px-3 py-2 text-sm text-navy-foreground placeholder:text-navy-muted focus:border-cta focus:outline-none"
                />
              </div>
              <textarea
                rows={3}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Conte brevemente sobre sua rota ou necessidade logística"
                aria-label="Mensagem"
                className="w-full rounded-lg border border-navy-foreground/20 bg-navy px-3 py-2 text-sm text-navy-foreground placeholder:text-navy-muted focus:border-cta focus:outline-none"
              />
              {contactError && (
                <p role="alert" className="text-xs font-medium text-cta">
                  {contactError}
                </p>
              )}
              {contactSent && (
                <p
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-lg bg-status-active/20 px-3 py-2 text-xs font-medium text-navy-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-status-active" />
                  Mensagem simulada com sucesso. Canal direto: {CORPORATE_EMAIL}.
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-cta px-4 py-2.5 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-muted sm:flex-row sm:px-6 lg:px-8">
            <p>© {new Date().getFullYear()} Ok Log Transporte. Todos os direitos reservados.</p>
            <p>{CORPORATE_EMAIL}</p>
          </div>
        </div>
      </footer>
    </>
  );
}