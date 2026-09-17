import { createFileRoute } from "@tanstack/react-router";
import { Check, Gift, Mail, MapPin, Phone, Send, Shirt, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/art-by-nuella-logo.png.asset.json";
import merchGalleryAsset from "@/assets/art-by-nuella-merch-gallery.jpg.asset.json";
import giftBasketAsset from "@/assets/art-by-nuella-gift-basket.jpg.asset.json";
import engravedBoardAsset from "@/assets/art-by-nuella-engraved-board.jpg.asset.json";
import crystalPhotoUpscaledImg from "@/assets/art-by-nuella-crystal-photo-upscaled.jpg";
import notebooksAsset from "@/assets/art-by-nuella-notebooks.jpg.asset.json";
import teacherGiftAsset from "@/assets/art-by-nuella-teacher-gift.jpg.asset.json";
import bottlesAsset from "@/assets/art-by-nuella-bottles.jpg.asset.json";
import engravedTumblersAsset from "@/assets/art-by-nuella-engraved-tumblers.jpg.asset.json";
import tshirtImg from "@/assets/art-by-nuella-tshirt.jpg";
import toteImg from "@/assets/art-by-nuella-tote.jpg";
import boardDetailImg from "@/assets/art-by-nuella-board-detail.jpg";
import crystalPlaqueImg from "@/assets/art-by-nuella-crystal-plaque.jpg";
import celebrationGiftBasketAsset from "@/assets/art-by-nuella-celebration-gift-basket.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Art by Nuella | Custom Gifts, Printing & Engraving in Calgary" },
      {
        name: "description",
        content:
          "Contact Art by Nuella in Calgary for personalized gifts, custom apparel, engraved cups, boards, crystals, and gift baskets.",
      },
      { property: "og:title", content: "Art by Nuella | Custom Gifts in Calgary" },
      {
        property: "og:description",
        content:
          "Gallery-first custom gift, print, and engraving shop serving Calgary, Chestermere, and Airdrie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const phoneDisplay = "+1 (587) 664-7416";
const phoneHref = "tel:+15876647416";
const email = "artbynuella@gmail.com";

const gallery = [
  {
    src: merchGalleryAsset.url,
    alt: "Custom Art by Nuella tote bag, shirt, mug, notebooks, and engraved bottles",
    title: "Custom Merch Sets",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: giftBasketAsset.url,
    alt: "Personalized gift basket with custom tumblers and gold bow",
    title: "Gift Baskets",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    src: engravedBoardAsset.url,
    alt: "Engraved wooden serving board with custom house illustration and family name",
    title: "Wood Engraving",
    className: "md:col-span-2",
  },
  {
    src: bottlesAsset.url,
    alt: "Personalized engraved water bottles in multiple colors",
    title: "Cups & Bottles",
    className: "md:col-span-1",
  },
  {
    src: teacherGiftAsset.url,
    alt: "Teacher appreciation gift set with custom tumbler and treats",
    title: "Teacher Gifts",
    className: "md:col-span-1",
  },
  {
    src: notebooksAsset.url,
    alt: "Custom engraved leather notebooks with logo design",
    title: "Journals & Planners",
    className: "md:col-span-1",
  },
  {
    src: crystalPhotoUpscaledImg,
    alt: "Photo crystal keepsake with engraved portrait",
    title: "Photo Crystals",
    className: "md:col-span-1",
  },
  {
    src: engravedTumblersAsset.url,
    alt: "Personalized black and cream tumblers with custom business and church logos",
    title: "Engraved Tumblers",
    className: "md:col-span-1",
  },
  {
    src: tshirtImg,
    alt: "Custom printed black t-shirt with a warm abstract design",
    title: "Custom Tees",
    className: "md:col-span-2",
  },
  {
    src: toteImg,
    alt: "Canvas tote bag with a custom printed design in warm tones",
    title: "Printed Totes",
    className: "md:col-span-1",
  },
  {
    src: boardDetailImg,
    alt: "Close-up of laser engraving detail on a wooden board",
    title: "Engraving Detail",
    className: "md:col-span-2",
  },
  {
    src: crystalPlaqueImg,
    alt: "Engraved crystal plaque glowing on an illuminated base",
    title: "Crystal Plaques",
    className: "md:col-span-1",
  },
  {
    src: celebrationGiftBasketAsset.url,
    alt: "Wrapped woven celebration gift basket finished with a personalized gold ribbon",
    title: "Celebration Gifts",
    className: "md:col-span-2",
  },
];

const services = [
  {
    icon: Gift,
    title: "Personalized gifts",
    text: "Curated bundles, keepsakes, teacher gifts, wedding pieces, and one-off custom orders.",
  },
  {
    icon: Shirt,
    title: "Print shop pieces",
    text: "T-shirts, tote bags, mugs, apparel, and branded merch made for events or everyday gifting.",
  },
  {
    icon: Sparkles,
    title: "Engraving work",
    text: "Cups, chopping boards, notebooks, crystals, and wood pieces finished with personal detail.",
  },
];

const quickPicks = ["Engraved cup", "T-shirt", "Gift basket", "Chopping board", "Notebook", "Photo crystal"];

function Index() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selectedProject, setSelectedProject] = useState(quickPicks[0] ?? "Custom gift");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const { error } = await supabase.from("contact_leads").insert({
      name: String(formData.get("name") ?? "").trim(),
      contact: String(formData.get("contact") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      project_type: String(formData.get("project_type") ?? selectedProject).trim(),
      timeline: String(formData.get("timeline") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      source_page: "home",
    });

    if (error) {
      setStatus("error");
      return;
    }

    event.currentTarget.reset();
    setSelectedProject(quickPicks[0] ?? "Custom gift");
    setStatus("sent");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-craft-line bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Art by Nuella home">
            <img src={logoAsset.url} alt="Art by Nuella logo" className="size-12 shrink-0 rounded-full border border-craft-line bg-card object-contain p-1" />
            <div className="min-w-0">
              <p className="font-display text-base font-extrabold uppercase leading-none text-craft-ink sm:text-lg">Art by Nuella</p>
              <p className="hidden text-xs font-semibold uppercase text-muted-foreground sm:block">Personalized gifts crafted with love</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold uppercase text-craft-charcoal lg:flex" aria-label="Main navigation">
            <a href="#gallery" className="hover:text-accent">Gallery</a>
            <a href="#services" className="hover:text-accent">Services</a>
            <a href="#quote" className="hover:text-accent">Quote</a>
          </nav>
          <Button asChild variant="lead" size="lg" className="h-11 px-4 text-sm sm:px-6">
            <a href={phoneHref} aria-label={`Call Art by Nuella at ${phoneDisplay}`}>
              <Phone />
              <span className="hidden sm:inline">Call now</span>
              <span className="sm:hidden">Call</span>
            </a>
          </Button>
        </div>
      </header>

      <section id="top" className="craft-texture pt-24">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-16">
          <div className="max-w-2xl py-4 lg:py-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-craft-line bg-card/80 px-4 py-2 text-xs font-bold uppercase text-craft-charcoal shadow-sm">
              <MapPin className="size-4 text-accent" />
              Calgary · Chestermere · Airdrie
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[0.92] text-craft-ink sm:text-6xl lg:text-7xl">
              Custom gifts that feel personal before they are opened.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Personalized engraving, printed apparel, custom drinkware, gift baskets, crystals, boards, and branded pieces made locally in Calgary.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="lead" size="lg">
                <a href={phoneHref}>
                  <Phone />
                  {phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="cream" size="lg">
                <a href="#quote">
                  <Send />
                  Request a quote
                </a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                ["Local", "Calgary made"],
                ["Custom", "One-offs welcome"],
                ["No cart", "Talk to a maker"],
              ].map(([value, label]) => (
                <div key={value} className="border-y border-craft-line py-3">
                  <p className="font-display text-xl font-extrabold text-craft-ink">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 grid-rows-[repeat(6,minmax(4.6rem,1fr))] gap-3 pb-10 lg:pb-0">
            <figure className="gallery-shadow relative col-span-4 row-span-6 overflow-hidden rounded-md border border-craft-line bg-card">
              <img src={merchGalleryAsset.url} alt="A full Art by Nuella product spread with printed apparel, drinkware, notebooks, tote bags, and mugs" className="size-full object-cover" />
              <figcaption className="absolute bottom-4 left-4 right-4 rounded-md bg-craft-scrim px-4 py-3 text-primary-foreground backdrop-blur-md">
                <span className="block font-display text-xl font-extrabold">Gift shop · print shop · engraving shop</span>
                <span className="mt-1 block text-sm text-primary-foreground/85">Made for birthdays, teachers, weddings, teams, businesses, and keepsakes.</span>
              </figcaption>
            </figure>
            <figure className="gallery-shadow relative col-span-2 row-span-3 overflow-hidden rounded-md border border-craft-line bg-card">
              <img src={giftBasketAsset.url} alt="Wrapped custom gift basket by Art by Nuella" className="size-full object-cover" />
            </figure>
            <figure className="gallery-shadow relative col-span-2 row-span-3 overflow-hidden rounded-md border border-craft-line bg-card">
              <img src={bottlesAsset.url} alt="Engraved bottles by Art by Nuella" className="size-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-craft-ink py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase text-craft-gold">Recent work</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">A gallery built to spark your order.</h2>
            </div>
            <Button asChild variant="lead" size="lg" className="w-full sm:w-fit">
              <a href="#quote">
                Start with an idea
                <Send />
              </a>
            </Button>
          </div>

          <div className="grid auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3">
            {gallery.map((item) => (
              <figure key={item.title} className={`group relative overflow-hidden rounded-md border border-primary-foreground/15 bg-card ${item.className}`}>
                <img src={item.src} alt={item.alt} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-craft-scrim px-4 py-3 backdrop-blur-sm">
                  <span className="font-display text-xl font-extrabold text-primary-foreground">{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-bold uppercase text-accent">What we make</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold text-craft-ink sm:text-5xl">Designed, printed, engraved, wrapped, and ready to gift.</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Skip the cart and send the details. Every project starts with the item, the name or design, the timing, and the story behind the gift.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="rounded-md border border-craft-line bg-card p-6 gallery-shadow">
                    <div className="mb-6 flex size-12 items-center justify-center rounded-md bg-secondary text-craft-ink">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-craft-ink">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-md bg-craft-ink p-6 text-primary-foreground gallery-shadow sm:p-8">
            <p className="text-sm font-bold uppercase text-craft-gold">Fastest way to start</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">Call, email, or send a quick request.</h2>
            <div className="mt-8 space-y-4">
              <a href={phoneHref} className="flex items-center gap-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15">
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground"><Phone className="size-5" /></span>
                <span>
                  <span className="block text-xs font-bold uppercase text-primary-foreground/70">Phone</span>
                  <span className="block font-display text-xl font-extrabold">{phoneDisplay}</span>
                </span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15">
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground"><Mail className="size-5" /></span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase text-primary-foreground/70">Email</span>
                  <span className="block break-all font-display text-xl font-extrabold">{email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/10 p-4">
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground"><MapPin className="size-5" /></span>
                <span>
                  <span className="block text-xs font-bold uppercase text-primary-foreground/70">Serving</span>
                  <span className="block font-display text-xl font-extrabold">Calgary and surrounding areas</span>
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-md border border-craft-line bg-card p-6 gallery-shadow sm:p-8">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Art by Nuella" className="size-14 rounded-full border border-craft-line bg-card object-contain p-1" />
              <div>
                <p className="font-display text-2xl font-extrabold text-craft-ink">Request a custom quote</p>
                <p className="text-sm text-muted-foreground">Tell us what you want made.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold uppercase text-craft-charcoal">
                Name
                <input name="name" required minLength={2} className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 text-base font-medium normal-case text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring" placeholder="Your name" />
              </label>
              <label className="text-sm font-bold uppercase text-craft-charcoal">
                Phone or email
                <input name="contact" required minLength={5} className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 text-base font-medium normal-case text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring" placeholder="Best way to reach you" />
              </label>
              <label className="text-sm font-bold uppercase text-craft-charcoal">
                City
                <input name="city" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 text-base font-medium normal-case text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring" placeholder="Calgary, Airdrie, Chestermere" />
              </label>
              <label className="text-sm font-bold uppercase text-craft-charcoal">
                Timeline
                <input name="timeline" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-4 text-base font-medium normal-case text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring" placeholder="When do you need it?" />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-bold uppercase text-craft-charcoal">Project type</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickPicks.map((pick) => (
                  <label key={pick} className="cursor-pointer">
                    <input
                      type="radio"
                      name="project_type"
                      value={pick}
                      checked={selectedProject === pick}
                      onChange={() => setSelectedProject(pick)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex rounded-full border border-craft-line bg-background px-4 py-2 text-sm font-semibold text-craft-charcoal peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-foreground">
                      {pick}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block text-sm font-bold uppercase text-craft-charcoal">
              Project details
              <textarea name="message" required minLength={8} rows={5} className="mt-2 w-full resize-none rounded-md border border-input bg-background px-4 py-3 text-base font-medium normal-case text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring" placeholder="Item, quantity, names, colours, date needed, and any design idea." />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" variant="ink" size="lg" disabled={status === "sending"} className="w-full sm:w-fit">
                {status === "sending" ? "Sending" : "Send request"}
                <Send />
              </Button>
              {status === "sent" && (
                <p className="flex items-center gap-2 text-sm font-semibold text-craft-charcoal"><Check className="size-4 text-accent" /> Request sent. We will be in touch soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-destructive">Something went wrong. Please call or email us directly.</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
