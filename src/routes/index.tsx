import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroQuoteSection } from "@/components/HeroQuoteSection";
import { TrackingAndServices } from "@/components/TrackingAndServices";
import { FleetAndFooter } from "@/components/FleetAndFooter";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ok Log Transporte | Cotação de Fretes e Logística de Cargas" },
      {
        name: "description",
        content:
          "Solicite cotação rápida de frete, rastreie sua entrega e conheça nossa frota monitorada para carga fracionada, dedicada e distribuição urbana.",
      },
      { property: "og:title", content: "Ok Log Transporte | Cotação de Fretes e Logística" },
      {
        property: "og:description",
        content:
          "Agilidade e segurança no transporte rodoviário de cargas em todo o Brasil. Cotação online e rastreamento imediato.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroQuoteSection />
        <TrackingAndServices />
        <FleetAndFooter />
      </main>
    </div>
  );
}
