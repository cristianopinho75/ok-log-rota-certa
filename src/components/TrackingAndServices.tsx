import { useState, type FormEvent } from "react";
import {
  Boxes,
  CheckCircle2,
  Clock,
  MapPin,
  PackageSearch,
  Truck,
  Warehouse,
  X,
  ArrowUpRight,
} from "lucide-react";
import {
  CORPORATE_EMAIL,
  SERVICES,
  lookupTrackingCode,
  type ServiceItem,
  type TrackingStatus,
} from "@/data/logistics";

const SERVICE_ICONS: Record<string, typeof Truck> = {
  fracionada: Boxes,
  dedicada: Truck,
  armazenagem: Warehouse,
  urbana: MapPin,
};

export function TrackingAndServices() {
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [trackingResult, setTrackingResult] = useState<TrackingStatus | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  function handleTrack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = trackingCode.trim();
    if (clean.length < 4) {
      setTrackingError("Digite um código de rastreio válido (ex.: OKL-8421).");
      setTrackingResult(null);
      return;
    }
    setTrackingError(null);
    setTrackingResult(lookupTrackingCode(clean));
  }

  return (
    <>
      <section id="rastreamento" className="scroll-mt-20 border-b border-border bg-card py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.35fr]">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Rastreamento de Carga</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Acompanhe o status da sua entrega em tempo real. Dúvidas operacionais:{" "}
                  <a href={`mailto:${CORPORATE_EMAIL}`} className="font-medium text-primary underline">
                    {CORPORATE_EMAIL}
                  </a>
                  .
                </p>
              </div>

              <form onSubmit={handleTrack} className="space-y-3" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <PackageSearch className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      placeholder="Insira o código de rastreio (ex.: OKL-8421)"
                      aria-label="Código de rastreio"
                      className="w-full rounded-lg border border-input bg-card py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Rastrear
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>Testar código:</span>
                  {["OKL-8421", "OKL-5190"].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        setTrackingCode(sample);
                        setTrackingError(null);
                        setTrackingResult(lookupTrackingCode(sample));
                      }}
                      className="rounded-md border border-border bg-card px-2.5 py-1 font-medium text-foreground transition-colors hover:border-primary"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
                {trackingError && (
                  <p role="alert" className="text-xs font-medium text-destructive">
                    {trackingError}
                  </p>
                )}
              </form>
            </div>

            {trackingResult && (
              <div
                aria-live="polite"
                className="mt-6 rounded-xl border border-status-active/30 bg-status-active-surface p-5 text-status-active-foreground"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-status-active" />
                    <p className="text-sm font-bold sm:text-base">
                      {trackingResult.status} • Próxima parada: {trackingResult.nextStop}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    Código {trackingResult.code} • {trackingResult.updatedAt}
                  </span>
                </div>

                <p className="mt-1.5 text-xs font-medium opacity-90">{trackingResult.eta}</p>

                <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {trackingResult.steps.map((step) => (
                    <li
                      key={step.label}
                      className="flex items-center gap-2 rounded-lg bg-card/85 px-3 py-2 text-xs font-medium text-foreground"
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          step.done ? "text-status-active" : "text-muted-foreground/40"
                        }`}
                      />
                      <span>{step.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="servicos" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Serviços e Soluções Logísticas
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Operações sob medida para indústria, varejo e distribuidoras. Clique em um serviço
              para ver detalhes e prazos.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.id] ?? Truck;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.shortDesc}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Ver detalhes
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="service-modal-title" className="text-2xl font-bold text-foreground">
                  {selectedService.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-status-active-foreground">
                  {selectedService.sla}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Fechar detalhes"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {selectedService.details}
            </p>

            <ul className="mt-5 space-y-2.5">
              {selectedService.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-status-active" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Fechar
              </button>
              <a
                href="#cotacao"
                onClick={() => setSelectedService(null)}
                className="rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Cotar este serviço
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}