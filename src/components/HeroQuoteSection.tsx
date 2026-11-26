import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import heroAsset from "@/assets/hero-logistics.jpg.asset.json";
import {
  CARGO_TYPES,
  CORPORATE_EMAIL,
  calculateQuoteEstimate,
  type CargoType,
  type QuoteEstimate,
} from "@/data/logistics";

export function HeroQuoteSection() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [cargoType, setCargoType] = useState<CargoType>("Carga Fracionada");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanOrigin = origin.trim();
    const cleanDestination = destination.trim();
    const parsedWeight = Number(weight.replace(",", "."));

    if (cleanOrigin.length < 2 || cleanDestination.length < 2) {
      setError("Informe a cidade de origem e o destino para simular o frete.");
      setEstimate(null);
      return;
    }
    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0 || parsedWeight > 50000) {
      setError("Informe um peso estimado válido entre 1 kg e 50.000 kg.");
      setEstimate(null);
      return;
    }

    setError(null);
    setEstimate(calculateQuoteEstimate(cleanOrigin, cleanDestination, cargoType, parsedWeight));
  }

  return (
    <section id="inicio" className="relative overflow-hidden bg-navy text-navy-foreground">
      <img
        src={heroAsset.url}
        alt="Caminhão de transporte rodoviário da Ok Log em rodovia"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/75"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cta uppercase">
            <ShieldCheck className="h-4 w-4" />
            Transporte rodoviário corporativo
          </p>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-navy-foreground sm:text-5xl lg:text-6xl">
            Agilidade e segurança em cada quilômetro da sua carga.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-navy-muted sm:text-lg">
            A Ok Log Transporte conecta sua operação com frota monitorada 24 horas, entregas
            pontuais e atendimento corporativo dedicado em todo o Brasil.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#cotacao"
              className="inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3.5 text-sm font-bold text-cta-foreground shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
            >
              Cotar frete agora
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#rastreamento"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-foreground/25 px-6 py-3.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
            >
              Rastrear entrega
            </a>
          </div>
        </div>

        <div
          id="cotacao"
          className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-7"
        >
          <h2 className="text-xl font-bold text-foreground">Cotação Rápida</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simule o valor e o prazo estimado da sua operação em segundos.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-origin" className="block text-xs font-semibold text-foreground">
                  Origem (Cidade/UF)
                </label>
                <input
                  id="quote-origin"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Ex.: São Paulo, SP"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="quote-dest" className="block text-xs font-semibold text-foreground">
                  Destino (Cidade/UF)
                </label>
                <input
                  id="quote-dest"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Ex.: Belo Horizonte, MG"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-type" className="block text-xs font-semibold text-foreground">
                  Tipo de carga
                </label>
                <select
                  id="quote-type"
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value as CargoType)}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  {CARGO_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quote-weight" className="block text-xs font-semibold text-foreground">
                  Peso estimado (kg)
                </label>
                <input
                  id="quote-weight"
                  type="number"
                  min="1"
                  max="50000"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex.: 450"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs font-medium text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-cta px-5 py-3 text-sm font-bold text-cta-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover"
            >
              Calcular cotação simulada
            </button>

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              Atendimento comercial: {CORPORATE_EMAIL}
            </p>
          </form>

          {estimate && (
            <div
              aria-live="polite"
              className="mt-5 rounded-xl border border-status-active/30 bg-status-active-surface p-4 text-status-active-foreground"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-status-active" />
                <div className="min-w-0 flex-1 space-y-1 text-sm">
                  <p className="font-bold">Resumo simulado da cotação</p>
                  <p>
                    {estimate.origin} → {estimate.destination} ({estimate.cargoType},{" "}
                    {estimate.weightKg} kg)
                  </p>
                  <p className="font-semibold">
                    Estimativa: {estimate.estimatedPrice} • Prazo: {estimate.estimatedDays} •
                    Veículo sugerido: {estimate.recommendedVehicle}
                  </p>
                  <p className="pt-1 text-xs opacity-90">
                    Para formalizar esta proposta, envie para{" "}
                    <a
                      href={`mailto:${CORPORATE_EMAIL}?subject=${encodeURIComponent(
                        `Cotação Ok Log: ${estimate.origin} para ${estimate.destination}`,
                      )}`}
                      className="font-semibold underline"
                    >
                      {CORPORATE_EMAIL}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}