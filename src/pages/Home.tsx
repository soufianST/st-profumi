/*
 * Style reminder: dark luxury editorial storefront with gold accents, premium bottle imagery,
 * dense product grid, and restrained high-contrast commerce UI. Any code changes should preserve
 * the crafted boutique feel instead of introducing generic app styling.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import imgAventus from "@/assets/fragrances/image_w896_h1200_frag-01-aventus.webp";
import imgOudWood from "@/assets/fragrances/image_w896_h1200_frag-02-oud-wood.webp";
import imgBaccarat from "@/assets/fragrances/image_w896_h1200_frag-03-baccarat-rouge.webp";
import imgTobaccoVanille from "@/assets/fragrances/image_w896_h1200_frag-04-tobacco-vanille.webp";
import imgBlackOrchid from "@/assets/fragrances/image_w896_h1200_frag-05-black-orchid.webp";
import imgErosEdp from "@/assets/fragrances/image_w896_h1200_frag-06-eros-edp.webp";
import imgSauvageEdp from "@/assets/fragrances/image_w896_h1200_frag-06-sauvage.webp";
import imgLibre from "@/assets/fragrances/image_w896_h1200_frag-07-libre.webp";
import imgLostCherry from "@/assets/fragrances/image_w896_h1200_frag-09-lost-cherry.webp";
import imgInterlude from "@/assets/fragrances/image_w896_h1200_frag-10-interlude.webp";
import imgNaxos from "@/assets/fragrances/image_w896_h1200_frag-12-naxos.webp";
import imgBlackAoud from "@/assets/fragrances/image_w896_h1200_frag-13-black-aoud.webp";
import imgDelina from "@/assets/fragrances/image_w896_h1200_frag-14-delina.webp";
import imgElysium from "@/assets/fragrances/image_w896_h1200_frag-15-elysium.webp";

// New real product photos (cropped to match existing style)
import imgWoodSageSeaSalt from "@/assets/fragrances/image_w896_h1200_frag-12-wood-sage-sea-salt.webp";
import imgBeachWalk from "@/assets/fragrances/image_w896_h1200_frag-13-beach-walk.webp";
import imgLoveDontBeShy from "@/assets/fragrances/image_w896_h1200_frag-14-love-dont-be-shy.webp";
import imgLayton from "@/assets/fragrances/image_w896_h1200_frag-15-layton.webp";
import imgErbaPura from "@/assets/fragrances/image_w896_h1200_frag-16-erba-pura.webp";
import imgByTheFireplace from "@/assets/fragrances/image_w896_h1200_frag-18-by-the-fireplace.webp";
import imgOneMillion from "@/assets/fragrances/image_w896_h1200_frag-19-1-million.webp";
import imgCocoMademoiselle from "@/assets/fragrances/image_w896_h1200_frag-22-coco-mademoiselle.webp";
import imgColoniaAssoluta from "@/assets/fragrances/image_w896_h1200_frag-25-colonia-assoluta.webp";
import imgBleuDeChanelEDP from "@/assets/fragrances/image_w896_h1200_frag-26-bleu-de-chanel-edp.webp";
import imgAcquaDiParma from "@/assets/fragrances/image_w896_h1200_frag-17-acqua-di-parma.webp";
import imgAngelsShare from "@/assets/fragrances/image_w896_h1200_frag-20-angels-share.webp";
import imgGucciFlora from "@/assets/fragrances/image_w896_h1200_frag-21-flora.webp";
import imgArmaniSi from "@/assets/fragrances/image_w896_h1200_frag-23-si.webp";
import imgTheOne from "@/assets/fragrances/image_w896_h1200_frag-24-the-one.webp";
import imgLightBlueEDP from "@/assets/fragrances/image_w896_h1200_frag-27-light-blue-edp.webp";
import imgAcquaDiGioProfumo from "@/assets/fragrances/image_w896_h1200_frag-28-acqua-di-gio-profumo.webp";
import imgDiorHommeIntense from "@/assets/fragrances/image_w896_h1200_frag-29-dior-homme-intense.webp";

// Newly added fragrances (styled to match site)
import imgBlackOpium from "@/assets/fragrances/image_w896_h1200_frag-30-black-opium.webp";
import imgLaVieEstBelle from "@/assets/fragrances/image_w896_h1200_frag-31-la-vie-est-belle.webp";
import imgHerod from "@/assets/fragrances/image_w896_h1200_frag-32-herod.webp";
import imgGypsyWater from "@/assets/fragrances/image_w896_h1200_frag-33-gypsy-water.webp";
import imgReplicaFlowerMarket from "@/assets/fragrances/image_w896_h1200_frag-34-replica-flower-market.webp";
import imgReflectionMan from "@/assets/fragrances/image_w896_h1200_frag-35-reflection-man.webp";
import imgReflectionWoman from "@/assets/fragrances/image_w896_h1200_frag-36-reflection-woman.webp";
import imgIrishLeather from "@/assets/fragrances/image_w896_h1200_frag-37-irish-leather.webp";
import imgNotAPerfume from "@/assets/fragrances/image_w896_h1200_frag-38-not-a-perfume.webp";
import imgBaccaratRouge540Extrait from "@/assets/fragrances/image_w896_h1200_frag-39-baccarat-rouge-540-extrait.webp";
import imgMonGuerlain from "@/assets/fragrances/image_w896_h1200_frag-40-mon-guerlain.webp";
import imgCoralFantasy from "@/assets/fragrances/image_w896_h1200_frag-41-uomo-born-in-roma-coral-fantasy.webp";
// New fragrances added
import imgFrag43 from "@/assets/fragrances/image_w896_h1200_frag-43-erba-gold.webp";
import imgFrag44 from "@/assets/fragrances/image_w896_h1200_frag-44-le-beau-le-parfum.webp";
import imgFrag45 from "@/assets/fragrances/image_w896_h1200_frag-45-stronger-intensely.webp";
import imgFrag46 from "@/assets/fragrances/image_w896_h1200_frag-46-le-male-le-parfum.webp";
import imgFrag47 from "@/assets/fragrances/image_w896_h1200_frag-47-le-male-elixir.webp";
import imgFrag48 from "@/assets/fragrances/image_w896_h1200_frag-48-club-de-nuit.webp";
import imgFrag49 from "@/assets/fragrances/image_w896_h1200_frag-49-stronger-absolutely.webp";
import imgFrag50 from "@/assets/fragrances/image_w896_h1200_frag-50-azzaro-most-wanted.webp";
import imgFrag51 from "@/assets/fragrances/image_w896_h1200_frag-51-le-beau-paradise-garden.webp";
import imgFrag52 from "@/assets/fragrances/image_w896_h1200_frag-52-ultra-male.webp";
import imgFrag53 from "@/assets/fragrances/image_w896_h1200_frag-53-valentino-uomo-intense.webp";
import imgFrag54 from "@/assets/fragrances/image_w896_h1200_frag-54-le-beau-intense.webp";
import imgFrag55 from "@/assets/fragrances/image_w896_h1200_frag-55-spicebomb-extreme.webp";
import imgFrag56 from "@/assets/fragrances/image_w896_h1200_frag-56-ombre-leather.webp";
import imgFrag57 from "@/assets/fragrances/image_w896_h1200_frag-57-imagination.webp";
import imgFrag58 from "@/assets/fragrances/image_w896_h1200_frag-58-hacivat.webp";
import imgFrag59 from "@/assets/fragrances/image_w896_h1200_frag-59-afternoon-swim.webp";
import imgFrag60 from "@/assets/fragrances/image_w896_h1200_frag-60-you-powerfully.webp";
import imgFrag61 from "@/assets/fragrances/image_w896_h1200_frag-61-grand-soir.webp";
import imgFrag62 from "@/assets/fragrances/image_w896_h1200_frag-62-oud-maracuja.webp";
import imgFrag63 from "@/assets/fragrances/image_w896_h1200_frag-63-oud-zarian.webp";
import imgFrag64 from "@/assets/fragrances/image_w896_h1200_frag-64-black-phantom.webp";
import imgFrag66 from "@/assets/fragrances/image_w896_h1200_frag-66-coeur-battant.webp";
import imgFrag67 from "@/assets/fragrances/image_w896_h1200_frag-67-orage.webp";
import imgFrag68 from "@/assets/fragrances/image_w896_h1200_frag-68-meteore.webp";
import imgFrag69 from "@/assets/fragrances/image_w896_h1200_frag-69-richwood.webp";
import imgFrag70 from "@/assets/fragrances/image_w896_h1200_frag-70-opera.webp";
import imgFrag71 from "@/assets/fragrances/image_w896_h1200_frag-71-more-than-words.webp";
import imgFrag72 from "@/assets/fragrances/image_w896_h1200_frag-72-soprano.webp";
import imgFrag73 from "@/assets/fragrances/image_w896_h1200_frag-73-capitale.webp";
import imgFrag74 from "@/assets/fragrances/image_w896_h1200_frag-74-acqua-di-gio-profondo.webp";


// Kit images (collages)
import kitIconeUomo from "@/assets/kits/kit-icone-uomo.webp";
import kitTabaccoVaniglia from "@/assets/kits/kit-tabacco-vaniglia.webp";
import kitViralLuxury from "@/assets/kits/kit-viral-luxury.webp";
import kitFlorealeElegante from "@/assets/kits/kit-floreale-elegante.webp";
import kitFrescoEstivo from "@/assets/kits/kit-fresco-estivo.webp";
import kitEquilibrioQuotidiano from "@/assets/kits/kit-equilibrio-quotidiano.webp";





function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
  });
  useEffect(() => {
    const h = () => setSize({ width: window.innerWidth });
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return size;
}

type Lang = "en" | "it";

type GuideItem = { title: string; text: string };

type Translation = {
  tagline: string;
  heroSubtitle: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDesc: string;
  discountLine1: string;
  discountLine2: string;
  cta1: string;
  authTitle: string;
  login: string;
  signup: string;
  emailLabel: string;
  passwordLabel: string;
  logout: string;
  myAddresses: string;
  addAddress: string;
  save: string;
  myOrders: string;
  adminPanel: string;
  orderId: string;
  orderDate: string;
  orderStatus: string;
  tracking: string;
  carrier: string;
  trackingNumber: string;
  updateStatus: string;
  newAnnouncement: string;
  sendAnnouncement: string;
  announcementType: string;
  announcementDiscount: string;
  announcementNewProduct: string;
  announcementSubject: string;
  announcementMessage: string;
  checkoutLoginHint: string;
  cta2: string;
  tab1: string;
  tab2: string;
  tab3: string;
  tab4: string;
  thankYouTitle: string;
  thankYouText: string;
  trackTitle: string;
  trackText: string;
  accountBtn: string;
  statusProcessing: string;
  statusDelivered: string;
  available: string;
  chooseSize: string;
  showNotes: string;
  hideNotes: string;
  cartTitle: string;
  shipping: string;
  shippingFree: string;
  shippingPaid: string;
  freeShippingMsg: string;
  freeShippingAdd: string;
  total: string;
  checkout: string;
  secure: string;
  cartEmpty: string;
  cartEmptySub: string;
  kitCurated: string;
  kitTitle: string;
  kitSubtitle: string;
  kitSave: string;
  kitBuy: string;
  guideTitle: string;
  guideSubtitle: string;
  trust1: string;
  trust2: string;
  trust3: string;
  noteTop: string;
  noteHeart: string;
  noteBase: string;
  filterAll: string;
  filterMen: string;
  filterWomen: string;
  filterUnisex: string;
  searchPlaceholder: string;
  addToCart: string;
  added: string;
  enter: string;
  footer: string;
  guideItems: GuideItem[];
};

const TRANSLATIONS: Record<Lang, Translation> = {
  en: {
    tagline: "The Art of Rare Perfume · For Connoisseurs Only",
    heroSubtitle: "Luxury Samples",
    heroTitle1: "Fragrances worth",
    heroTitle2: "thousands of euros",
    heroTitle3: "starting from",
    heroDesc:
      "Authentic samples & decants of Creed, Tom Ford, Armani and other luxury houses. Try before you invest.",
    discountLine1: "Deal: buy 2 samples and get the 3rd at 50% off",
    discountLine2: "Buy 3 and get the 4th free",
    cta1: "DISCOVER SAMPLES",
    cta2: "DISCOVERY KITS",
    authTitle: "Account",
    login: "Log in",
    signup: "Sign up",
    emailLabel: "Email",
    passwordLabel: "Password",
    logout: "Log out",
    myAddresses: "My addresses",
    addAddress: "Add address",
    save: "Save",
    myOrders: "My orders",
    adminPanel: "Admin panel",
    orderId: "Order ID",
    orderDate: "Date",
    orderStatus: "Status",
    tracking: "Tracking",
    carrier: "Carrier",
    trackingNumber: "Tracking number",
    updateStatus: "Update",
    newAnnouncement: "New announcement",
    sendAnnouncement: "Send to customers",
    announcementType: "Type",
    announcementDiscount: "Discount",
    announcementNewProduct: "New product",
    announcementSubject: "Email subject",
    announcementMessage: "Message",
    checkoutLoginHint: "Tip: log in to save your cart & track orders",

    tab1: "Samples",
    tab2: "Discovery Kits",
    tab3: "Guide",
    tab4: "Orders",
    thankYouTitle: "Thank you!",
    thankYouText: "Your order has been received. You can track its status anytime from your account.",
    trackTitle: "Track your order",
    trackText: "After checkout, you'll receive an email confirmation with your order details.",
    accountBtn: "My account",
    statusProcessing: "Processing",
    statusDelivered: "Delivered",
    available: "fragrances available",
    chooseSize: "Choose Size",
    showNotes: "View olfactory notes",
    hideNotes: "Hide notes",
    cartTitle: "Your Cart",
    shipping: "Shipping",
    shippingFree: "✓ FREE",
    shippingPaid: "€7.00",
    freeShippingMsg: "✓ Free shipping unlocked!",
    freeShippingAdd: "Add €{amount} more for free shipping",
    total: "Total",
    checkout: "PROCEED TO CHECKOUT",
    secure: "Secure payment · PayPal · Credit Card",
    cartEmpty: "Your cart is empty",
    cartEmptySub: "Discover our luxury samples above",
    kitCurated: "CURATED BY OUR EXPERTS",
    kitTitle: "Discovery Kits",
    kitSubtitle: "The perfect way to start your olfactory journey",
    kitSave: "You save",
    kitBuy: "BUY NOW",
    guideTitle: "Luxury Perfume Guide",
    guideSubtitle: "FOR NEW ENTHUSIASTS",
    trust1: "100% AUTHENTIC",
    trust2: "Free shipping over €30",
    trust3: "4.9/5 · 458 orders",
    noteTop: "Top Notes",
    noteHeart: "Heart Notes",
    noteBase: "Base Notes",
    filterAll: "All",
    filterMen: "Men",
    filterWomen: "Women",
    filterUnisex: "Unisex",
    searchPlaceholder: "Search brand or fragrance...",
    addToCart: "Add to Cart",
    added: "✓ Added",
    enter: "ENTER",
    footer: "© 2026 ST PROFUMI · Authentic luxury decants · ",
    guideItems: [
      {
        title: "What is a Decant?",
        text: "A decant is authentic perfume extracted from the original bottle. All our samples come from full-size bottles purchased from authorized retailers — 100% guaranteed.",
      },
      {
        title: "Which Size to Choose?",
        text: "2ml = 15-20 sprays, first discovery. 5ml = 40-50 sprays, for fragrances you already love. 10ml = daily use or travel. Full Bottle = the definitive purchase for your absolute favorites.",
      },
      {
        title: "How to Test a Fragrance",
        text: "Spray on your inner wrist. Wait 30 minutes: top notes fade and the true character emerges. Do not rub — it breaks the aromatic molecules and alters the scent.",
      },
      {
        title: "Top 5 of 2025",
        text: "Baccarat Rouge 540 (unisex), Creed Aventus (men), Delina by Parfums de Marly (women), Tobacco Vanille (winter), Dior Sauvage EDP (absolute bestseller worldwide).",
      },
      {
        title: "Why Buy Samples First?",
        text: "Luxury fragrances cost €150–€500 per bottle. Our samples let you live with a scent for days before committing. Skin chemistry makes every fragrance unique — always test on your skin, not paper.",
      },
    ],
  },
  it: {
    tagline: "L'Arte del Profumo Raro · Solo per Intenditori",
    heroSubtitle: "Campioni di Lusso",
    heroTitle1: "Fragranze di lusso dal valore di",
    heroTitle2: "centinaia di euro",
    heroTitle3: "a partire da",
    heroDesc:
      "Campioni e decant autentici di Creed, Tom Ford, Armani e altre maison di lusso. Prova prima di investire.",
    discountLine1: "Offerta: compra 2 campioni e il 3° è al 50%",
    discountLine2: "Compra 3 e il 4° è gratis",
    cta1: "SCOPRI I CAMPIONI",
    cta2: "KIT DISCOVERY",
    authTitle: "Account",
    login: "Accedi",
    signup: "Registrati",
    emailLabel: "Email",
    passwordLabel: "Password",
    logout: "Esci",
    myAddresses: "I miei indirizzi",
    addAddress: "Aggiungi indirizzo",
    save: "Salva",
    myOrders: "I miei ordini",
    adminPanel: "Pannello admin",
    orderId: "ID ordine",
    orderDate: "Data",
    orderStatus: "Stato",
    tracking: "Tracking",
    carrier: "Corriere",
    trackingNumber: "Numero tracking",
    updateStatus: "Aggiorna",
    newAnnouncement: "Nuovo annuncio",
    sendAnnouncement: "Invia ai clienti",
    announcementType: "Tipo",
    announcementDiscount: "Sconto",
    announcementNewProduct: "Nuovo prodotto",
    announcementSubject: "Oggetto email",
    announcementMessage: "Messaggio",
    checkoutLoginHint: "Consiglio: accedi per salvare il carrello e tracciare gli ordini",

    tab1: "Campioni",
    tab2: "Kit Discovery",
    tab3: "Guida",
    tab4: "Ordini",
    thankYouTitle: "Grazie!",
    thankYouText: "Abbiamo ricevuto il tuo ordine. Puoi seguirne lo stato in qualsiasi momento dal tuo account.",
    trackTitle: "Traccia il tuo ordine",
    trackText: "Accedi al tuo customer dashboard Snipcart per vedere gli ordini e lo stato.",
    accountBtn: "Il mio account",
    statusProcessing: "Processing",
    statusDelivered: "Delivered",
    available: "fragranze disponibili",
    chooseSize: "Scegli la Taglia",
    showNotes: "Visualizza le note olfattive",
    hideNotes: "Nascondi le note",
    cartTitle: "Il Tuo Carrello",
    shipping: "Spedizione",
    shippingFree: "✓ GRATIS",
    shippingPaid: "€7.00",
    freeShippingMsg: "✓ Spedizione gratuita sbloccata!",
    freeShippingAdd: "Aggiungi €{amount} per la spedizione gratuita",
    total: "Totale",
    checkout: "PROCEDI AL PAGAMENTO",
    secure: "Pagamento sicuro · PayPal · Carta di Credito",
    cartEmpty: "Il carrello è vuoto",
    cartEmptySub: "Scopri i nostri campioni di lusso sopra",
    kitCurated: "SELEZIONATI DAI NOSTRI ESPERTI",
    kitTitle: "Kit Discovery",
    kitSubtitle: "Il modo perfetto per iniziare il tuo viaggio olfattivo",
    kitSave: "Risparmi",
    kitBuy: "ACQUISTA ORA",
    guideTitle: "Guida ai Profumi di Lusso",
    guideSubtitle: "PER I NUOVI APPASSIONATI",
    trust1: "100% AUTENTICI",
    trust2: "Spedizione gratuita sopra €30",
    trust3: "4.9/5 · 458 ordini",
    noteTop: "Note di Testa",
    noteHeart: "Note di Cuore",
    noteBase: "Note di Fondo",
    filterAll: "Tutti",
    filterMen: "Uomo",
    filterWomen: "Donna",
    filterUnisex: "Unisex",
    searchPlaceholder: "Cerca marca o fragranza...",
    addToCart: "Aggiungi al Carrello",
    added: "✓ Aggiunto",
    enter: "ENTRA",
    footer: "© 2026 ST PROFUMI · Decant di lusso autentici · ",
    guideItems: [
      {
        title: "Cos'è un Decant?",
        text: "Un decant è profumo autentico estratto dalla bottiglia originale. Tutti i nostri campioni provengono da flaconi interi acquistati presso rivenditori autorizzati — garantito 100%.",
      },
      {
        title: "Quale Taglia Scegliere?",
        text: "2ml = 15-20 spruzzi, prima scoperta. 5ml = 40-50 spruzzi, per fragranze che già ami. 10ml = uso quotidiano o viaggio. Bottiglia Intera = l'acquisto definitivo per i tuoi assoluti preferiti.",
      },
      {
        title: "Come Testare una Fragranza",
        text: "Spruzza sul polso interno. Attendi 30 minuti: le note di testa svaniscono e il vero carattere emerge. Non strofinare — rompe le molecole aromatiche e altera il profumo.",
      },
      {
        title: "Top 5 del 2025",
        text: "Baccarat Rouge 540 (unisex), Creed Aventus (uomo), Delina di Parfums de Marly (donna), Tobacco Vanille (invernale), Dior Sauvage EDP (assoluto bestseller mondiale).",
      },
      {
        title: "Perché Comprare Campioni Prima?",
        text: "Le fragranze di lusso costano €150–€500 a bottiglia. I nostri campioni ti permettono di vivere con una fragranza per giorni prima di impegnarti. La chimica della pelle rende ogni fragranza unica — testala sempre sulla pelle.",
      },
    ],
  },
};


const FRAGRANCES = [
  {
    id: 1,
    house: "Creed",
    name: "Aventus",
    notes: { top: ["Bergamot", "Blackcurrant", "Apple", "Lemon", "Pink Pepper"], heart: ["Pineapple", "Birch", "Patchouli", "Moroccan Jasmine", "Rose", "Juniper Berries"], base: ["Oakmoss", "Musk", "Ambergris", "Vanilla", "Cedarwood", "Ambroxan"] },
    notesIt: { top: ["Bergamot", "Blackcurrant", "Apple", "Lemon", "Pink Pepper"], heart: ["Pineapple", "Birch", "Patchouli", "Moroccan Jasmine", "Rose", "Juniper Berries"], base: ["Oakmoss", "Musk", "Ambergris", "Vanilla", "Cedarwood", "Ambroxan"] },
    family: "Woody Fruity",
    familyIt: "Legnoso Fruttato",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 33 }, { ml: 10, price: 65 }, { ml: 100, price: 350, full: true }],
    description: "An iconic and sophisticated scent that blends a vibrant opening of pineapple and bergamot with a distinctive smoky heart of birch and patchouli, designed to celebrate strength and success.",
    descriptionIt: "Un profumo iconico e sofisticato che unisce un'apertura vivace di ananas e bergamotto a un cuore fumé di betulla e patchouli, pensato per celebrare forza e successo.",
    badge: "Bestseller",
    emoji: "\ud83c\udfc6",
    image: imgAventus,
    rating: 4.8,
    reviews: 866,
  },
  {
    id: 2,
    house: "Tom Ford",
    name: "Oud Wood",
    notes: { top: ["Rosewood", "Cardamom", "Sichuan Pepper"], heart: ["Agarwood (Oud)", "Sandalwood", "Vetiver"], base: ["Tonka Bean", "Vanilla", "Amber"] },
    notesIt: { top: ["Rosewood", "Cardamom", "Sichuan Pepper"], heart: ["Agarwood (Oud)", "Sandalwood", "Vetiver"], base: ["Tonka Bean", "Vanilla", "Amber"] },
    family: "Woody Oriental",
    familyIt: "Legnoso Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 20 }, { ml: 5, price: 42 }, { ml: 10, price: 85 }, { ml: 50, price: 289, full: true }],
    description: "A pioneer in modern woody scents, this fragrance masterfully blends rare oud with exotic spices and smooth woods to create a sophisticated, clean, and luxurious aroma.",
    descriptionIt: "Pioniere nelle fragranze legnose moderne, questo profumo unisce oud raro, spezie esotiche e legni morbidi per un aroma sofisticato, pulito e lussuoso.",
    badge: "Exclusive",
    emoji: "\ud83c\udf3f",
    image: imgOudWood,
    rating: 4.7,
    reviews: 464,
  },
  {
    id: 3,
    house: "MFK",
    name: "Baccarat Rouge 540",
    notes: { top: ["Saffron", "Jasmine"], heart: ["Amberwood", "Ambergris", "Hedione"], base: ["Fir Resin", "Cedar Wood", "Ambroxan", "Oakmoss", "Sugar"] },
    notesIt: { top: ["Saffron", "Jasmine"], heart: ["Amberwood", "Ambergris", "Hedione"], base: ["Fir Resin", "Cedar Wood", "Ambroxan", "Oakmoss", "Sugar"] },
    family: "Floral Woody",
    familyIt: "Floreale Legnoso",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 21 }, { ml: 5, price: 52 }, { ml: 10, price: 104 }, { ml: 70, price: 390, full: true }],
    description: "A luminous and intense fragrance with a graphic olfactory signature, blending airy jasmine and radiant saffron with mineral ambergris facets and freshly-cut cedar wood.",
    descriptionIt: "Una fragranza luminosa e intensa con una firma olfattiva grafica, che unisce il gelsomino arioso e lo zafferano radioso a sfumature minerali di ambra grigia e legno di cedro appena tagliato.",
    badge: "Viral",
    emoji: "\ud83d\udc8e",
    image: imgBaccarat,
    rating: 4.8,
    reviews: 1238,
  },
  {
    id: 4,
    house: "Tom Ford",
    name: "Tobacco Vanille",
    notes: { top: ["Tobacco Leaf", "Spicy Notes", "Ginger"], heart: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"], base: ["Dried Fruits", "Woody Notes", "Sweet Wood Sap"] },
    notesIt: { top: ["Tobacco Leaf", "Spicy Notes", "Ginger"], heart: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"], base: ["Dried Fruits", "Woody Notes", "Sweet Wood Sap"] },
    family: "Oriental Gourmand",
    familyIt: "Orientale Gourmand",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 29 }, { ml: 10, price: 49 }, { ml: 100, price: 375, full: true }],
    description: "This opulent fragrance reinvents the classic tobacco scent by blending it with creamy tonka bean, vanilla, and cocoa to create a modern and heady impression of an exclusive English gentlemen's club.",
    descriptionIt: "Questa fragranza opulenta reinventa il classico profumo di tabacco unendolo a tonka cremosa, vaniglia e cacao, per evocare l’atmosfera moderna e avvolgente di un esclusivo gentlemen’s club inglese.",
    badge: "Cult",
    emoji: "\ud83c\udf42",
    image: imgTobaccoVanille,
    rating: 4.8,
    reviews: 1544,
  },
  {
    id: 5,
    house: "Tom Ford",
    name: "Black Orchid",
    notes: { top: ["Truffle", "Gardenia", "Black Currant", "Ylang-Ylang", "Jasmine", "Bergamot", "Mandarin Orange", "Amalfi Lemon"], heart: ["Orchid", "Spices", "Gardenia", "Fruity Notes", "Ylang-Ylang", "Jasmine", "Lotus"], base: ["Mexican chocolate", "Patchouli", "Vanille", "Incense", "Amber", "Sandalwood", "Vetiver", "White Musk"] },
    notesIt: { top: ["Truffle", "Gardenia", "Black Currant", "Ylang-Ylang", "Jasmine", "Bergamot", "Mandarin Orange", "Amalfi Lemon"], heart: ["Orchid", "Spices", "Gardenia", "Fruity Notes", "Ylang-Ylang", "Jasmine", "Lotus"], base: ["Mexican chocolate", "Patchouli", "Vanille", "Incense", "Amber", "Sandalwood", "Vetiver", "White Musk"] },
    family: "Floral Oriental",
    familyIt: "Floreale Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 21 }, { ml: 10, price: 36 }, { ml: 50, price: 140, full: true }],
    description: "Born from a quest for the rarest flower, this iconic fragrance is a deeply seductive and opulent potion that blends dark orchid accords with rich spices and earthy truffle. It remains a timeless statement of modern luxury, wrapping the skin in a warm, velvet-like embrace of chocolate and patchouli.",
    descriptionIt: "Nato dalla ricerca del fiore più raro, questo profumo iconico unisce orchidea nera, spezie ricche e tartufo in una pozione seducente e opulenta. Un lusso moderno senza tempo che avvolge la pelle in un caldo abbraccio di cioccolato e patchouli.",
    badge: "Iconic",
    emoji: "\ud83d\udda4",
    image: imgBlackOrchid,
    rating: 4.7,
    reviews: 286,
  },
  {
    id: 6,
    house: "Versace",
    name: "Eros EDP",
    notes: { top: ["Mint Oil", "Candy Apple", "Italian Lemon", "Mandarin Orange"], heart: ["Geranium", "Clary Sage", "Ambroxan", "AmberMax"], base: ["Vanilla", "Cedar", "Sandalwood", "Patchouli", "Leather", "Bitter Orange", "Vetiver"] },
    notesIt: { top: ["Mint Oil", "Candy Apple", "Italian Lemon", "Mandarin Orange"], heart: ["Geranium", "Clary Sage", "Ambroxan", "AmberMax"], base: ["Vanilla", "Cedar", "Sandalwood", "Patchouli", "Leather", "Bitter Orange", "Vetiver"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 14 }, { ml: 10, price: 25 }, { ml: 50, price: 80, full: true }],
    description: "A bold and provocative masculine fragrance that balances vibrant citrus and fresh mint with deep woody accords and a smooth, creamy vanilla base.",
    descriptionIt: "Una fragranza maschile audace e provocante che unisce agrumi vivaci e menta fresca a note legnose profonde e una base cremosa di vaniglia.",
    emoji: "\ud83d\udd31",
    image: imgErosEdp,
    rating: 4.5,
    reviews: 269,
  },
  {
    id: 65,
    house: "Dior",
    name: "Sauvage EDP",
    notes: { top: ["Bergamot", "Pepper"], heart: ["Lavender", "Star Anise", "Nutmeg"], base: ["Ambroxan", "Vanilla", "Woody Notes"] },
    notesIt: { top: ["Bergamotto", "Pepe"], heart: ["Lavanda", "Anice stellato", "Noce moscata"], base: ["Ambroxan", "Vaniglia", "Note legnose"] },
    family: "Aromatic Fresh",
    familyIt: "Aromatico Fresco",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 15 }, { ml: 10, price: 30 }, { ml: 100, price: 152, full: true }],
    description: "A modern, magnetic masculine fragrance built around fresh bergamot, spicy pepper, and a powerful amber-woody base.",
    descriptionIt: "Una fragranza maschile moderna e magnetica: bergamotto fresco, pepe speziato e una base ambrata-legnosa intensa.",
    emoji: "",
    image: imgSauvageEdp,
    rating: 4.8,
    reviews: 1100,
  },
  {
    id: 7,
    house: "YSL",
    name: "Libre EDP",
    notes: { top: ["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain", "Bergamot"], heart: ["Orange Blossom", "Lavender", "Jasmine Sambac", "Neroli"], base: ["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"] },
    notesIt: { top: ["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain", "Bergamot"], heart: ["Orange Blossom", "Lavender", "Jasmine Sambac", "Neroli"], base: ["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 15 }, { ml: 10, price: 28 }, { ml: 90, price: 120, full: true }],
    description: "A bold and sophisticated fragrance for women that reimagines the classic fougere style, blending aromatic French lavender with a sensual heart of Moroccan orange blossom and a warm, creamy vanilla base.",
    descriptionIt: "Una fragranza audace e sofisticata per donne, che reinventa il classico stile fougère unendo la lavanda francese aromatica al cuore sensuale di fiori d’arancio marocchini e una base calda e cremosa di vaniglia.",
    emoji: "\ud83d\udc9b",
    image: imgLibre,
    rating: 4.9,
    reviews: 797,
  },
];


interface Fragrance {
  id: number;
  house: string;
  name: string;
  notes: { top: readonly string[]; heart: readonly string[]; base: readonly string[] };
  notesIt: { top: readonly string[]; heart: readonly string[]; base: readonly string[] };
  family: string;
  familyIt: string;
  gender: string;
  genderIt: string;
  sizes: { ml: number | string; price: number; full?: boolean }[];
  description: string;
  descriptionIt: string;
  badge?: string;
  emoji: string;
  image: string;
  rating: number;
  reviews: number;
}

interface CartItem {
  id: number | string;
  house: string;
  name: string;
  emoji: string;
  image?: string;
  ml: number | string;
  price: number;
  qty: number;
  isFull?: boolean;
}

const SAMPLE_SIZES_DISCOUNTABLE = new Set([2, 5, 10]);

function isDiscountableSample(item: Pick<CartItem, "ml" | "isFull">) {
  if (item.isFull) return false;
  const numericMl = Number(item.ml);
  return Number.isFinite(numericMl) && SAMPLE_SIZES_DISCOUNTABLE.has(numericMl);
}

function calculateSampleDiscount(items: CartItem[]) {
  const unitsBySize = new Map<string, number[]>();

  for (const item of items) {
    if (!isDiscountableSample(item)) continue;

    const sizeKey = `${item.id}-${item.ml}`;
    const unitPrice = Number(item.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) continue;

    const bucket = unitsBySize.get(sizeKey) ?? [];
    for (let q = 0; q < item.qty; q += 1) bucket.push(unitPrice);
    unitsBySize.set(sizeKey, bucket);
  }

  let discount = 0;

  for (const units of unitsBySize.values()) {
    units.sort((a, b) => a - b);
    for (let i = 0; i < units.length; i += 1) {
      const pos = i + 1;
      if (pos % 4 === 0) {
        discount += units[i];
      } else if (pos % 3 === 0) {
        discount += units[i] * 0.5;
      }
    }
  }

  return Math.round(discount * 100) / 100;
}

function normalizeCartItem(item: CartItem) {
  const numericMl = Number(item.ml);
  const inferredIsFull = Number.isFinite(numericMl) ? numericMl > 10 : false;
  return {
    ...item,
    qty: Math.max(1, Number(item.qty) || 1),
    isFull: typeof item.isFull === "boolean" ? item.isFull : inferredIsFull,
  };
}

const MORE_FRAGRANCES: Fragrance[] = [
  {
    id: 8,
    house: "Tom Ford",
    name: "Lost Cherry",
    notes: { top: ["Black Cherry", "Cherry Liqueur", "Bitter Almond"], heart: ["Griotte Syrup", "Turkish Rose", "Jasmine Sambac", "Plum"], base: ["Peru Balsam", "Roasted Tonka Bean", "Sandalwood", "Vetiver", "Cedarwood"] },
    notesIt: { top: ["Black Cherry", "Cherry Liqueur", "Bitter Almond"], heart: ["Griotte Syrup", "Turkish Rose", "Jasmine Sambac", "Plum"], base: ["Peru Balsam", "Roasted Tonka Bean", "Sandalwood", "Vetiver", "Cedarwood"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 20 }, { ml: 5, price: 50 }, { ml: 10, price: 100 }, { ml: 100, price: 499, full: true }],
    description: "A bold and indulgent fragrance that explores the contrast between sweet, candy-like outer layers and a rich, luscious core of exotic cherry and liqueur. It blends the warmth of roasted tonka and sandalwood with a provocative boozy edge.",
    descriptionIt: "Una fragranza audace e avvolgente che unisce dolcezze caramellate a un cuore ricco di ciliegia esotica e liquore, con note calde di tonka tostato e legno di sandalo dal tocco alcolico e seducente.",
    emoji: "\ud83c\udf52",
    image: imgLostCherry,
    rating: 4.9,
    reviews: 311,
  },
  {
    id: 9,
    house: "Xerjoff",
    name: "Naxos",
    notes: { top: ["Lavender", "Bergamot", "Lemon", "Omani Incense"], heart: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"], base: ["Tobacco Leaf", "Vanilla", "Tonka Bean"] },
    notesIt: { top: ["Lavender", "Bergamot", "Lemon", "Omani Incense"], heart: ["Honey", "Cinnamon", "Cashmeran", "Jasmine Sambac"], base: ["Tobacco Leaf", "Vanilla", "Tonka Bean"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 18 }, { ml: 10, price: 35 }, { ml: 100, price: 195, full: true }],
    description: "An ornate olfactory tribute to Sicily, this fragrance blends Mediterranean freshness with golden honey and warm tobacco to celebrate Italian heritage and culture.",
    descriptionIt: "Un omaggio olfattivo raffinato alla Sicilia, questa fragranza unisce la freschezza mediterranea al miele dorato e al tabacco caldo, celebrando l’eredità e la cultura italiana.",
    emoji: "\ud83c\udf6f",
    image: imgNaxos,
    rating: 4.7,
    reviews: 878,
  },
  {
    id: 10,
    house: "Parfums de Marly",
    name: "Delina",
    notes: { top: ["Rhubarb", "Lychee", "Bergamot", "Nutmeg", "Black Currant"], heart: ["Damascena Rose", "Nutmeg", "Peony", "Petalia", "Vanilla"], base: ["Cashmeran", "Musk", "Vetiver", "Cedar", "Incense"] },
    notesIt: { top: ["Rhubarb", "Lychee", "Bergamot", "Nutmeg", "Black Currant"], heart: ["Damascena Rose", "Nutmeg", "Peony", "Petalia", "Vanilla"], base: ["Cashmeran", "Musk", "Vetiver", "Cedar", "Incense"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 16 }, { ml: 5, price: 32 }, { ml: 10, price: 79 }, { ml: 75, price: 300, full: true }],
    description: "A modern floral masterpiece inspired by 18th-century French refinement, Delina is a vibrant tribute to femininity that blends the tart freshness of rhubarb and lychee with a lush, velvety heart of Damascena rose.",
    descriptionIt: "Delina è un capolavoro floreale moderno ispirato all’eleganza francese del XVIII secolo, un omaggio vibrante alla femminilità che unisce la freschezza frizzante di rabarbaro e litchi a un cuore vellutato di rosa Damascena.",
    emoji: "\ud83c\udf38",
    image: imgDelina,
    rating: 4.8,
    reviews: 980,
  },
  {
    id: 11,
    house: "Roja Parfums",
    name: "Elysium EDP",
    notes: { top: ["Grapefruit", "Lime", "Lemon", "Bergamot", "Lavender", "Musk", "Thyme", "Artemisia"], heart: ["Apple", "Blackcurrant", "Lily of the Valley", "Rose de Mai", "Jasmine de Grasse"], base: ["Ambergris", "Musk", "Leather", "Labdanum", "Benzoin", "Vanilla", "Vetiver", "Cedarwood", "Juniper Berry", "Cypriol", "Pink Pepper", "Galbanum"] },
    notesIt: { top: ["Grapefruit", "Lime", "Lemon", "Bergamot", "Lavender", "Musk", "Thyme", "Artemisia"], heart: ["Apple", "Blackcurrant", "Lily of the Valley", "Rose de Mai", "Jasmine de Grasse"], base: ["Ambergris", "Musk", "Leather", "Labdanum", "Benzoin", "Vanilla", "Vetiver", "Cedarwood", "Juniper Berry", "Cypriol", "Pink Pepper", "Galbanum"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 20 }, { ml: 10, price: 40 }, { ml: 100, price: 230, full: true }],
    description: "Elysium is a sophisticated citrus-woody scent designed to represent a journey toward paradise, blending ultra-fresh citrus bursts with a deep, heroic masculine base. Inspired by the Greek concept of the afterlife for the virtuous, it balances weightless brightness with the enduring strength of character through complex layers of fruits, florals, and noble woods.",
    descriptionIt: "Elysium è una fragranza agrumata-legnosa sofisticata che evoca un viaggio verso il paradiso, unendo fresche note di agrumi a una base maschile intensa e avvolgente. Ispirata al concetto greco dell’aldilà per i virtuosi, combina luminosità leggera e forza duratura con strati complessi di frutti, fiori e legni nobili.",
    emoji: "\u26a1",
    image: imgElysium,
    rating: 4.3,
    reviews: 328,
  },
  {
    id: 12,
    house: "Jo Malone",
    name: "Wood Sage & Sea Salt",
    notes: { top: ["Ambrette Seeds", "Grapefruit", "Buchu Leaf"], heart: ["Sea Salt", "Red Algae", "Plum", "Dried Fruit"], base: ["Sage", "Seaweed", "Driftwood", "Guaiac Wood"] },
    notesIt: { top: ["Ambrette Seeds", "Grapefruit", "Buchu Leaf"], heart: ["Sea Salt", "Red Algae", "Plum", "Dried Fruit"], base: ["Sage", "Seaweed", "Driftwood", "Guaiac Wood"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 9 }, { ml:  5, price:  14 }, { ml:  10, price:  28 }, { ml:  100, price:  140, full:  true }],
    description: "A spirited, fresh, and mineral fragrance that captures the essence of a windswept British coastline with notes of sea salt and earthy sage. It evokes a sense of freedom and natural beauty through a complex combination of wood and sea.",
    descriptionIt: "Una fragranza vivace, fresca e minerale che cattura l’essenza della costa britannica battuta dal vento, con note di sale marino e salvia terrosa. Evoca libertà e bellezza naturale grazie a un mix unico di legno e mare.",
    emoji: "\ud83c\udf0a",
    image: imgWoodSageSeaSalt,
    rating: 4.4,
    reviews: 928,
  },
  {
    id: 13,
    house: "Maison Margiela",
    name: "Beach Walk UNISEX",
    notes: { top: ["Bergamot", "Lemon", "Pink Pepper"], heart: ["Ylang-Ylang", "Coconut Milk", "Heliotrope", "Transluzone"], base: ["Musk", "Benzoin", "Cedarwood", "White Musks"] },
    notesIt: { top: ["Bergamot", "Lemon", "Pink Pepper"], heart: ["Ylang-Ylang", "Coconut Milk", "Heliotrope", "Transluzone"], base: ["Musk", "Benzoin", "Cedarwood", "White Musks"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 9 }, { ml:  5, price:  13 }, { ml:  10, price:  25 }, { ml:  100, price:  140, full:  true }],
    description: "This sunny and invigorating fragrance captures the essence of a summer day on a sandy shore, blending the warmth of sun-kissed skin with the fresh, salty breeze of the Mediterranean. It masterfully recreates the nostalgic scent of sunscreen through creamy coconut milk and radiant ylang-ylang.",
    descriptionIt: "Questa fragranza solare e vivace cattura l’essenza di una giornata estiva sulla spiaggia, unendo il calore della pelle baciata dal sole alla fresca brezza salata del Mediterraneo, con note di latte di cocco cremoso e ylang-ylang radioso che evocano la dolce nostalgia della crema solare.",
    emoji: "\ud83c\udfd6\ufe0f",
    image: imgBeachWalk,
    rating: 4.9,
    reviews: 851,
  },
  {
    id: 14,
    house: "Kilian",
    name: "Love Don't Be Shy EDP",
    notes: { top: ["Neroli", "Bergamot", "Pink Pepper", "Coriander"], heart: ["Orange Blossom", "Honeysuckle", "Jasmine", "Marshmallow", "Iris", "Rose"], base: ["Sugar", "Vanilla", "Caramel", "Musk", "Civet", "Labdanum"] },
    notesIt: { top: ["Neroli", "Bergamot", "Pink Pepper", "Coriander"], heart: ["Orange Blossom", "Honeysuckle", "Jasmine", "Marshmallow", "Iris", "Rose"], base: ["Sugar", "Vanilla", "Caramel", "Musk", "Civet", "Labdanum"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml:  2, price:  20 }, { ml:  5, price:  45 }, { ml:  10, price:  89 }, { ml:  50, price:  290, full:  true }],
    description: "Inspired by the sweetness of marshmallow, this fragrance is a lush treat for connoisseurs that opens like a shy kiss and unfolds into a seductive, sugar-coated floral intensity.",
    descriptionIt: "Ispirata alla dolcezza del marshmallow, questa fragranza è un piacere raffinato che si apre come un bacio timido e si trasforma in un’intensa esplosione floreale zuccherata e seducente.",
    emoji: "\ud83c\udf6c",
    image: imgLoveDontBeShy,
    rating: 4.3,
    reviews: 918,
  },
  {
    id: 15,
    house: "Parfums de Marly",
    name: "Layton EDP",
    notes: { top: ["Apple", "Bergamot", "Cardamom"], heart: ["Lavender", "Violet", "Geranium"], base: ["Patchouli", "Vanilla", "Guaicwood", "Praline"] },
    notesIt: { top: ["Apple", "Bergamot", "Cardamom"], heart: ["Lavender", "Violet", "Geranium"], base: ["Patchouli", "Vanilla", "Guaicwood", "Praline"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 11 }, { ml:  5, price:  20 }, { ml:  10, price:  40 }, { ml:  125, price:  310, full:  true }],
    description: "A captivating and seductive amber-floral fragrance that captures the essence of the debonair with its fresh blend of apple and lavender, drying down to a rich, addictive vanilla and woody base.",
    descriptionIt: "Una fragranza ambrata e floreale, seducente e avvolgente, che unisce la freschezza di mela e lavanda a una base calda e irresistibile di vaniglia e legni pregiati.",
    emoji: "\ud83d\udc0e",
    image: imgLayton,
    rating: 4.6,
    reviews: 912,
  },
  {
    id: 16,
    house: "Xerjoff",
    name: "Erba Pura EDP",
    notes: { top: ["Sicilian Orange", "Sicilian Lemon", "Calabrian Bergamot"], heart: ["Mediterranean Fruits"], base: ["White Musk", "Madagascar Vanilla Beans", "Amber"] },
    notesIt: { top: ["Sicilian Orange", "Sicilian Lemon", "Calabrian Bergamot"], heart: ["Mediterranean Fruits"], base: ["White Musk", "Madagascar Vanilla Beans", "Amber"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 15 }, { ml:  5, price:  29 }, { ml:  10, price:  59 }, { ml:  50, price:  179, full:  true }],
    description: "A vibrant and modern fragrance that captures the essence of a Mediterranean golden hour, blending sparkling Italian citruses with a lush basket of fruits and a warm, velvety musky base.",
    descriptionIt: "Una fragranza vibrante e moderna che cattura l’essenza dell’ora dorata mediterranea, unendo agrumi italiani frizzanti a un ricco bouquet di frutti e una base muschiata calda e vellutata.",
    emoji: "\ud83c\udf4a",
    image: imgErbaPura,
    rating: 4.8,
    reviews: 678,
  },
  {
    id: 17,
    house: "Acqua di Parma",
    name: "Acqua di Parma EDP",
    notes: { top: ["Sicilian Lemon", "Calabrian Bergamot", "Sweet Orange"], heart: ["Lavender", "Bulgarian Rose", "Jasmine", "Rosemary", "Verbena"], base: ["Vetiver", "Sandalwood", "Patchouli", "Amber", "White Musk"] },
    notesIt: { top: ["Sicilian Lemon", "Calabrian Bergamot", "Sweet Orange"], heart: ["Lavender", "Bulgarian Rose", "Jasmine", "Rosemary", "Verbena"], base: ["Vetiver", "Sandalwood", "Patchouli", "Amber", "White Musk"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml:  2, price:  13 }, { ml:  5, price:  27 }, { ml:  10, price:  56 }, { ml:  50, price:  170, full:  true }],
    description: "A timeless emblem of Italian elegance, this radiant cologne opens with sparkling Sicilian citrus before unfolding into a refined heart of aromatic herbs and soft florals on a warm woody base.",
    descriptionIt: "Un'icona senza tempo dell'eleganza italiana, questa colonia luminosa si apre con agrumi siciliani frizzanti per poi svelare un cuore raffinato di erbe aromatiche e fiori delicati su una base calda e legnosa.",
    emoji: "\ud83c\udf4b",
    image: imgAcquaDiParma,
    rating: 4.9,
    reviews: 205,
  },
  {
    id: 18,
    house: "Maison Margiela",
    name: "By the Fireplace EDT",
    notes: { top: ["Cloves", "Pink Pepper", "Orange Blossom"], heart: ["Chestnut Accord", "Guaiac Wood Oil", "Juniper/Cade Oil"], base: ["Vanilla", "Peru Balsam", "Cashmeran"] },
    notesIt: { top: ["Cloves", "Pink Pepper", "Orange Blossom"], heart: ["Chestnut Accord", "Guaiac Wood Oil", "Juniper/Cade Oil"], base: ["Vanilla", "Peru Balsam", "Cashmeran"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 17 }, { ml:  10, price:  28 }, { ml:  100, price:  160, full:  true }],
    description: "Evoking the cozy atmosphere of a crackling fire in a Chamonix chalet, this fragrance blends the smokiness of burning wood with the addictive sweetness of roasted chestnuts and vanilla.",
    descriptionIt: "Richiama l’atmosfera accogliente di un camino scoppiettante in un chalet di Chamonix, con note di legno bruciato, castagne tostate e vaniglia irresistibile.",
    emoji: "\ud83d\udd25",
    image: imgByTheFireplace,
    rating: 4.8,
    reviews: 540,
  },
  {
    id: 19,
    house: "Paco Rabanne",
    name: "1 Million ELIXIR",
    notes: { top: ["Blood Mandarin", "Grapefruit", "Peppermint"], heart: ["Cinnamon", "Rose Absolute", "Spicy Notes"], base: ["Leather", "Amber", "Indian Patchouli", "Woody Notes"] },
    notesIt: { top: ["Blood Mandarin", "Grapefruit", "Peppermint"], heart: ["Cinnamon", "Rose Absolute", "Spicy Notes"], base: ["Leather", "Amber", "Indian Patchouli", "Woody Notes"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 7 }, { ml: 5, price: 12 }, { ml:  10, price:  18 }, { ml:  100, price:  92, full:  true }],
    description: "This iconic fragrance for men is designed for the bold and flamboyant, blending fresh citrus with warm spices and a smooth leathery finish. It is a striking scent that represents power, wealth, and luxury.",
    descriptionIt: "Questa fragranza iconica per uomo, pensata per chi ama osare, unisce agrumi freschi a spezie calde e un tocco di cuoio morbido. Un profumo che incarna potere, ricchezza e lusso.",
    emoji: "\ud83d\udcb0",
    image: imgOneMillion,
    rating: 4.7,
    reviews: 731,
  },
  {
    id: 20,
    house: "Kilian",
    name: "Angels' Share EDP",
    notes: { top: ["Cognac"], heart: ["Cinnamon", "Tonka Bean", "Oak", "Hedione"], base: ["Vanilla", "Praline", "Sandalwood", "Candied Almond"] },
    notesIt: { top: ["Cognac"], heart: ["Cinnamon", "Tonka Bean", "Oak", "Hedione"], base: ["Vanilla", "Praline", "Sandalwood", "Candied Almond"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 19 }, { ml:  5, price:  38 }, { ml:  10, price:  75 }, { ml:  50, price:  250, full:  true }],
    description: "Inspired by the legendary cognac heritage of Kilian Hennessy, this intoxicating blend evokes the ethereal 'angels' share' through a sophisticated mixture of liquor, spice, and warm woods.",
    descriptionIt: "Ispirato alla leggendaria eredità del cognac Kilian Hennessy, questo blend avvolgente unisce liquore, spezie e caldi legni per evocare la magica 'parte degli angeli'.",
    emoji: "\ud83e\udd43",
    image: imgAngelsShare,
    rating: 4.8,
    reviews: 434,
  },
  {
    id: 21,
    house: "Gucci",
    name: "Flora EDP",
    notes: { top: ["Citruses", "Peony", "Mandarin Orange"], heart: ["Osmanthus", "Rose"], base: ["Sandalwood", "Patchouli", "Pink Pepper"] },
    notesIt: { top: ["Citruses", "Peony", "Mandarin Orange"], heart: ["Osmanthus", "Rose"], base: ["Sandalwood", "Patchouli", "Pink Pepper"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 9 }, { ml:  5, price:  13 }, { ml:  10, price:  27 }, { ml:  100, price:  120, full:  true }],
    description: "Inspired by the iconic floral scarf designed for Princess Grace of Monaco, this more intense and sophisticated version of the original scent offers a rich, velvety floral experience with an elegant, long-lasting trail.",
    descriptionIt: "Ispirata alla sciarpa floreale iconica creata per la Principessa Grace di Monaco, questa versione più intensa e sofisticata della fragranza originale regala un’esperienza floreale ricca e vellutata con una scia elegante e persistente.",
    emoji: "\ud83c\udf3a",
    image: imgGucciFlora,
    rating: 4.5,
    reviews: 684,
  },
  {
    id: 22,
    house: "Chanel",
    name: "Coco Mademoiselle EDP V",
    notes: { top: ["Orange", "Mandarin Orange", "Bergamot", "Orange Blossom"], heart: ["Turkish Rose", "Jasmine", "Mimosa", "Ylang-Ylang"], base: ["Patchouli", "White Musk", "Vanilla", "Vetiver", "Tonka Bean", "Opoponax"] },
    notesIt: { top: ["Orange", "Mandarin Orange", "Bergamot", "Orange Blossom"], heart: ["Turkish Rose", "Jasmine", "Mimosa", "Ylang-Ylang"], base: ["Patchouli", "White Musk", "Vanilla", "Vetiver", "Tonka Bean", "Opoponax"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 12 }, { ml:  5, price:  22 }, { ml:  10, price:  44 }, { ml:  100, price:  220, full:  true }],
    description: "A bold and free-spirited ambery fragrance that blends vibrant citrus sparks with a sophisticated floral heart and a rich, woody base. It captures the essence of a modern, independent woman who is ready to reinvent herself every day.",
    descriptionIt: "Una fragranza ambrata audace e libera che unisce scintille agrumate a un cuore floreale sofisticato e una base legnosa intensa. L’essenza di una donna moderna e indipendente, pronta a reinventarsi ogni giorno.",
    emoji: "\ud83e\ude77",
    image: imgCocoMademoiselle,
    rating: 4.9,
    reviews: 571,
  },
  {
    id: 23,
    house: "Armani",
    name: "Si EDP",
    notes: { top: ["Cassis", "Blackcurrant Nectar", "Mandarin Orange", "Bergamot", "Sicilian Bergamot"], heart: ["May Rose", "Freesia", "Orange Blossom", "Jasmine", "Neroli"], base: ["Vanilla", "Patchouli", "Woody Notes", "Ambroxan", "White Musk", "Sandalwood"] },
    notesIt: { top: ["Cassis", "Blackcurrant Nectar", "Mandarin Orange", "Bergamot", "Sicilian Bergamot"], heart: ["May Rose", "Freesia", "Orange Blossom", "Jasmine", "Neroli"], base: ["Vanilla", "Patchouli", "Woody Notes", "Ambroxan", "White Musk", "Sandalwood"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 8 }, { ml:  5, price:  12 }, { ml:  10, price:  24 }, { ml:  100, price:  120, full:  true }],
    description: "A sophisticated and timeless fruity chypre that celebrates modern femininity, blending a luscious blackcurrant nectar with an elegant floral heart and a warm, woody base.",
    descriptionIt: "Un chypre fruttato sofisticato e senza tempo che celebra la femminilità moderna, unendo il succo succoso di ribes nero a un cuore floreale elegante e una base calda e legnosa.",
    emoji: "\ud83c\udf39",
    image: imgArmaniSi,
    rating: 4.6,
    reviews: 232,
  },
  {
    id: 24,
    house: "Dolce & Gabbana",
    name: "The One MEN",
    notes: { top: ["Grapefruit", "Coriander", "Basil"], heart: ["Cardamom", "Ginger", "Orange Blossom"], base: ["Amber", "Tobacco", "Cedar"] },
    notesIt: { top: ["Grapefruit", "Coriander", "Basil"], heart: ["Cardamom", "Ginger", "Orange Blossom"], base: ["Amber", "Tobacco", "Cedar"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 17 }, { ml:  10, price:  28 }, { ml:  100, price:  165, full:  true }],
    description: "An intensified version of the original masterpiece, this fragrance offers a deeper olfactory experience for the refined man, blending vibrant spices with a warm, magnetic base of tobacco and amber.",
    descriptionIt: "Una versione intensificata del capolavoro originale, questa fragranza offre un’esperienza olfattiva più profonda per l’uomo raffinato, unendo spezie vivaci a una base calda e magnetica di tabacco e ambra.",
    emoji: "\ud83d\udd76\ufe0f",
    image: imgTheOne,
    rating: 4.9,
    reviews: 884,
  },
  {
    id: 25,
    house: "Acqua di Parma",
    name: "Colonia Assoluta",
    notes: { top: ["Bitter Orange", "Bergamot", "Lemon Verbena", "Sweet Orange"], heart: ["Ylang-Ylang", "Vetiver", "Jasmine", "Cedar", "Pink Pepper", "Cardamom", "Paprika"], base: ["Oakmoss", "Resins", "White Musk", "Patchouli"] },
    notesIt: { top: ["Bitter Orange", "Bergamot", "Lemon Verbena", "Sweet Orange"], heart: ["Ylang-Ylang", "Vetiver", "Jasmine", "Cedar", "Pink Pepper", "Cardamom", "Paprika"], base: ["Oakmoss", "Resins", "White Musk", "Patchouli"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 28 }, { ml:  10, price:  50 }, { ml:  50, price:  185, full:  true }],
    description: "Created by master perfumers Jean-Claude Ellena and Bertrand Duchaufour, this fragrance is a sophisticated reimagining of the classic Italian cologne, blending vibrant citrus with an aromatic, spicy heart and a warm, woody base.",
    descriptionIt: "Creato dai maestri profumieri Jean-Claude Ellena e Bertrand Duchaufour, questo profumo rivisita con eleganza la classica colonia italiana, unendo agrumi vivaci a un cuore aromatico e speziato e una base calda e legnosa.",
    emoji: "\ud83c\udf4a",
    image: imgColoniaAssoluta,
    rating: 4.9,
    reviews: 464,
  },
  {
    id: 26,
    house: "Chanel",
    name: "Bleu de Chanel EDP",
    notes: { top: ["Grapefruit", "Lemon", "Mint", "Bergamot", "Pink Pepper", "Aldehydes", "Coriander"], heart: ["Ginger", "Nutmeg", "Jasmine", "Melon"], base: ["Incense", "Amber", "Cedar", "Sandalwood", "Amberwood", "Patchouli", "Labdanum"] },
    notesIt: { top: ["Grapefruit", "Lemon", "Mint", "Bergamot", "Pink Pepper", "Aldehydes", "Coriander"], heart: ["Ginger", "Nutmeg", "Jasmine", "Melon"], base: ["Incense", "Amber", "Cedar", "Sandalwood", "Amberwood", "Patchouli", "Labdanum"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml:  2, price:  9 }, { ml:  5, price:  16 }, { ml:  10, price:  33 }, { ml:  100, price:  137, full:  true }],
    description: "A sophisticated aromatic-woody composition that balances fresh citrus notes with deep, velvet amber woods for a timeless and elegant masculine spirit.",
    descriptionIt: "Una composizione aromatica-legnosa sofisticata che unisce note fresche di agrumi a legni ambrati vellutati, per uno spirito maschile senza tempo ed elegante.",
    emoji: "\ud83d\udfe6",
    image: imgBleuDeChanelEDP,
    rating: 4.8,
    reviews: 749,
  },
  {
    id: 27,
    house: "Dolce & Gabbana",
    name: "Light Blue EDP",
    notes: { top: ["Sicilian Lemon", "Calabrian Bergamot", "Pink Pepper"], heart: ["Frangipani", "Marigold", "Cinnamon"], base: ["Amberwood", "Benzoin"] },
    notesIt: { top: ["Sicilian Lemon", "Calabrian Bergamot", "Pink Pepper"], heart: ["Frangipani", "Marigold", "Cinnamon"], base: ["Amberwood", "Benzoin"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 10 }, { ml: 5, price: 17 }, { ml:  10, price:  30 }, { ml:  100, price:  185, full:  true }],
    description: "This luminous fragrance reimagines the iconic Mediterranean scent, blending sparkling citrus with creamy floral notes and a sensual woody trail to evoke the warmth of sun-kissed skin.",
    descriptionIt: "Questa fragranza luminosa reinterpreta l’iconico profumo mediterraneo, unendo agrumi frizzanti a note floreali cremose e un sentore legnoso sensuale che richiama il calore della pelle baciata dal sole.",
    emoji: "\ud83d\udca0",
    image: imgLightBlueEDP,
    rating: 4.3,
    reviews: 651,
  },
  {
    id: 28,
    house: "Giorgio Armani",
    name: "Acqua di Gi\u00f2 Profumo EDP",
    notes: { top: ["Sea Notes", "Bergamot"], heart: ["Rosemary", "Sage", "Geranium"], base: ["Incense", "Patchouli"] },
    notesIt: { top: ["Sea Notes", "Bergamot"], heart: ["Rosemary", "Sage", "Geranium"], base: ["Incense", "Patchouli"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 21 }, { ml: 10, price: 39 }, { ml: 75, price: 195, full: true }],
    description: "An elegant and deep aromatic aquatic fragrance that symbolizes the raw power of the ocean merging with black volcanic rocks, blending intense marine freshness with a dark, smoky incense base.",
    descriptionIt: "Una fragranza acquatica elegante e intensa che unisce la potenza selvaggia dell’oceano alle rocce vulcaniche nere, fondendo una freschezza marina vibrante con una base fumé di incenso.",
    emoji: "\ud83c\udf0a",
    image: imgAcquaDiGioProfumo,
    rating: 4.7,
    reviews: 704,
  },
  {
    id: 29,
    house: "Dior",
    name: "Homme Intense EDP",
    notes: { top: ["Lavender"], heart: ["Iris", "Ambrette (Musk Mallow)", "Pear"], base: ["Virginia Cedar", "Vetiver"] },
    notesIt: { top: ["Lavender"], heart: ["Iris", "Ambrette (Musk Mallow)", "Pear"], base: ["Virginia Cedar", "Vetiver"] },
    family: "\u2014",
    familyIt: "\u2014",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 10 }, { ml:  5, price:  14 }, { ml:  10, price:  29 }, { ml:  100, price:  145, full:  true }],
    description: "Like a sharply tailored Dior suit, Dior Homme Intense is the olfactive interpretation of modern masculinity. This masculine fragrance reveals the sophistication of a powerful eau de parfum, blending the olfactive intensity of powdery iris with a sensual ambery facet and a precious warm cedarwood base.",
    descriptionIt: "Come un abito Dior su misura, Dior Homme Intense è l’interpretazione olfattiva della mascolinità moderna. Questa fragranza maschile svela la sofisticatezza di un eau de parfum potente, unendo l’intensità irisata e cipriata a una sfumatura ambrata sensuale e a una preziosa base calda di legno di cedro.",
    emoji: "\ud83d\udda4",
    image: imgDiorHommeIntense,
    rating: 4.3,
    reviews: 338,
  },
  {
    id: 30,
    house: "YSL",
    name: "Black Opium",
    notes: { top: ["Pink Pepper", "Orange Blossom", "Pear"], heart: ["Coffee", "Jasmine", "Bitter Almond"], base: ["Patchouli", "Vanilla", "Cashmere Wood", "White Musk"] },
    notesIt: { top: ["Pepe Rosa", "Fiori d'Arancio", "Pera"], heart: ["Caffè", "Gelsomino", "Mandorla Amara"], base: ["Patchouli", "Vaniglia", "Legno Cashmere", "Muschio Bianco"] },
    family: "Oriental Gourmand",
    familyIt: "Orientale Gourmand",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 18 }, { ml: 10, price: 35 }, { ml: 90, price: 185, full: true }],
    description: "A rock-chic, addictive fragrance built around a bold coffee and jasmine heart, wrapped in a sweet vanilla and patchouli base. One of the best-selling women's fragrances in Europe.",
    descriptionIt: "Una fragranza rock-chic e avvolgente con un cuore audace di caffè e gelsomino, avvolta in una base dolce di vaniglia e patchouli. Tra i profumi femminili più venduti in Europa.",
    badge: "Bestseller",
    emoji: "☕",
    image: imgBlackOpium,
    rating: 4.8,
    reviews: 2100,
  },
  {
    id: 31,
    house: "Lancôme",
    name: "La Vie est Belle",
    notes: { top: ["Blackcurrant", "Pear"], heart: ["Iris", "Jasmine", "Orange Blossom"], base: ["Praline", "Vanilla", "Patchouli", "Sandalwood", "Musk"] },
    notesIt: { top: ["Cassis", "Pera"], heart: ["Iris", "Gelsomino", "Fiori d'Arancio"], base: ["Praline", "Vaniglia", "Patchouli", "Legno di Sandalo", "Muschio"] },
    family: "Floral Gourmand",
    familyIt: "Floreale Gourmand",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 13 }, { ml: 10, price: 23 }, { ml: 100, price: 100, full: true }],
    description: "A joyful and radiant fragrance that celebrates the beauty of life. An iris and jasmine floral heart rests on a warm, addictive gourmand base of praline and vanilla.",
    descriptionIt: "Una fragranza gioiosa e radiosa che celebra la bellezza della vita. Un cuore floreale di iris e gelsomino poggia su una base gourmand calda e irresistibile di praline e vaniglia.",
    emoji: "🌸",
    image: imgLaVieEstBelle,
    rating: 4.7,
    reviews: 1850,
  },
  {
    id: 32,
    house: "Parfums de Marly",
    name: "Herod EDP",
    notes: { top: ["Cinnamon", "Pepper", "Bergamot"], heart: ["Tobacco", "Osmanthus", "Cypress"], base: ["Vanilla", "Sandalwood", "Patchouli", "Cedarwood"] },
    notesIt: { top: ["Cannella", "Pepe", "Bergamotto"], heart: ["Tabacco", "Osmanto", "Cipresso"], base: ["Vaniglia", "Legno di Sandalo", "Patchouli", "Cedro"] },
    family: "Oriental Woody",
    familyIt: "Orientale Legnoso",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 25 }, { ml: 10, price: 51 }, { ml: 75, price: 250, full: true }],
    description: "A regal and smoky masculine fragrance that pairs warm tobacco with creamy sandalwood and exotic spices. The signature scent for those who command attention in every room.",
    descriptionIt: "Una fragranza maschile regale e affumicata che unisce tabacco caldo a legno di sandalo cremoso e spezie esotiche. Il profumo distintivo di chi conquista ogni stanza.",
    badge: "Cult",
    emoji: "🤴",
    image: imgHerod,
    rating: 4.8,
    reviews: 920,
  },
  {
    id: 33,
    house: "Byredo",
    name: "Gypsy Water EDP",
    notes: { top: ["Bergamot", "Lemon", "Pepper", "Juniper Berries"], heart: ["Incense", "Orris", "Pine Needles"], base: ["Amber", "Vanilla", "Sandalwood"] },
    notesIt: { top: ["Bergamotto", "Limone", "Pepe", "Bacche di Ginepro"], heart: ["Incenso", "Iris", "Aghi di Pino"], base: ["Ambra", "Vaniglia", "Legno di Sandalo"] },
    family: "Woody Aromatic",
    familyIt: "Legnoso Aromatico",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 23 }, { ml: 10, price: 44 }, { ml: 100, price: 265, full: true }],
    description: "A romantic, nomadic fragrance inspired by the free-spirited Romani people. It blends luminous citrus and green pine with warm incense and a deep, earthy amber base.",
    descriptionIt: "Una fragranza romantica e nomade ispirata alla libertà dei Romani. Unisce agrumi luminosi e pino verde a caldo incenso e una profonda base ambrata terrosa.",
    emoji: "🌿",
    image: imgGypsyWater,
    rating: 4.7,
    reviews: 680,
  },
  {
    id: 34,
    house: "Maison Margiela",
    name: "Replica Flower Market EDT",
    notes: { top: ["Rose", "Violet Leaf", "Bergamot"], heart: ["Rose Absolute", "Freesia", "Geranium"], base: ["White Musk", "Cedarwood", "Benzoin"] },
    notesIt: { top: ["Rosa", "Foglia di Violetta", "Bergamotto"], heart: ["Rosa Assoluta", "Fresia", "Geranio"], base: ["Muschio Bianco", "Cedro", "Benzoino"] },
    family: "Floral",
    familyIt: "Floreale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 10 }, { ml: 5, price: 14 }, { ml: 10, price: 29 }, { ml: 100, price: 135, full: true }],
    description: "A memory of a vibrant Parisian flower market on a spring morning. Fresh, dewy roses and freesia bloom with a clean, airy musk. A modern floral that smells effortlessly chic.",
    descriptionIt: "Il ricordo di un vivace mercato dei fiori parigino una mattina di primavera. Rose fresche e fresia sbocciano con un muschio pulito e arioso. Un floreale moderno dall'eleganza senza sforzo.",
    emoji: "🌹",
    image: imgReplicaFlowerMarket,
    rating: 4.6,
    reviews: 745,
  },
  {
    id: 35,
    house: "Amouage",
    name: "Reflection Man EDP",
    notes: { top: ["Neroli", "Rosemary", "Bergamot", "Lemon"], heart: ["Jasmine", "Rose", "Lily of the Valley", "Ylang-Ylang"], base: ["Sandalwood", "Musk", "Vetiver", "Amber"] },
    notesIt: { top: ["Neroli", "Rosmarino", "Bergamotto", "Limone"], heart: ["Gelsomino", "Rosa", "Mughetto", "Ylang-Ylang"], base: ["Legno di Sandalo", "Muschio", "Vetiver", "Ambra"] },
    family: "Floral Woody",
    familyIt: "Floreale Legnoso",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 15 }, { ml: 5, price: 29 }, { ml: 10, price: 58 }, { ml: 100, price: 385, full: true }],
    description: "A pristine and luminous masculine fragrance from Oman's most prestigious house. Reflection Man opens with a silvery burst of neroli and bergamot before unfolding into a breathtaking floral heart of jasmine and rose, anchored by a clean sandalwood base. Understated luxury at its finest.",
    descriptionIt: "Una fragranza maschile luminosa e cristallina della maison più prestigiosa dell'Oman. Reflection Man si apre con un'esplosione argentea di neroli e bergamotto, poi si apre in un cuore floreale mozzafiato di gelsomino e rosa, ancorato a una base pulita di legno di sandalo.",
    badge: "Niche",
    emoji: "🪞",
    image: imgReflectionMan,
    rating: 4.8,
    reviews: 540,
  },
  {
    id: 36,
    house: "Amouage",
    name: "Reflection Woman EDP",
    notes: { top: ["Ylang-Ylang", "Neroli", "Bergamot"], heart: ["Rose", "Jasmine", "Orris Root", "Lily of the Valley"], base: ["Sandalwood", "Musk", "Amber", "Vetiver"] },
    notesIt: { top: ["Ylang-Ylang", "Neroli", "Bergamotto"], heart: ["Rosa", "Gelsomino", "Radice di Iris", "Mughetto"], base: ["Legno di Sandalo", "Muschio", "Ambra", "Vetiver"] },
    family: "Floral Woody",
    familyIt: "Floreale Legnoso",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 29 }, { ml: 10, price: 58 }, { ml: 100, price: 405, full: true }],
    description: "The feminine counterpart to Reflection Man, this fragrance is a study in luminous simplicity. A gossamer veil of ylang-ylang and neroli gives way to a radiant heart of rose and jasmine, lifted by the powdery softness of orris root and resting on a warm, skin-like musk base.",
    descriptionIt: "La controparte femminile di Reflection Man, questa fragranza è uno studio di semplicità luminosa. Un velo etereo di ylang-ylang e neroli cede il passo a un cuore radiante di rosa e gelsomino, sollevato dalla morbidezza cipriata della radice d'iris.",
    emoji: "🪟",
    image: imgReflectionWoman,
    rating: 4.8,
    reviews: 490,
  },
  {
    id: 37,
    house: "Memo Paris",
    name: "Irish Leather",
    notes: { top: ["Grapefruit", "Coriander", "Ginger"], heart: ["Leather", "Orris Root", "Heliotrope"], base: ["Musk", "Ambergris", "Birch", "Cedarwood"] },
    notesIt: { top: ["Pompelmo", "Coriandolo", "Zenzero"], heart: ["Cuoio", "Radice di Iris", "Eliotropio"], base: ["Muschio", "Ambra Grigia", "Betulla", "Cedro"] },
    family: "Leather Woody",
    familyIt: "Cuoio Legnoso",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 15 }, { ml: 5, price: 28 }, { ml: 10, price: 59 }, { ml: 75, price: 280, full: true }],
    description: "Inspired by the wild, windswept landscapes of Ireland, this fragrance is a masterpiece of olfactory storytelling. Fresh grapefruit and spiced ginger open the journey before revealing a rugged, sophisticated heart of iris-dusted leather, finally settling into a warm, smoky birch and ambergris base.",
    descriptionIt: "Ispirata ai paesaggi selvaggi e ventosi dell'Irlanda, questa fragranza è un capolavoro di narrazione olfattiva. Il pompelmo fresco e lo zenzero speziato aprono il viaggio prima di rivelare un cuore di cuoio sofisticato e irisato.",
    badge: "Niche",
    emoji: "🍀",
    image: imgIrishLeather,
    rating: 4.7,
    reviews: 420,
  },
  {
    id: 38,
    house: "Juliette Has a Gun",
    name: "Not a Perfume",
    notes: { top: ["Ambroxan"], heart: ["Ambroxan"], base: ["Ambroxan"] },
    notesIt: { top: ["Ambroxan"], heart: ["Ambroxan"], base: ["Ambroxan"] },
    family: "Woody Amber",
    familyIt: "Legnoso Ambrato",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 14 }, { ml: 10, price: 29 }, { ml: 100, price: 125, full: true }],
    description: "A provocation distilled into a bottle. Not a Perfume is composed entirely of Ambroxan — a single synthetic molecule derived from ambergris — that reacts with each person's skin chemistry to create a completely unique, skin-like warmth. No top notes, no heart, no base. Just you, amplified.",
    descriptionIt: "Una provocazione distillata in un flacone. Not a Perfume è composto interamente di Ambroxan — una singola molecola sintetica derivata dall'ambra grigia — che reagisce con la chimica cutanea di ogni persona per creare un calore cutaneo unico. Solo tu, amplificato.",
    badge: "Viral",
    emoji: "🔬",
    image: imgNotAPerfume,
    rating: 4.6,
    reviews: 1100,
  },
  {
    id: 39,
    house: "Maison Francis Kurkdjian",
    name: "Baccarat Rouge 540 Extrait",
    notes: { top: ["Saffron", "Jasmine"], heart: ["Amberwood", "Ambergris", "Hedione"], base: ["Fir Resin", "Cedar Wood", "Ambroxan", "Sugar"] },
    notesIt: { top: ["Zafferano", "Gelsomino"], heart: ["Legno d'Ambra", "Ambra Grigia", "Hedione"], base: ["Resina di Abete", "Legno di Cedro", "Ambroxan", "Zucchero"] },
    family: "Floral Woody Amber",
    familyIt: "Floreale Legnoso Ambrato",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 20 }, { ml: 5, price: 40 }, { ml: 10, price: 82 }, { ml: 70, price: 399, full: true }],
    description: "The definitive version of the world's most coveted fragrance. The Extrait de Parfum concentrates the iconic BR540 formula to an extraordinary intensity — deeper, richer, more tenacious. The amber-woody signature glows on skin for hours, leaving an unforgettable sillage. For those who want more.",
    descriptionIt: "La versione definitiva della fragranza più ambita al mondo. L'Extrait de Parfum concentra l'iconica formula BR540 a un'intensità straordinaria — più profonda, più ricca, più tenace. La firma ambrata-legnosa splende sulla pelle per ore.",
    badge: "Exclusive",
    emoji: "💎",
    image: imgBaccaratRouge540Extrait,
    rating: 4.9,
    reviews: 680,
  },
  {
    id: 40,
    house: "Guerlain",
    name: "Mon Guerlain",
    notes: { top: ["Bergamot", "Lavender"], heart: ["Lavender", "Jasmine Sambac", "Sandalwood"], base: ["Vanilla", "Coumarin", "White Musk", "Cashmeran"] },
    notesIt: { top: ["Bergamotto", "Lavanda"], heart: ["Lavanda", "Gelsomino Sambac", "Legno di Sandalo"], base: ["Vaniglia", "Cumarina", "Muschio Bianco", "Cashmeran"] },
    family: "Floral Oriental",
    familyIt: "Floreale Orientale",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 12 }, { ml: 10, price: 24 }, { ml: 100, price: 120, full: true }],
    description: "A tender and sensual fragrance that captures the essence of femininity in bloom. A dreamy blend of Provence lavender and jasmine is wrapped in a creamy, addictive vanilla and coumarin base — soft, warm, and deeply romantic. One of the most loved women's fragrances in France.",
    descriptionIt: "Una fragranza tenera e sensuale che cattura l'essenza della femminilità in fiore. Un sogno di lavanda di Provenza e gelsomino avvolto in una base cremosa di vaniglia e cumarina — morbida, calda e profondamente romantica.",
    emoji: "💜",
    image: imgMonGuerlain,
    rating: 4.7,
    reviews: 1320,
  },
  {
    id: 41,
    house: "Valentino",
    name: "Uomo Born in Roma Coral Fantasy",
    notes: { top: ["Cardamom", "Bergamot", "Lemon", "Blue Lavender"], heart: ["Sage", "Jasmine", "Cedarwood"], base: ["Musk", "Haitian Vetiver", "Cashmeran"] },
    notesIt: { top: ["Cardamomo", "Bergamotto", "Limone", "Lavanda Blu"], heart: ["Salvia", "Gelsomino", "Legno di Cedro"], base: ["Muschio", "Vetiver Haitiano", "Cashmeran"] },
    family: "Aromatic Fresh",
    familyIt: "Aromatico Fresco",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 14 }, { ml: 10, price: 30 }, { ml: 100, price: 150, full: true }],
    description: "A vibrant and contemporary masculine fragrance born from the spirit of modern Rome. A lively burst of cardamom and bergamot gives way to an aromatic heart of blue lavender and sage, finishing on a warm, woody cashmeran and vetiver base. Confident, fresh, and unmistakably Italian.",
    descriptionIt: "Una fragranza maschile vibrante e contemporanea nata dallo spirito della Roma moderna. Un vivace apertura di cardamomo e bergamotto cede a un cuore aromatico di lavanda blu e salvia, finendo su una base calda e legnosa di cashmeran e vetiver.",
    emoji: "🌊",
    image: imgCoralFantasy,
    rating: 4.5,
    reviews: 390,
  },
  // ── NEW FRAGRANCES ────────────────────────────────────────────────────────
  {
    id: 43,
    house: "Abdul Samad Al Qurashi",
    name: "Erba Gold EDP",
    notes: { top: ["Bergamot", "Lemon", "Green Notes"], heart: ["Rose", "Iris", "Jasmine"], base: ["Oud", "Musk", "Sandalwood", "Amber"] },
    notesIt: { top: ["Bergamotto", "Limone", "Note Verdi"], heart: ["Rosa", "Iris", "Gelsomino"], base: ["Oud", "Muschio", "Sandalo", "Ambra"] },
    family: "Floral Oriental",
    familyIt: "Floreale Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 50 }, { ml: 100, price: 340, full: true }],
    description: "A golden oriental masterpiece from one of the oldest Arabian perfume houses. Erba Gold weaves citrus brightness with a lush floral heart and a rich, resinous oud base — opulent, timeless, and deeply luxurious.",
    descriptionIt: "Un capolavoro orientale dorato di una delle più antiche maison profumiere arabe. Intreccia freschezza citrica, cuore floreale lussureggiante e una ricca base di oud resinoso.",
    badge: "Niche",
    emoji: "🌿",
    image: imgFrag43,
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 44,
    house: "Jean Paul Gaultier",
    name: "Le Beau Le Parfum",
    notes: { top: ["Bergamot", "Coconut", "Lemon"], heart: ["Jasmine", "Vetiver"], base: ["Benzoin", "Musk", "Woody Notes"] },
    notesIt: { top: ["Bergamotto", "Cocco", "Limone"], heart: ["Gelsomino", "Vetiver"], base: ["Benzoino", "Muschio", "Note Legnose"] },
    family: "Aromatic Fresh",
    familyIt: "Aromatico Fresco",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 17 }, { ml: 10, price: 32 }, { ml: 75, price: 120, full: true }],
    description: "A sun-drenched masculine fragrance capturing the essence of Mediterranean paradise. Vibrant citrus and creamy coconut meet an elegant jasmine heart, grounded by a warm, sensual benzoin base.",
    descriptionIt: "Una fragranza maschile assolata che cattura l'essenza del paradiso mediterraneo. Agrumi vivaci e cocco cremoso incontrano un elegante cuore di gelsomino.",
    emoji: "🌊",
    image: imgFrag44,
    rating: 4.6,
    reviews: 318,
  },
  {
    id: 45,
    house: "Emporio Armani",
    name: "Stronger with You Intensely",
    notes: { top: ["Pink Pepper", "Cardamom", "Chestnut"], heart: ["Lavender", "Violet", "Sage"], base: ["Vanilla", "Caramel", "Sandalwood", "Patchouli"] },
    notesIt: { top: ["Pepe Rosa", "Cardamomo", "Castagna"], heart: ["Lavanda", "Viola", "Salvia"], base: ["Vaniglia", "Caramello", "Sandalo", "Patchouli"] },
    family: "Oriental Fougère",
    familyIt: "Fougère Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 17 }, { ml: 10, price: 32 }, { ml: 100, price: 160, full: true }],
    description: "A bold and seductive masculine fragrance that opens with spicy chestnut and pink pepper, leading to a warm, gourmand heart of vanilla and caramel. Modern, intense, and unforgettable.",
    descriptionIt: "Una fragranza maschile audace e seducente che si apre con castagna speziata e pepe rosa, portando a un cuore caldo di vaniglia e caramello.",
    badge: "Bestseller",
    emoji: "🔥",
    image: imgFrag45,
    rating: 4.7,
    reviews: 562,
  },
  {
    id: 46,
    house: "Jean Paul Gaultier",
    name: "Le Male Le Parfum",
    notes: { top: ["Bergamot", "Mint"], heart: ["Lavender", "Vanilla Bourbon"], base: ["Vanilla", "Tonka Bean", "Sandalwood"] },
    notesIt: { top: ["Bergamotto", "Menta"], heart: ["Lavanda", "Vaniglia Bourbon"], base: ["Vaniglia", "Fava Tonka", "Sandalo"] },
    family: "Oriental Fougère",
    familyIt: "Fougère Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 18 }, { ml: 10, price: 34 }, { ml: 75, price: 133, full: true }],
    description: "The darkest, most intense chapter of the Le Male saga. A deep, opulent masculine fragrance that deepens the iconic lavender-vanilla DNA with rich Bourbon vanilla and smooth sandalwood.",
    descriptionIt: "Il capitolo più scuro e intenso della saga Le Male. Una fragranza maschile opulenta che approfondisce il DNA iconico lavanda-vaniglia con ricca vaniglia Bourbon.",
    emoji: "⚓",
    image: imgFrag46,
    rating: 4.7,
    reviews: 445,
  },
  {
    id: 47,
    house: "Jean Paul Gaultier",
    name: "Le Male Elixir",
    notes: { top: ["Cardamom", "Violet Leaf", "Lavender"], heart: ["Iris", "Honey", "Heliotrope"], base: ["Vanilla", "Benzoin", "Sandalwood", "Amber"] },
    notesIt: { top: ["Cardamomo", "Foglia di Viola", "Lavanda"], heart: ["Iris", "Miele", "Eliotropio"], base: ["Vaniglia", "Benzoino", "Sandalo", "Ambra"] },
    family: "Oriental Fougère",
    familyIt: "Fougère Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 19 }, { ml: 10, price: 35 }, { ml: 75, price: 138, full: true }],
    description: "The most precious interpretation of Le Male. An elixir of spiced iris and honey unfurls over a deeply sensual amber-vanilla base, creating an incredibly rich, intimate, and addictive masculine statement.",
    descriptionIt: "L'interpretazione più preziosa di Le Male. Un elisir di iris speziato e miele si dispiega su una base ambrata-vanigliata profondamente sensuale.",
    badge: "Exclusive",
    emoji: "✨",
    image: imgFrag47,
    rating: 4.8,
    reviews: 287,
  },
  {
    id: 48,
    house: "Armaf",
    name: "Club de Nuit Intense Man",
    notes: { top: ["Pineapple", "Lemon", "Apple", "Blackcurrant"], heart: ["Birch", "Jasmine", "Rose"], base: ["Musk", "Ambergris", "Vanilla", "Patchouli"] },
    notesIt: { top: ["Ananas", "Limone", "Mela", "Ribes Nero"], heart: ["Betulla", "Gelsomino", "Rosa"], base: ["Muschio", "Ambra Grigia", "Vaniglia", "Patchouli"] },
    family: "Woody Fruity",
    familyIt: "Legnoso Fruttato",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 7 }, { ml: 5, price: 13 }, { ml: 10, price: 24 }, { ml: 100, price: 80, full: true }],
    description: "A celebrated Aventus-inspired powerhouse that delivers fresh pineapple, smoky birch, and rich ambergris at an accessible price point. Legendary performance and projection — a cult favorite worldwide.",
    descriptionIt: "Un powerhouse ispirato ad Aventus che offre ananas fresco, betulla affumicata e ambra grigia a un prezzo accessibile. Leggendaria performance.",
    badge: "Cult",
    emoji: "🍍",
    image: imgFrag48,
    rating: 4.6,
    reviews: 892,
  },
  {
    id: 49,
    house: "Emporio Armani",
    name: "Stronger with You Absolutely",
    notes: { top: ["Black Pepper", "Cardamom", "Bergamot"], heart: ["Sage", "Lavender", "Coffee"], base: ["Vanilla", "Woody Notes", "Leather", "Benzoin"] },
    notesIt: { top: ["Pepe Nero", "Cardamomo", "Bergamotto"], heart: ["Salvia", "Lavanda", "Caffè"], base: ["Vaniglia", "Note Legnose", "Cuoio", "Benzoino"] },
    family: "Aromatic Oriental",
    familyIt: "Aromatico Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 18 }, { ml: 10, price: 34 }, { ml: 100, price: 175, full: true }],
    description: "The absolute pinnacle of the Stronger with You collection. Rich coffee and pepper meet an addictive leather-vanilla depth — bold, sophisticated, and utterly captivating.",
    descriptionIt: "Il vertice assoluto della collezione Stronger with You. Caffè ricco e pepe incontrano una profondità cuoio-vaniglia irresistibile.",
    emoji: "💪",
    image: imgFrag49,
    rating: 4.7,
    reviews: 334,
  },
  {
    id: 50,
    house: "Azzaro",
    name: "Most Wanted",
    notes: { top: ["Bergamot", "Cardamom", "Ginger"], heart: ["Cinnamon", "Violet", "Leather"], base: ["Vanilla", "Vetiver", "Tonka Bean"] },
    notesIt: { top: ["Bergamotto", "Cardamomo", "Zenzero"], heart: ["Cannella", "Viola", "Cuoio"], base: ["Vaniglia", "Vetiver", "Fava Tonka"] },
    family: "Woody Spicy",
    familyIt: "Legnoso Speziato",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 16 }, { ml: 10, price: 30 }, { ml: 100, price: 134, full: true }],
    description: "A smooth and irresistible masculine fragrance that layers warm spices of cardamom and cinnamon with a suave leather heart and a creamy vanilla-tonka base. Charming, confident, and highly wearable.",
    descriptionIt: "Una fragranza maschile liscia e irresistibile che unisce spezie calde di cardamomo e cannella a un cuore di cuoio e una base cremosa di vaniglia.",
    emoji: "🎯",
    image: imgFrag50,
    rating: 4.6,
    reviews: 478,
  },
  {
    id: 51,
    house: "Jean Paul Gaultier",
    name: "Le Beau Paradise Garden",
    notes: { top: ["Bergamot", "Orange", "Coconut"], heart: ["Jasmine", "Lily", "Tuberose"], base: ["Musk", "Benzoin", "Cedar"] },
    notesIt: { top: ["Bergamotto", "Arancia", "Cocco"], heart: ["Gelsomino", "Giglio", "Tuberosa"], base: ["Muschio", "Benzoino", "Cedro"] },
    family: "Floral Fruity",
    familyIt: "Floreale Fruttato",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 18 }, { ml: 10, price: 33 }, { ml: 75, price: 125, full: true }],
    description: "A tropical paradise in a bottle. Le Beau Paradise Garden explodes with sun-kissed citrus and coconut before surrendering to an exotic white floral heart — a sensory escape to an idyllic garden.",
    descriptionIt: "Un paradiso tropicale in un flacone. Esplode con agrumi e cocco baciati dal sole prima di cedere a un esotico cuore di fiori bianchi.",
    emoji: "🌺",
    image: imgFrag51,
    rating: 4.5,
    reviews: 256,
  },
  {
    id: 52,
    house: "Jean Paul Gaultier",
    name: "Ultra Male",
    notes: { top: ["Pear", "Bergamot", "Lavender"], heart: ["Iris", "Vanilla", "Liquorice"], base: ["Amber", "Tonka Bean", "Musk"] },
    notesIt: { top: ["Pera", "Bergamotto", "Lavanda"], heart: ["Iris", "Vaniglia", "Liquirizia"], base: ["Ambra", "Fava Tonka", "Muschio"] },
    family: "Oriental Fougère",
    familyIt: "Fougère Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 17 }, { ml: 10, price: 32 }, { ml: 75, price: 115, full: true }],
    description: "A sweeter, more seductive cousin to Le Male. Ultra Male leads with juicy pear and spiced lavender, then unfolds into a rich heart of vanilla and liquorice — impossibly addictive and crowd-pleasing.",
    descriptionIt: "Un cugino più dolce e seducente di Le Male. Si apre con pera succosa e lavanda speziata, poi si dispiega in un ricco cuore di vaniglia e liquirizia.",
    emoji: "🍐",
    image: imgFrag52,
    rating: 4.6,
    reviews: 534,
  },
  {
    id: 53,
    house: "Valentino",
    name: "Uomo Intense EDP",
    notes: { top: ["Bergamot", "Iris", "Cardamom"], heart: ["Coffee", "Tobacco", "Labdanum"], base: ["Leather", "Amber", "Patchouli", "Vanilla"] },
    notesIt: { top: ["Bergamotto", "Iris", "Cardamomo"], heart: ["Caffè", "Tabacco", "Labdano"], base: ["Cuoio", "Ambra", "Patchouli", "Vaniglia"] },
    family: "Woody Oriental",
    familyIt: "Legnoso Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 16 }, { ml: 10, price: 30 }, { ml: 100, price: 140, full: true }],
    description: "A darkly sophisticated Italian masculine fragrance. Uomo Intense layers rich coffee and tobacco with a deep leather and amber base — a statement of refined, modern masculinity inspired by the Valentino Couture House.",
    descriptionIt: "Una fragranza maschile italiana sofisticata e scura. Stratifica caffè ricco e tabacco con una profonda base di cuoio e ambra.",
    emoji: "☕",
    image: imgFrag53,
    rating: 4.6,
    reviews: 367,
  },
  {
    id: 54,
    house: "Jean Paul Gaultier",
    name: "Le Beau Le Parfum Intense",
    notes: { top: ["Bergamot", "Coconut", "Citrus"], heart: ["Jasmine", "Heliotrope"], base: ["Benzoin", "Amber", "Tonka Bean"] },
    notesIt: { top: ["Bergamotto", "Cocco", "Agrumi"], heart: ["Gelsomino", "Eliotropio"], base: ["Benzoino", "Ambra", "Fava Tonka"] },
    family: "Aromatic Oriental",
    familyIt: "Aromatico Orientale",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 18 }, { ml: 10, price: 34 }, { ml: 75, price: 130, full: true }],
    description: "The intense, deeper version of Le Beau Le Parfum. Amplified coconut and citrus intensity leads to a richer amber-benzoin base — warmer, denser, and even more magnetic than the original.",
    descriptionIt: "La versione intensa di Le Beau Le Parfum. Cocco e agrumi amplificati conducono a una più ricca base ambra-benzoino.",
    emoji: "🌞",
    image: imgFrag54,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 55,
    house: "Viktor & Rolf",
    name: "Spicebomb Extreme EDP",
    notes: { top: ["Black Pepper", "Cinnamon"], heart: ["Tobacco", "Vanilla", "Vetiver"], base: ["Leather", "Amber", "Benzoin"] },
    notesIt: { top: ["Pepe Nero", "Cannella"], heart: ["Tabacco", "Vaniglia", "Vetiver"], base: ["Cuoio", "Ambra", "Benzoino"] },
    family: "Woody Spicy",
    familyIt: "Legnoso Speziato",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 8 }, { ml: 5, price: 17 }, { ml: 10, price: 31 }, { ml: 90, price: 130, full: true }],
    description: "An explosive masculine fragrance that detonates with black pepper and cinnamon before revealing a rich, smoky tobacco and leather core — dark, powerful, and devastatingly alluring.",
    descriptionIt: "Una fragranza maschile esplosiva che detona con pepe nero e cannella prima di rivelare un ricco nucleo di tabacco affumicato e cuoio.",
    emoji: "💣",
    image: imgFrag55,
    rating: 4.7,
    reviews: 621,
  },
  {
    id: 56,
    house: "Tom Ford",
    name: "Ombré Leather EDP",
    notes: { top: ["Cardamom", "Jasmine", "Thyme", "Floral Notes"], heart: ["Leather", "Amber", "Patchouli"], base: ["Oakmoss", "Vetiver", "Musk"] },
    notesIt: { top: ["Cardamomo", "Gelsomino", "Timo", "Note Floreali"], heart: ["Cuoio", "Ambra", "Patchouli"], base: ["Muschio di Quercia", "Vetiver", "Muschio"] },
    family: "Leather",
    familyIt: "Cuoiato",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 10 }, { ml: 5, price: 21 }, { ml: 10, price: 39 }, { ml: 100, price: 230, full: true }],
    description: "A bold, sensory journey through the American West. Rich, burnished leather is softened by floral jasmine and earthy patchouli, creating an intensely evocative and daring unisex fragrance.",
    descriptionIt: "Un audace viaggio sensoriale attraverso il West americano. Cuoio ricco e lucidato è addolcito da gelsomino floreale e patchouli terroso.",
    badge: "Exclusive",
    emoji: "🤠",
    image: imgFrag56,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 57,
    house: "Louis Vuitton",
    name: "Imagination",
    notes: { top: ["Bergamot", "Mandarin Orange", "Pink Pepper"], heart: ["Iris", "Cedar"], base: ["Vetiver", "Cashmere Wood", "Ambrette"] },
    notesIt: { top: ["Bergamotto", "Mandarino", "Pepe Rosa"], heart: ["Iris", "Cedro"], base: ["Vetiver", "Cashmere Wood", "Ambretto"] },
    family: "Woody Fresh",
    familyIt: "Legnoso Fresco",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 49 }, { ml: 100, price: 330, full: true }],
    description: "A luminous, modern eau de parfum from Louis Vuitton's iconic collection. Bright citrus and pink pepper dance over a cool iris heart and a warm cashmere-vetiver base — effortlessly elegant and quietly luxurious.",
    descriptionIt: "Un eau de parfum luminoso e moderno dalla collezione iconica di Louis Vuitton. Agrumi brillanti e pepe rosa danzano su un cuore di iris fresco.",
    badge: "Luxury",
    emoji: "✈️",
    image: imgFrag57,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 58,
    house: "Nishane",
    name: "Hacivat EDP",
    notes: { top: ["Grapefruit", "Bergamot", "Pineapple"], heart: ["Jasmine", "Rose", "Patchouli"], base: ["Vetiver", "Oakmoss", "Musk", "Ambergris"] },
    notesIt: { top: ["Pompelmo", "Bergamotto", "Ananas"], heart: ["Gelsomino", "Rosa", "Patchouli"], base: ["Vetiver", "Muschio di Quercia", "Muschio", "Ambra Grigia"] },
    family: "Woody Fruity",
    familyIt: "Legnoso Fruttato",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 16 }, { ml: 5, price: 36 }, { ml: 10, price: 70 }, { ml: 50, price: 270, full: true }],
    description: "A Turkish niche masterpiece inspired by the legendary shadow-play character Hacivat. Fresh tropical pineapple and grapefruit evolve into a sophisticated woody-mossy base — complex, tenacious, and utterly unique.",
    descriptionIt: "Un capolavoro niche turco. Ananas tropicale fresco e pompelmo evolvono in una sofisticata base legnosa-muschiata.",
    badge: "Niche",
    emoji: "🎭",
    image: imgFrag58,
    rating: 4.9,
    reviews: 678,
  },
  {
    id: 59,
    house: "Louis Vuitton",
    name: "Afternoon Swim",
    notes: { top: ["Bergamot", "Mandarin Orange"], heart: ["Jasmine", "Iris", "Coconut"], base: ["Musk", "Sandalwood", "Cedar"] },
    notesIt: { top: ["Bergamotto", "Mandarino"], heart: ["Gelsomino", "Iris", "Cocco"], base: ["Muschio", "Sandalo", "Cedro"] },
    family: "Floral Aquatic",
    familyIt: "Floreale Acquatico",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 49 }, { ml: 100, price: 330, full: true }],
    description: "The essence of a sun-drenched poolside afternoon. Afternoon Swim radiates warmth and ease — bright citrus gives way to a creamy floral-coconut heart over a clean, skin-like musk base.",
    descriptionIt: "L'essenza di un pomeriggio assolato a bordo piscina. Radioso calore — agrumi brillanti cedono a un cuore cremoso floreale-cocco.",
    badge: "Luxury",
    emoji: "🏊",
    image: imgFrag59,
    rating: 4.7,
    reviews: 221,
  },
  {
    id: 60,
    house: "Zadig & Voltaire",
    name: "You Powerfully EDP",
    notes: { top: ["Pear", "Bergamot", "Lemon"], heart: ["Iris", "Peony", "Jasmine"], base: ["Musk", "Cedar", "Sandalwood"] },
    notesIt: { top: ["Pera", "Bergamotto", "Limone"], heart: ["Iris", "Peonia", "Gelsomino"], base: ["Muschio", "Cedro", "Sandalo"] },
    family: "Floral Fruity",
    familyIt: "Floreale Fruttato",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 9 }, { ml: 5, price: 17 }, { ml: 10, price: 32 }, { ml: 100, price: 153, full: true }],
    description: "A confident and radiant feminine fragrance. Fresh pear and citrus open to a bright bouquet of iris, peony, and jasmine, anchored by a modern clean wood-musk base — effortlessly chic and powerful.",
    descriptionIt: "Una fragranza femminile sicura e radiosa. Pera fresca e agrumi si aprono a un bouquet di iris, peonia e gelsomino.",
    emoji: "💫",
    image: imgFrag60,
    rating: 4.5,
    reviews: 167,
  },
  {
    id: 61,
    house: "MFK",
    name: "Grand Soir EDP",
    notes: { top: ["Amber", "Benzoin", "Tonka Bean"], heart: ["Heliotrope", "Iris", "Jasmine"], base: ["Vanilla", "Musk", "Labdanum"] },
    notesIt: { top: ["Ambra", "Benzoino", "Fava Tonka"], heart: ["Eliotropio", "Iris", "Gelsomino"], base: ["Vaniglia", "Muschio", "Labdano"] },
    family: "Amber Vanilla",
    familyIt: "Ambra Vaniglia",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 23 }, { ml: 5, price: 49 }, { ml: 10, price: 93 }, { ml: 70, price: 515, full: true }],
    description: "A grand amber statement from Maison Francis Kurkdjian. Grand Soir is a warm, luminous, and enveloping fragrance — a masterful blend of benzoin, heliotrope, and rich vanilla, perfect for those who love a truly opulent scent.",
    descriptionIt: "Una grande dichiarazione ambrata da Maison Francis Kurkdjian. Caldo, luminoso e avvolgente — un magistrale blend di benzoino, eliotropio e ricca vaniglia.",
    badge: "Ultra Luxury",
    emoji: "🌙",
    image: imgFrag61,
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 62,
    house: "Maison Crivelli",
    name: "Oud Maracuja EDP",
    notes: { top: ["Passion Fruit", "Bergamot", "Ginger"], heart: ["Oud", "Rose", "Jasmine"], base: ["Sandalwood", "Musk", "Amber"] },
    notesIt: { top: ["Maracuja", "Bergamotto", "Zenzero"], heart: ["Oud", "Rosa", "Gelsomino"], base: ["Sandalo", "Muschio", "Ambra"] },
    family: "Floral Oriental",
    familyIt: "Floreale Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 15 }, { ml: 5, price: 33 }, { ml: 10, price: 63 }, { ml: 50, price: 235, full: true }],
    description: "A vibrant collision between the exotic tropics and the ancient Orient. Passion fruit and oud make for an unlikely yet utterly captivating duo — an adventurous, sensual niche statement.",
    descriptionIt: "Una vibrante collisione tra i tropici esotici e l'Oriente antico. Maracuja e oud formano un duo improbabile ma assolutamente avvincente.",
    badge: "Niche",
    emoji: "🌴",
    image: imgFrag62,
    rating: 4.7,
    reviews: 143,
  },
  {
    id: 63,
    house: "Creed",
    name: "Oud Zarian EDP",
    notes: { top: ["Bergamot", "Saffron", "Elemi"], heart: ["Oud", "Rose", "Patchouli"], base: ["Sandalwood", "Ambergris", "Vetiver", "Musk"] },
    notesIt: { top: ["Bergamotto", "Zafferano", "Elemi"], heart: ["Oud", "Rosa", "Patchouli"], base: ["Sandalo", "Ambra Grigia", "Vetiver", "Muschio"] },
    family: "Woody Oriental",
    familyIt: "Legnoso Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 23 }, { ml: 5, price: 50 }, { ml: 10, price: 94 }, { ml: 50, price: 375, full: true }],
    description: "A magnificent oud fragrance from the legendary Creed house. Saffron and bergamot illuminate a heart of Laotian oud and Bulgarian rose, resting on a majestic ambergris and sandalwood base.",
    descriptionIt: "Una magnifica fragranza all'oud dalla leggendaria maison Creed. Zafferano e bergamotto illuminano un cuore di oud laotiano e rosa bulgara.",
    badge: "Ultra Luxury",
    emoji: "👑",
    image: imgFrag63,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 64,
    house: "By Kilian",
    name: "Black Phantom EDP",
    notes: { top: ["Rum", "Black Coffee"], heart: ["Chocolate", "Caramel", "Praline"], base: ["Vanilla", "Sugar", "Musk"] },
    notesIt: { top: ["Rum", "Caffè Nero"], heart: ["Cioccolato", "Caramello", "Pralinato"], base: ["Vaniglia", "Zucchero", "Muschio"] },
    family: "Oriental Gourmand",
    familyIt: "Orientale Gourmand",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 14 }, { ml: 5, price: 30 }, { ml: 10, price: 57 }, { ml: 50, price: 205, full: true }],
    description: "Do you dare? A seductive and dangerous gourmand fragrance built around rum, black coffee, and dark chocolate — intoxicating, decadent, and dangerously addictive. A memento mori in a skull-shaped bottle.",
    descriptionIt: "Osi? Una fragranza gourmand seducente e pericolosa costruita attorno a rum, caffè nero e cioccolato fondente.",
    badge: "Niche",
    emoji: "💀",
    image: imgFrag64,
    rating: 4.8,
    reviews: 498,
  },
  {
    id: 66,
    house: "Louis Vuitton",
    name: "Coeur Battant",
    notes: { top: ["Bergamot", "Pink Pepper"], heart: ["Rose", "Jasmine", "Peony"], base: ["Musk", "Sandalwood", "Patchouli"] },
    notesIt: { top: ["Bergamotto", "Pepe Rosa"], heart: ["Rosa", "Gelsomino", "Peonia"], base: ["Muschio", "Sandalo", "Patchouli"] },
    family: "Floral",
    familyIt: "Floreale",
    gender: "Women",
    genderIt: "Donna",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 49 }, { ml: 100, price: 330, full: true }],
    description: "A romantic and luminous floral from the Louis Vuitton collection. Coeur Battant captures the flutter of a racing heart with vibrant rose, jasmine, and peony over a warm sandalwood and musk base.",
    descriptionIt: "Un floreale romantico e luminoso. Cattura il battito di un cuore accelerato con rosa, gelsomino e peonia su una base di sandalo e muschio.",
    badge: "Luxury",
    emoji: "❤️",
    image: imgFrag66,
    rating: 4.7,
    reviews: 175,
  },
  {
    id: 67,
    house: "Louis Vuitton",
    name: "Orage",
    notes: { top: ["Bergamot", "Violet Leaf", "Black Pepper"], heart: ["Iris", "Vetiver", "Ginger"], base: ["Sandalwood", "Cedar", "Ambrette"] },
    notesIt: { top: ["Bergamotto", "Foglia di Viola", "Pepe Nero"], heart: ["Iris", "Vetiver", "Zenzero"], base: ["Sandalo", "Cedro", "Ambretto"] },
    family: "Aromatic Woody",
    familyIt: "Aromatico Legnoso",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 49 }, { ml: 100, price: 330, full: true }],
    description: "Orage — French for 'storm' — captures the electricity of an incoming thunderstorm. Dark violet leaf and black pepper crackle over a cool iris-vetiver heart and a smooth sandalwood base.",
    descriptionIt: "Orage cattura l'elettricità di un temporale imminente. Foglia di viola scura e pepe nero su un cuore fresco di iris e vetiver.",
    badge: "Luxury",
    emoji: "⛈️",
    image: imgFrag67,
    rating: 4.7,
    reviews: 163,
  },
  {
    id: 68,
    house: "Louis Vuitton",
    name: "Météore",
    notes: { top: ["Mandarin Orange", "Bergamot", "Apple"], heart: ["Jasmine", "Lavender", "Iris"], base: ["Vetiver", "Sandalwood", "Musk"] },
    notesIt: { top: ["Mandarino", "Bergamotto", "Mela"], heart: ["Gelsomino", "Lavanda", "Iris"], base: ["Vetiver", "Sandalo", "Muschio"] },
    family: "Aromatic Fresh",
    familyIt: "Aromatico Fresco",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 12 }, { ml: 5, price: 26 }, { ml: 10, price: 49 }, { ml: 100, price: 330, full: true }],
    description: "A celestial and luminous masculine fragrance that streaks across the senses like a shooting star. Fresh citrus and apple ignite a cool floral heart, landing on a clean vetiver and sandalwood trail.",
    descriptionIt: "Una fragranza maschile celeste e luminosa che attraversa i sensi come una stella cadente. Agrumi freschi e mela accendono un cuore floreale fresco.",
    badge: "Luxury",
    emoji: "☄️",
    image: imgFrag68,
    rating: 4.7,
    reviews: 148,
  },
  {
    id: 69,
    house: "Xerjoff",
    name: "Richwood EDP",
    notes: { top: ["Bergamot", "Lemon", "Mandarin Orange"], heart: ["Oud", "Leather", "Rose"], base: ["Sandalwood", "Patchouli", "Musk", "Amber"] },
    notesIt: { top: ["Bergamotto", "Limone", "Mandarino"], heart: ["Oud", "Cuoio", "Rosa"], base: ["Sandalo", "Patchouli", "Muschio", "Ambra"] },
    family: "Woody Oriental",
    familyIt: "Legnoso Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 24 }, { ml: 5, price: 52 }, { ml: 10, price: 99 }, { ml: 50, price: 400, full: true }],
    description: "A commanding and complex luxury fragrance from Xerjoff's top tier. Richwood layers the finest oud and leather with a luminous citrus opening and a deeply resinous sandalwood base — power and sophistication in perfect balance.",
    descriptionIt: "Una fragranza di lusso imponente e complessa. Stratifica oud e cuoio pregiati con un'apertura citrica luminosa e una profonda base di sandalo resinoso.",
    badge: "Ultra Luxury",
    emoji: "🪵",
    image: imgFrag69,
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 70,
    house: "Xerjoff",
    name: "Opera EDP",
    notes: { top: ["Bergamot", "Aldehydes", "Pink Pepper"], heart: ["Rose", "Heliotrope", "Iris"], base: ["Sandalwood", "Benzoin", "Musk", "Amber"] },
    notesIt: { top: ["Bergamotto", "Aldeidi", "Pepe Rosa"], heart: ["Rosa", "Eliotropio", "Iris"], base: ["Sandalo", "Benzoino", "Muschio", "Ambra"] },
    family: "Floral Amber",
    familyIt: "Floreale Ambrato",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 15 }, { ml: 5, price: 33 }, { ml: 10, price: 63 }, { ml: 50, price: 235, full: true }],
    description: "A grand operatic fragrance befitting its name. Xerjoff Opera is a luminous, aldehyic floral of breathtaking elegance — bergamot and rose open the curtain on a warm benzoin and sandalwood finale.",
    descriptionIt: "Una fragranza grandiosa come il suo nome. Luminosa ed elegante — bergamotto e rosa aprono il sipario su un finale di benzoino e sandalo.",
    badge: "Niche",
    emoji: "🎭",
    image: imgFrag70,
    rating: 4.8,
    reviews: 134,
  },
  {
    id: 71,
    house: "Xerjoff",
    name: "More Than Words EDP",
    notes: { top: ["Bergamot", "Violet", "Pink Pepper"], heart: ["Rose", "Iris", "Magnolia"], base: ["Vetiver", "Sandalwood", "Musk"] },
    notesIt: { top: ["Bergamotto", "Viola", "Pepe Rosa"], heart: ["Rosa", "Iris", "Magnolia"], base: ["Vetiver", "Sandalo", "Muschio"] },
    family: "Floral Woody",
    familyIt: "Floreale Legnoso",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 11 }, { ml: 5, price: 24 }, { ml: 10, price: 45 }, { ml: 50, price: 145, full: true }],
    description: "A beautifully balanced and accessible Xerjoff creation. More Than Words is a refined floral-woody with a heart of rose and magnolia that says everything without saying a word — graceful, modern, and deeply wearable.",
    descriptionIt: "Una creazione Xerjoff splendidamente equilibrata. Un raffinato floreale-legnoso con cuore di rosa e magnolia.",
    badge: "Niche",
    emoji: "💌",
    image: imgFrag71,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 72,
    house: "Xerjoff",
    name: "Soprano EDP",
    notes: { top: ["Bergamot", "Grapefruit", "Cardamom"], heart: ["Rose", "Iris", "Jasmine"], base: ["Amber", "Sandalwood", "Musk", "Vanilla"] },
    notesIt: { top: ["Bergamotto", "Pompelmo", "Cardamomo"], heart: ["Rosa", "Iris", "Gelsomino"], base: ["Ambra", "Sandalo", "Muschio", "Vaniglia"] },
    family: "Floral Oriental",
    familyIt: "Floreale Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 17 }, { ml: 5, price: 39 }, { ml: 10, price: 76 }, { ml: 50, price: 300, full: true }],
    description: "A high-pitched ode to beauty. Xerjoff Soprano hits every note with precision — bright citrus, luminous florals, and a sumptuous amber-vanilla base that resonates long after the opening act.",
    descriptionIt: "Un'ode all'acuto alla bellezza. Colpisce ogni nota con precisione — agrumi brillanti, fiori luminosi e una sontuosa base ambra-vaniglia.",
    badge: "Niche",
    emoji: "🎵",
    image: imgFrag72,
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 73,
    house: "Xerjoff",
    name: "Capitale EDP",
    notes: { top: ["Bergamot", "Saffron", "Pink Pepper"], heart: ["Rose", "Oud", "Iris"], base: ["Amber", "Sandalwood", "Patchouli"] },
    notesIt: { top: ["Bergamotto", "Zafferano", "Pepe Rosa"], heart: ["Rosa", "Oud", "Iris"], base: ["Ambra", "Sandalo", "Patchouli"] },
    family: "Woody Oriental",
    familyIt: "Legnoso Orientale",
    gender: "Unisex",
    genderIt: "Unisex",
    sizes: [{ ml: 2, price: 16 }, { ml: 5, price: 35 }, { ml: 10, price: 68 }, { ml: 50, price: 260, full: true }],
    description: "The capital of luxury fragrance. Capitale is a bold, opulent creation that brings together the finest saffron and oud with a rich rose heart and a deep amber-patchouli base — imperious, sophisticated, unforgettable.",
    descriptionIt: "La capitale della fragranza di lusso. Audace e opulenta — zafferano e oud pregiati con un ricco cuore di rosa e profonda base ambra-patchouli.",
    badge: "Niche",
    emoji: "🏛️",
    image: imgFrag73,
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 74,
    house: "Armani",
    name: "Acqua di Giò Profondo EDP",
    notes: { top: ["Bergamot", "Sea Notes", "Aquatic Notes"], heart: ["Mastic", "Cypress", "Rosemary"], base: ["Patchouli", "Mineral Notes", "Musk"] },
    notesIt: { top: ["Bergamotto", "Note Marine", "Note Acquatiche"], heart: ["Lentisco", "Cipresso", "Rosmarino"], base: ["Patchouli", "Note Minerali", "Muschio"] },
    family: "Aquatic Woody",
    familyIt: "Acquatico Legnoso",
    gender: "Men",
    genderIt: "Uomo",
    sizes: [{ ml: 2, price: 7 }, { ml: 5, price: 14 }, { ml: 10, price: 26 }, { ml: 125, price: 125, full: true }],
    description: "A deep dive into the Mediterranean sea. Acqua di Giò Profondo EDP amplifies the iconic aquatic DNA with darker mineral depths, cypress, and a rich patchouli base — masculine, modern, and endlessly evocative.",
    descriptionIt: "Un tuffo in profondità nel Mar Mediterraneo. Amplifica il DNA acquatico iconico con note minerali più scure, cipresso e una ricca base di patchouli.",
    badge: "Bestseller",
    emoji: "🌊",
    image: imgFrag74,
    rating: 4.7,
    reviews: 834,
  },
];

const DISCOVERY_KITS = [
  {
    id: "kit-1",
    name: "Men's Icons Kit",
    nameIt: "Kit Icone Uomo",
    items: ["Aventus 2ml", "Elysium 2ml", "Bleu de Chanel EDP 2ml", "Homme Intense 2ml"],
    price: 30,
    originalPrice: 33,
    emoji: "",
    image: kitIconeUomo,
  },
  {
    id: "kit-2",
    name: "Tobacco & Vanilla Kit",
    nameIt: "Kit Tabacco & Vaniglia",
    items: ["Tobacco Vanille 2ml", "By the Fireplace 2ml", "Angels' Share 2ml", "The One 2ml"],
    price: 35,
    originalPrice: 39,
    emoji: "",
    image: kitTabaccoVaniglia,
  },
  {
    id: "kit-3",
    name: "Viral Luxury Kit",
    nameIt: "Kit Viral Luxury",
    items: ["Baccarat Rouge 540 2ml", "Lost Cherry 2ml", "Black Orchid 2ml", "Oud Wood 2ml"],
    price: 52,
    originalPrice: 58,
    emoji: "",
    image: kitViralLuxury,
  },
  {
    id: "kit-4",
    name: "Floral Elegance Kit",
    nameIt: "Kit Floreale Elegante",
    items: ["Delina 2ml", "Libre EDP 2ml", "Flora 2ml", "Coco Mademoiselle 2ml"],
    price: 32,
    originalPrice: 36,
    emoji: "",
    image: kitFlorealeElegante,
  },
  {
    id: "kit-5",
    name: "Fresh Summer Kit",
    nameIt: "Kit Fresco Estivo",
    items: ["Wood Sage & Sea Salt 2ml", "Beach Walk 2ml", "Light Blue EDP 2ml", "Acqua di Giò Profumo 2ml"],
    price: 22,
    originalPrice: 24,
    emoji: "",
    image: kitFrescoEstivo,
  },
  {
    id: "kit-6",
    name: "Daily Balance Kit",
    nameIt: "Kit Equilibrio Quotidiano",
    items: ["Si 2ml", "Eros EDP 2ml", "Naxos 2ml", "Acqua di Parma 2ml"],
    price: 20,
    originalPrice: 22,
    emoji: "",
    image: kitEquilibrioQuotidiano,
  },
];

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ display: "flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ color: i <= Math.floor(rating) ? "#c9a96e" : "#1e1e1e", fontSize: 13 }}>
            ★
          </span>
        ))}
      </div>
      <span style={{ color: "#4a4a4a", fontSize: 11 }}>
        {rating} · {reviews.toLocaleString()}
      </span>
    </div>
  );
}

function NotesPyramid({
  notes,
  noteTop,
  noteHeart,
  noteBase,
}: {
  notes: { top: readonly string[]; heart: readonly string[]; base: readonly string[] };
  noteTop: string;
  noteHeart: string;
  noteBase: string;
}) {
  return (
    <div
      style={{
        background: "#060606",
        border: "1px solid #141414",
        borderRadius: 12,
        padding: 14,
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {[
        { label: noteTop, items: notes.top, color: "#c9a96e" },
        { label: noteHeart, items: notes.heart, color: "#b8956a" },
        { label: noteBase, items: notes.base, color: "#7a5c10" },
      ].map((n) => (
        <div key={n.label}>
          <div style={{ fontSize: 9, color: n.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>{n.label}</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {n.items.map((item) => (
              <span key={item} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 20, padding: "3px 9px", fontSize: 10, color: "#666" }}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


function FragranceCard({
  frag,
  onAdd,
  cart,
  cols,
  lang,
}: {
  frag: Fragrance;
  onAdd: (item: CartItem) => void;
  cart: CartItem[];
  cols: number;
  lang: Lang;
}) {
  const [expanded, setExpanded] = useState(false);
  const [sel, setSel] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const t = TRANSLATIONS[lang];
  const inCart = cart.find((i) => i.id === frag.id && i.ml === frag.sizes[sel].ml);
  const isMobile = cols === 2;
  const notes = lang === "it" ? frag.notesIt : frag.notes;

  return (
    <div
      style={{
        background: "linear-gradient(160deg,#0f0f0f,#090909)",
        border: "1px solid #161616",
        borderRadius: 18,
        overflow: "hidden",
        transition: "all 0.3s",
        display: "flex",
        flexDirection: "column",
        alignSelf: "start",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid #c9a96e33";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(201,169,110,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid #161616";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "relative",
          background: "radial-gradient(ellipse at 50% 60%, #131008, #070605)",
          height: isMobile ? 200 : 260,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          padding: "0 20px 0",
        }}
      >
        {frag.badge && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "linear-gradient(135deg,#c9a96e,#7a5010)",
              color: "#000",
              borderRadius: 5,
              padding: "3px 9px",
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: 1,
              zIndex: 3,
              textTransform: "uppercase",
            }}
          >
            {frag.badge}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.55)",
            border: "1px solid #222",
            borderRadius: 20,
            padding: "2px 8px",
            fontSize: 9,
            color: "#555",
            zIndex: 3,
          }}
        >
          {lang === "it" ? frag.genderIt : frag.gender}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 60,
            background: "radial-gradient(ellipse at center, rgba(201,169,110,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {!imgFailed ? (
          <img
            src={frag.image}
            alt={`${frag.house} ${frag.name}`}
            onError={() => setImgFailed(true)}
            style={{
              height: "90%",
              width: "auto",
              maxWidth: "80%",
              objectFit: "contain",
              objectPosition: "center bottom",
              display: "block",
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.9)) drop-shadow(0 2px 12px rgba(201,169,110,0.15))",
              position: "relative",
              zIndex: 2,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05) translateY(-6px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) translateY(0)")}
          />
        ) : (
          <div
            style={{
              fontSize: isMobile ? 72 : 90,
              filter: "drop-shadow(0 8px 24px rgba(201,169,110,0.2))",
              zIndex: 2,
              position: "relative",
              paddingBottom: 8,
            }}
          >
            {frag.emoji}
          </div>
        )}
      </div>

      <div style={{ padding: isMobile ? "12px 12px 14px" : "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ marginBottom: 6, minHeight: isMobile ? 52 : 62 }}>
          <div style={{ fontSize: 9, color: "#c9a96e88", letterSpacing: 3, textTransform: "uppercase", marginBottom: 2, fontWeight: 600 }}>{frag.house}</div>
          <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: "#f0ece4", fontFamily: "Georgia,serif", lineHeight: 1.15 }}>{frag.name}</div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{lang === "it" ? frag.familyIt : frag.family}</div>
        </div>

        <Stars rating={frag.rating} reviews={frag.reviews} />
        <p style={{ color: "#777", fontSize: 11, lineHeight: 1.7, margin: "8px 0 12px", display: "-webkit-box", WebkitLineClamp: isMobile ? 3 : 4, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: isMobile ? 58 : 76 }}>{lang === "it" ? frag.descriptionIt : frag.description}</p>

        <div style={{ fontSize: 8, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>
          {lang === "it" ? "Taglie" : "الأحجام"}
        </div>

        {/* Mobile: keep EVERYTHING small and visible in one row (no swipe). */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5, marginBottom: 12 }}>
          {frag.sizes.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSel(i)}
              style={{
                padding: isMobile ? "6px 3px" : "7px 4px",
                borderRadius: 10,
                border: sel === i ? "1.5px solid #c9a96e" : "1px solid #181818",
                background: sel === i ? "rgba(201,169,110,0.12)" : "#0a0a0a",
                color: sel === i ? "#c9a96e" : "#777",
                cursor: "pointer",
                transition: "all 0.18s",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: isMobile ? 9 : 10, fontWeight: 800, lineHeight: 1.05, whiteSpace: "nowrap" }}>
                {`${s.ml}ml`}
              </div>
              <div style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, color: sel === i ? "#e0c080" : "#888", whiteSpace: "nowrap" }}>€{s.price}</div>
            </button>
          ))}
        </div>

        <div style={{ flexGrow: 1 }} />

        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: "none", border: "none", color: "#c9a96ecc", fontSize: 10, cursor: "pointer", padding: "2px 0 8px", display: "block", width: "100%", textAlign: "center", letterSpacing: 1 }}
        >
          {expanded ? `▲ ${t.hideNotes}` : `▼ ${t.showNotes}`}
        </button>
        {expanded && <NotesPyramid notes={notes} noteTop={t.noteTop} noteHeart={t.noteHeart} noteBase={t.noteBase} />}

        <button
          onClick={() =>
            onAdd({
              id: frag.id,
              house: frag.house,
              name: frag.name,
              emoji: frag.emoji,
              image: frag.image,
              ml: frag.sizes[sel].ml,
              price: frag.sizes[sel].price,
              qty: 1,
              isFull: Boolean(frag.sizes[sel].full),
            })
          }
          style={{
            width: "100%",
            marginTop: "auto",
            paddingTop: 10,
            padding: isMobile ? "9px 0" : "10px 0",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: isMobile ? 11 : 12,
            letterSpacing: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            transition: "all 0.2s",
            background: inCart ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#d4a843,#b8860b)",
            color: "#000",
            boxShadow: inCart ? "0 4px 14px rgba(34,197,94,0.2)" : "0 4px 14px rgba(212,168,67,0.22)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {inCart ? `${t.added} — €${frag.sizes[sel].price}` : `${t.addToCart} — €${frag.sizes[sel].price}`}
        </button>
      </div>
    </div>
  );
}

function CartThumb({ image, emoji, name }: { image?: string; emoji: string; name: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div style={{ width: 52, height: 52, background: "radial-gradient(ellipse at 50% 60%,#131008,#070605)", border: "1px solid #1a1a1a", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, overflow: "hidden" }}>
      {image && !imgFailed ? (
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }} onError={() => setImgFailed(true)} />
      ) : (
        <span>{emoji}</span>
      )}
    </div>
  );
}

function CartDrawer({
  items,
  onClose,
  onRemove,
  onQty,
  isMobile,
  lang,
  customerEmail,
  userId,
}: {
  items: CartItem[];
  onClose: () => void;
  onRemove: (idx: number) => void;
  onQty: (idx: number, delta: number) => void;
  isMobile: boolean;
  lang: Lang;
  customerEmail?: string;
  userId?: string;
}) {
  const t = TRANSLATIONS[lang];
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const discountAmount = useMemo(() => calculateSampleDiscount(items), [items]);

  const discountedTotal = Math.max(0, total - discountAmount);
  const freeShipping = discountedTotal >= 30;
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Checkout via Shopify: we convert local cart to Shopify cart using Variant IDs.  // Checkout via Stripe: convert local cart into a Stripe Checkout Session (server-side).
  const handleCheckout = useCallback(async () => {
    setCheckoutLoading(true);

    try {
      const payload = {
        customerEmail,
        userId,
        items: items.map((i) => ({
          name: i.name,
          brand: i.house,
          ml: i.ml,
          qty: i.qty,
          unitPriceEur: i.price,
          image: i.image,
        })),
      };

      const r = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await r.json();
      if (!r.ok || !data?.url) throw new Error(data?.error || 'Checkout failed');

      window.location.assign(data.url);
    } catch (e: any) {
      alert((lang === 'it' ? 'Errore checkout: ' : 'Checkout error: ') + (e?.message || ''));
      setCheckoutLoading(false);
    }
  }, [items, lang]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.62)",
        zIndex: 300,
        display: "flex",
        justifyContent: "flex-end",
        backdropFilter: "blur(10px) brightness(0.7)",
      }}
      onClick={onClose}
    >
      <div style={{ background: "#070707", width: isMobile ? "100%" : 400, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", borderLeft: "1px solid #c9a96e18" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #111", background: "#080808" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 8, color: "#c9a96e66", letterSpacing: 4, textTransform: "uppercase", marginBottom: 3 }}>ST PROFUMI</div>
              <div style={{ fontSize: 22, color: "#f0ece4", fontFamily: "Georgia,serif", fontWeight: 400 }}>{t.cartTitle}</div>
            </div>
            <button onClick={onClose} style={{ background: "#111", border: "1px solid #1e1e1e", color: "#666", fontSize: 14, cursor: "pointer", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          {items.length > 0 && (
            <div style={{ marginTop: 12, padding: "8px 12px", background: freeShipping ? "rgba(34,197,94,0.08)" : "rgba(201,169,110,0.06)", border: `1px solid ${freeShipping ? "rgba(34,197,94,0.2)" : "#c9a96e18"}`, borderRadius: 8, fontSize: 11, color: freeShipping ? "#22c55e" : "#c9a96e88", textAlign: "center" }}>
              {freeShipping ? t.freeShippingMsg : t.freeShippingAdd.replace("{amount}", (30 - discountedTotal).toFixed(2))}
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", color: "#666", marginTop: 100 }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>🧴</div>
              <div style={{ fontFamily: "Georgia,serif", color: "#888", fontSize: 16, marginBottom: 6 }}>{t.cartEmpty}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{t.cartEmptySub}</div>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} style={{ padding: "16px 20px", borderBottom: "1px solid #0e0e0e", display: "flex", gap: 12, alignItems: "center" }}>
                <CartThumb image={item.image} emoji={item.emoji} name={item.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8, color: "#c9a96e", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>{item.house}</div>
                  <div style={{ color: "#f0ece4", fontSize: 14, fontFamily: "Georgia,serif", fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ color: "#888", fontSize: 11, marginTop: 2, display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                    <span style={{ color: "#c9a96e" }}>€{item.price}</span>
                    <span style={{ color: "#666" }}>
                      {lang === "it" ? "Taglia" : "Size"}: {item.ml}
                    </span>
                    <span style={{ color: "#666" }}>
                      {lang === "it" ? "Qtà" : "Qty"}: <span style={{ color: "#f0ece4", fontWeight: 800 }}>{item.qty}</span>
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0d0d0d", border: "1px solid #191919", borderRadius: 10, padding: "4px 6px" }}>
                  <button aria-label={lang === "it" ? "Diminuisci quantità" : "Decrease quantity"} onClick={() => onQty(idx, -1)} style={{ background: "none", border: "none", color: "#c9a96e", cursor: "pointer", fontSize: 16, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ color: "#888", fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                  <button aria-label={lang === "it" ? "Aumenta quantità" : "Increase quantity"} onClick={() => onQty(idx, 1)} style={{ background: "none", border: "none", color: "#c9a96e", cursor: "pointer", fontSize: 16, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <button aria-label={lang === "it" ? "Rimuovi prodotto" : "Remove item"} onClick={() => onRemove(idx)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16, padding: "4px" }}>🗑</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ position: "sticky", bottom: 0, background: "#080808", borderTop: "1px solid #111", padding: "18px 20px 24px" }}>
            {discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#888" }}>
                <span style={{ color: "#f0ece4" }}>{lang === "it" ? "Subtotale" : "Subtotal"}</span>
                <span style={{ color: "#888", textDecoration: "line-through" }}>€{total.toFixed(2)}</span>
              </div>
            )}
            {discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "#22c55e" }}>🎁 {lang === "it" ? "Sconto applicato" : "Discount applied"}</span>
                <span style={{ color: "#22c55e", fontWeight: 700 }}>−€{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#888" }}>
              <span>{t.shipping}</span>
              <span style={{ color: freeShipping ? "#22c55e" : "#aaa" }}>{freeShipping ? t.shippingFree : t.shippingPaid}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ color: "#888", fontSize: 14 }}>{t.total}</span>
              <span style={{ color: "#c9a96e", fontWeight: 900, fontSize: 24, fontFamily: "Georgia,serif" }}>€{(freeShipping ? discountedTotal : discountedTotal + 7).toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              style={{ width: "100%", padding: "15px", borderRadius: 14, border: "none", background: checkoutLoading ? "linear-gradient(135deg,#8b7040,#5a4208)" : "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, fontSize: 14, cursor: checkoutLoading ? "not-allowed" : "pointer", letterSpacing: 0.8, boxShadow: "0 8px 28px rgba(201,169,110,0.3)", opacity: checkoutLoading ? 0.7 : 1, transition: "all 0.2s" }}
            >
              {checkoutLoading ? (lang === "it" ? "⏳ Caricamento..." : "⏳ Loading...") : t.checkout}
            </button>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: "#555" }}>{t.secure}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024 && width < 1280;
  const isWide = width >= 1280;

  // Mobile: keep as-is (2 cols)
  // Tablet: 3 cols
  // Desktop: 3 cols
  // Wide screens: 4 cols
  const cols = isMobile ? 2 : isTablet ? 3 : isDesktop ? 3 : 4;

  const [lang, setLang] = useState<Lang>("it");

  const runtimeSupabase = (typeof window !== "undefined" ? (window as any).__ST_PROFUMI__ : undefined) || {};
  const supabaseReady = Boolean(
    (runtimeSupabase.SUPABASE_URL && runtimeSupabase.SUPABASE_ANON_KEY) ||
      ((import.meta as any).env?.VITE_SUPABASE_URL && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY)
  );
  const [session, setSession] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [adminSubject, setAdminSubject] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [addrDraft, setAddrDraft] = useState<any>({
    label: "Home",
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    province: "",
    postal_code: "",
    country: "IT",
  });

  const isAdminEmails = new Set(
    String((import.meta as any).env?.VITE_ADMIN_EMAILS || "")
      .split(",")
      .map((s: string) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  // إذا لم تُحدد VITE_ADMIN_EMAILS، لا نفعل لوحة الإدارة
  const isAdmin =
    isAdminEmails.size > 0 && isAdminEmails.has(String(session?.user?.email || "").trim().toLowerCase());

  useEffect(() => {
    if (!supabaseReady) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => {
      sub?.subscription?.unsubscribe();
    };
  }, [supabaseReady]);

  const refreshUserData = useCallback(async () => {
    if (!supabaseReady || !session?.user) return;

    const uid = session.user.id;

    const p = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (!p.error) {
      // Ensure profile exists
      if (!p.data) {
        await supabase.from("profiles").insert({ id: uid, email: session.user.email });
      }
      const p2 = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      setProfile(p2.data || null);
    }

    const a = await supabase.from("addresses").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    if (!a.error) setAddresses(a.data || []);

    const o = await supabase.from("orders").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(50);
    if (!o.error) setOrders(o.data || []);
  }, [supabaseReady, session]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleLogin = useCallback(async () => {
    if (!supabaseReady) return;
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPass });
      if (error) throw error;
      setAuthEmail("");
      setAuthPass("");
    } catch (e: any) {
      setAuthError(e?.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  }, [supabaseReady, authEmail, authPass]);

  const handleSignup = useCallback(async () => {
    if (!supabaseReady) return;
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signUp({ email: authEmail.trim(), password: authPass });
      if (error) throw error;
      setAuthError(lang === "it" ? "Controlla la tua email per confermare." : "Check your email to confirm your account." );
    } catch (e: any) {
      setAuthError(e?.message || "Signup failed");
    } finally {
      setAuthLoading(false);
    }
  }, [supabaseReady, authEmail, authPass, lang]);

  const handleLogout = useCallback(async () => {
    if (!supabaseReady) return;
    await supabase.auth.signOut();
  }, [supabaseReady]);

  const fetchAdminOrders = useCallback(async () => {
    if (!isAdmin || !session?.access_token) return;
    const r = await fetch('/api/admin-orders', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const j = await r.json();
    if (r.ok) setAdminOrders(j.orders || []);
  }, [isAdmin, session]);

  const addAddress = useCallback(
    async (addr: any) => {
      if (!supabaseReady || !session?.user) return;
      const uid = session.user.id;
      await supabase.from('addresses').insert({ ...addr, user_id: uid });
      await refreshUserData();
    },
    [supabaseReady, session, refreshUserData]
  );

  const updateAdminOrder = useCallback(
    async (patch: { id: string; status?: string; carrier?: string; tracking_number?: string }) => {
      if (!isAdmin || !session?.access_token) return;
      const r = await fetch('/api/admin-update-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(patch),
      });
      const j = await r.json();
      if (r.ok && j.order) {
        setAdminOrders((prev) => prev.map((o) => (o.id === j.order.id ? j.order : o)));
      }
    },
    [isAdmin, session]
  );

  const sendAnnouncement = useCallback(async () => {
    if (!isAdmin || !session?.access_token) return;
    const r = await fetch('/api/admin-send-announcement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ subject: adminSubject, message: adminMessage }),
    });
    const j = await r.json();
    if (!r.ok) alert(j?.error || 'Failed');
    else alert(`Sent to ${j.sent} emails`);
  }, [isAdmin, session, adminSubject, adminMessage]);

  // Persist cart locally (quick win). Full account-based saved carts will be implemented in the next step.
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("st_cart_v2") || localStorage.getItem("st_cart_v1");
      return raw ? (JSON.parse(raw) as CartItem[]).map(normalizeCartItem) : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("st_cart_v2", JSON.stringify(cart.map(normalizeCartItem)));
      localStorage.removeItem("st_cart_v1");
    } catch {
      // ignore
    }
  }, [cart]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [activeTab, setActiveTab] = useState("shop");
  const [route, setRoute] = useState("");

  useEffect(() => {
    const read = () => {
      const h = typeof window !== "undefined" ? window.location.hash : "";
      setRoute(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const isThankYou = route.includes("/thank-you");
  const isReceived = route.includes("/received") || route.includes("/tam-istilam");

  const receivedParams = useMemo(() => {
    if (typeof window === "undefined") return { order: "", name: "" };
    // Support hash routing like: #/received?order=1234&name=Soufian
    const h = window.location.hash || "";
    const qIndex = h.indexOf("?");
    if (qIndex === -1) return { order: "", name: "" };
    const qs = h.slice(qIndex + 1);
    const sp = new URLSearchParams(qs);
    return {
      order: (sp.get("order") || sp.get("order_number") || sp.get("id") || "").trim(),
      name: (sp.get("name") || sp.get("customer") || sp.get("customer_name") || "").trim(),
    };
  }, [route]);

  useEffect(() => {
    if (isThankYou || isReceived) setActiveTab("orders");
  }, [isThankYou, isReceived]);
  const [scrolled, setScrolled] = useState(false);
  const [genderFilter, setGenderFilter] = useState("All");
const BASE_ORDERS = 458;
  const [orderCount, setOrderCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("st_order_count");
      return stored ? parseInt(stored, 10) : BASE_ORDERS;
    } catch { return BASE_ORDERS; }
  });
  const [orderCountDisplay, setOrderCountDisplay] = useState(orderCount);

  useEffect(() => {
    if (!isReceived) return;
    const key = "st_last_received_route";
    const lastRoute = sessionStorage.getItem(key) || "";
    if (lastRoute === route) return;
    sessionStorage.setItem(key, route);
    const newCount = orderCount + 1;
    setOrderCount(newCount);
    try { localStorage.setItem("st_order_count", String(newCount)); } catch {}
  }, [isReceived, route]);

  useEffect(() => {
    if (orderCountDisplay === orderCount) return;
    const start = orderCountDisplay;
    const end = orderCount;
    const steps = Math.abs(end - start);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setOrderCountDisplay(start + Math.round((step / steps) * (end - start)));
      if (step >= steps) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [orderCount]);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);



  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCart(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const ALL_FRAGRANCES = useMemo(() => [...FRAGRANCES, ...MORE_FRAGRANCES], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);
    return ALL_FRAGRANCES.filter((f) => {
      const name = f.name.toLowerCase();
      const house = f.house.toLowerCase();
      const matchSearch =
        tokens.length === 0 ||
        tokens.every((t) => name.includes(t) || house.includes(t));
      const matchGender = genderFilter === "All" || f.gender === genderFilter;
      return matchSearch && matchGender;
    });
  }, [ALL_FRAGRANCES, search, genderFilter]);

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [] as { key: string; label: string; fragId?: number; fragName?: string }[];

    const tokens = q.split(/\s+/).filter(Boolean);

    const items = ALL_FRAGRANCES.map((f) => {
      const label = `${f.house} ${f.name}`;
      return {
        key: `f-${f.id}`,
        label,
        fragId: f.id,
        fragName: f.name,
        house: f.house.toLowerCase(),
        name: f.name.toLowerCase(),
      };
    });

    const score = (x: { label: string; house: string; name: string }) => {
      const l = x.label.toLowerCase();
      const starts = l.startsWith(q) || x.name.startsWith(q) || x.house.startsWith(q);
      const tokenMatch = tokens.every((t) => x.name.includes(t) || x.house.includes(t));
      return (starts ? 100 : 0) + (tokenMatch ? 10 : 0);
    };

    const ranked = items
      .filter((x) => tokens.every((t) => x.name.includes(t) || x.house.includes(t)))
      .sort((a, b) => score(b) - score(a));

    const out: { key: string; label: string; fragId?: number; fragName?: string }[] = [];
    const seen = new Set<string>();
    for (const x of ranked) {
      const k = x.label.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ key: x.key, label: x.label, fragId: x.fragId, fragName: x.fragName });
      if (out.length >= 8) break;
    }
    return out;
  }, [ALL_FRAGRANCES, search]);

  const addToCart = (item: CartItem) =>
    setCart((prev) => {
      const normalizedItem = normalizeCartItem(item);
      const idx = prev.findIndex((i) => i.id === normalizedItem.id && i.ml === normalizedItem.ml);
      if (idx >= 0) return prev.map((i, n) => (n === idx ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...normalizedItem, qty: 1 }];
    });

  const scrollToResults = useCallback(() => {
    // On mobile, jump right to the products grid so the user doesn't need to scroll
    setTimeout(() => {
      const el = document.getElementById("results");
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY;
      const offset = 110; // sticky header + breathing room
      window.scrollTo({ top: Math.max(0, y - offset), behavior: "smooth" });
    }, 120);
  }, []);

  const removeFromCart = (idx: number) => setCart((p) => p.filter((_, i) => i !== idx));

  const changeQty = (idx: number, delta: number) =>
    setCart((p) =>
      p.flatMap((i, n) => {
        if (n !== idx) return [i];
        const newQty = i.qty + delta;
        return newQty <= 0 ? [] : [{ ...i, qty: newQty }];
      })
    );

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const GENDER_FILTERS = [
    { key: "All", label: t.filterAll },
    { key: "Men", label: t.filterMen },
    { key: "Women", label: t.filterWomen },
    { key: "Unisex", label: t.filterUnisex },
  ];

  const SOCIAL = {
    instagram: "https://www.instagram.com/st.profumi?igsh=MWpucWpkMWZ0Yzlw",
    tiktok: "https://tiktok.com/@stprofumi",
    email: "orders@stprofumo.com",
  };

  const TikTokIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3v10.2a4.8 4.8 0 1 1-4-4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3c1.2 2.6 3.3 4.3 6 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const InstagramIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.2" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );

  const MailIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 8h12v8H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 8l6 5 6-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#060606", color: "#f0ece4", fontFamily: "'Segoe UI',Georgia,serif" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: scrolled ? "rgba(6,6,6,0.98)" : "rgba(6,6,6,0.7)",
            borderBottom: scrolled ? "1px solid #141414" : "1px solid transparent",
            backdropFilter: "blur(20px)",
            transition: "all 0.3s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: isMobile ? "10px 14px" : "12px 28px" }}>
            <div
              style={{
                overflow: "hidden",
                maxWidth: scrolled ? 160 : 0,
                opacity: scrolled ? 1 : 0,
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: isMobile ? 15 : 18, fontFamily: "Georgia,serif", fontWeight: 400 }}>
                <span style={{ color: "#f0ece4" }}>ST </span>
                <span style={{ background: "linear-gradient(135deg,#c9a96e,#e8c87a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PROFUMI</span>
              </span>
            </div>

            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#555", fontSize: 13 }}>🔍</span>
              <input
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchOpen(true);
                  setActiveSuggestion(-1);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" && searchOpen) {
                    e.preventDefault();
                    setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
                  }
                  if (e.key === "ArrowUp" && searchOpen) {
                    e.preventDefault();
                    setActiveSuggestion((i) => Math.max(i - 1, 0));
                  }
                  if (e.key === "Enter") {
                    const s = searchOpen ? suggestions[activeSuggestion] : undefined;
                    if (s) {
                      setSearch((s.fragName || s.label).trim());
                    }

                    // Switch to products tab and jump to results (mobile-friendly)
                    setActiveTab("shop");
                    scrollToResults();

                    // Always close the dropdown and blur the input on Enter
                    setSearchOpen(false);
                    setActiveSuggestion(-1);
                    (e.currentTarget as HTMLInputElement).blur();
                  }
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setActiveSuggestion(-1);
                    (e.currentTarget as HTMLInputElement).blur();
                  }
                }}
                style={{ width: "100%", padding: "9px 14px 9px 36px", borderRadius: 50, border: "1px solid #161616", background: "#0a0a0a", color: "#f0ece4", fontSize: 12, outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid #c9a96e33";
                  setSearchOpen(true);
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid #161616";
                  // Delay so click on suggestion still works
                  setTimeout(() => setSearchOpen(false), 120);
                }}
              />

              {searchOpen && suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: 0,
                    right: 0,
                    background: "rgba(8,8,8,0.98)",
                    border: "1px solid rgba(201,169,110,0.22)",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
                    zIndex: 500,
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#c9a96e88", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", fontWeight: 800 }}>
                    {lang === "it" ? "Suggerimenti" : "اقتراحات"}
                  </div>
                  {suggestions.map((s, idx) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => {
                        setSearch((s.fragName || s.label).trim());
                        setSearchOpen(false);
                        setActiveSuggestion(-1);
                        setActiveTab("shop");
                        setTimeout(() => {
                          const el = document.getElementById("results");
                          el && el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 50);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        background: idx === activeSuggestion ? "rgba(201,169,110,0.10)" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#f0ece4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                      onMouseEnter={() => setActiveSuggestion(idx)}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{s.label}</span>
                      <span style={{ fontSize: 10, color: "#777" }}>↵</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", background: "#0a0a0a", border: "1px solid #161616", borderRadius: 50, overflow: "hidden", flexShrink: 0 }}>
              {(["it", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: isMobile ? "6px 10px" : "7px 13px",
                    fontSize: 13,
                    cursor: "pointer",
                    border: "none",
                    background: lang === l ? "linear-gradient(135deg,#c9a96e,#8b6914)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    transition: "all 0.2s",
                  }}
                >
                  {l === "it" ? "🇮🇹" : "🇬🇧"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: isMobile ? "44px 18px 40px" : "72px 40px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9, color: "#c9a96ecc", letterSpacing: 6, textTransform: "uppercase", marginBottom: 8 }}>— {t.heroSubtitle} —</div>
            <div style={{ fontSize: isMobile ? 42 : 62, fontFamily: "Georgia,serif", fontWeight: 400, letterSpacing: -2, lineHeight: 1 }}>
              <span style={{ color: "#f0ece4" }}>ST </span>
              <span style={{ background: "linear-gradient(135deg,#c9a96e,#e8c87a,#b8860b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PROFUMI</span>
            </div>
          </div>

          <div style={{ fontSize: 9, color: "#c9a96ebb", letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>{t.tagline}</div>

          <h1 style={{ fontSize: isMobile ? "clamp(22px,6vw,32px)" : "clamp(28px,4vw,46px)", fontFamily: "Georgia,serif", fontWeight: 400, lineHeight: 1.2, margin: "0 0 18px", letterSpacing: -1.5 }}>
            {t.heroTitle1}
            <br />
            <span style={{ background: "linear-gradient(135deg,#c9a96e,#e8c87a,#c9a96e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>{t.heroTitle2}</span>
            <br />
            {t.heroTitle3}{" "}<span style={{ color: "#c9a96e" }}>€3</span>
          </h1>

          <p style={{ color: "#888", maxWidth: 460, margin: "0 auto 16px", lineHeight: 1.9, fontSize: isMobile ? 13 : 14 }}>{t.heroDesc}</p>

          <div style={{ maxWidth: 520, margin: "0 auto 26px", padding: "10px 12px", borderRadius: 12, background: "rgba(201,169,110,0.06)", border: "1px solid #c9a96e18", color: "#c9a96e", fontSize: isMobile ? 11 : 12, lineHeight: 1.7 }}>
            <div style={{ fontWeight: 900 }}>{t.discountLine1}</div>
            <div style={{ opacity: 0.95 }}>{t.discountLine2}</div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveTab("shop")}
              style={{ padding: isMobile ? "12px 26px" : "14px 36px", borderRadius: 50, border: "none", background: "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, fontSize: isMobile ? 12 : 13, cursor: "pointer", letterSpacing: 1.2, boxShadow: "0 8px 28px rgba(201,169,110,0.25)", transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {t.cta1}
            </button>
            <button
              onClick={() => setActiveTab("kit")}
              style={{ padding: isMobile ? "12px 22px" : "14px 30px", borderRadius: 50, border: "1px solid #c9a96e28", background: "transparent", color: "#c9a96e", fontWeight: 700, fontSize: isMobile ? 12 : 13, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.07)";
                e.currentTarget.style.borderColor = "#c9a96e55";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#c9a96e28";
              }}
            >
              {t.cta2} →
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 24 : 52, marginTop: 44 }}>
            {[[t.trust1, "🔬"], [t.trust2, "📦"], [`4.9/5 · ${orderCountDisplay} ${lang === "it" ? "ordini" : "orders"}`, "⭐"]].map(([label, icon]) => (
              <div key={label as string} style={{ textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? 20 : 22 }}>{icon as string}</div>
                <div style={{ fontSize: 10, color: "#cfcfcf", marginTop: 6, letterSpacing: 0.8, maxWidth: 110, lineHeight: 1.35, fontWeight: 700 }}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: isMobile ? "0 10px 22px" : "0 28px 26px", borderBottom: "1px solid #0d0d0d", overflowX: "auto" }}>
          {[["shop", t.tab1], ["kit", t.tab2], ["guide", t.tab3], ["orders", t.tab4]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: isMobile ? "9px 16px" : "10px 24px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: activeTab === key ? "linear-gradient(135deg,#c9a96e,#8b6914)" : "#0c0c0c",
                color: activeTab === key ? "#000" : "#9a9a9a",
                fontWeight: activeTab === key ? 900 : 400,
                fontSize: isMobile ? 12 : 13,
                transition: "all 0.2s",
                boxShadow: activeTab === key ? "0 4px 16px rgba(201,169,110,0.2)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div id="results" style={{ maxWidth: isWide ? 1440 : 1200, margin: "0 auto", padding: isMobile ? "22px 10px" : isTablet ? "36px 22px" : "46px 34px" }}>
          {activeTab === "shop" && (
            <>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2, alignItems: "center" }}>
                  {GENDER_FILTERS.map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setGenderFilter(g.key)}
                      style={{
                        padding: isMobile ? "8px 14px" : "9px 20px",
                        borderRadius: 50,
                        border: genderFilter === g.key ? "1.5px solid #c9a96e" : "1px solid #141414",
                        background: genderFilter === g.key ? "linear-gradient(135deg,rgba(201,169,110,0.18),rgba(139,105,20,0.1))" : "#090909",
                        color: genderFilter === g.key ? "#c9a96e" : "#777",
                        cursor: "pointer",
                        fontSize: isMobile ? 11 : 12,
                        fontWeight: genderFilter === g.key ? 800 : 400,
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                        letterSpacing: 0.5,
                        boxShadow: genderFilter === g.key ? "0 4px 16px rgba(201,169,110,0.12)" : "none",
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", fontSize: 11, color: "#666", whiteSpace: "nowrap", paddingRight: 4 }}>
                    {filtered.length} {t.available}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: isMobile ? 10 : isTablet ? 16 : 20, alignItems: "flex-start" }}>
                {Array.from({ length: cols }).map((_, colIndex) => (
                  <div key={colIndex} style={{ flex: 1, display: "flex", flexDirection: "column", gap: isMobile ? 10 : isTablet ? 16 : 20 }}>
                    {filtered.filter((_, i) => i % cols === colIndex).map((f) => (
                      <FragranceCard key={f.id} frag={f} onAdd={addToCart} cart={cart} cols={cols} lang={lang} />
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "kit" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 9, color: "#c9a96e", letterSpacing: 4, marginBottom: 10, textTransform: "uppercase" }}>{t.kitCurated}</div>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 28 : 36, fontWeight: 400, margin: "0 0 10px" }}>{t.kitTitle}</h2>
                <p style={{ color: "#666", fontSize: 13 }}>{t.kitSubtitle}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : isWide ? "repeat(4,1fr)" : "repeat(3,1fr)", gap: isMobile ? 10 : isTablet ? 16 : 20 }}>
                {DISCOVERY_KITS.map((kit) => (
                  <div
                    key={kit.id}
                    style={{ background: "linear-gradient(145deg,#0d0d0d,#080808)", border: "1px solid #141414", borderRadius: 20, padding: isMobile ? 18 : 28, transition: "all 0.3s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "1px solid #c9a96e33";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 20px 50px rgba(201,169,110,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "1px solid #141414";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        height: isMobile ? 120 : 150,
                        borderRadius: 16,
                        border: "1px solid #141414",
                        background: "radial-gradient(ellipse at 50% 60%, #131008, #070605)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        overflow: "hidden",
                        marginBottom: 14,
                        position: "relative",
                      }}
                    >
                      {kit.image ? (
                        <img
                          src={kit.image}
                          alt={lang === "it" ? kit.nameIt : kit.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center bottom",
                            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.85)) drop-shadow(0 2px 12px rgba(201,169,110,0.15))",
                            transform: "scale(1.03)",
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: isMobile ? 36 : 44, marginBottom: 14 }}>{kit.emoji}</div>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 16 : 19, fontWeight: 400, color: "#f0ece4", margin: "0 0 12px" }}>{lang === "it" ? kit.nameIt : kit.name}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                      {kit.items.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? 11 : 12, color: "#444" }}>
                          <span style={{ color: "#c9a96e", fontSize: 7 }}>◆</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ textDecoration: "line-through", color: "#555", fontSize: 12 }}>€{kit.originalPrice}</div>
                        <div style={{ color: "#c9a96e", fontSize: isMobile ? 24 : 30, fontFamily: "Georgia,serif", lineHeight: 1 }}>€{kit.price}</div>
                        <div style={{ fontSize: 10, color: "#22c55e", marginTop: 3 }}>{t.kitSave} €{kit.originalPrice - kit.price}</div>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: kit.id,
                            name: lang === "it" ? kit.nameIt : kit.name,
                            house: "Kit",
                            emoji: "", // no emoji for kits
                            image: kit.image,
                            ml: "Set",
                            price: kit.price,
                            qty: 1,
                            isFull: false,
                          })
                        }
                        style={{ padding: isMobile ? "10px 16px" : "12px 22px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, cursor: "pointer", fontSize: isMobile ? 11 : 13, boxShadow: "0 6px 20px rgba(201,169,110,0.2)" }}
                      >
                        {t.kitBuy}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              {(isThankYou || isReceived) && (
                <div style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(201,169,110,0.08))", border: "1px solid rgba(34,197,94,0.22)", borderRadius: 18, padding: isMobile ? 16 : 22, marginBottom: 14 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 22 : 28, color: "#eaf7ee", marginBottom: 6 }}>{lang === "it" ? "Ordine ricevuto" : "تم الاستلام"}</div>
                  <div style={{ color: "#9fb9a8", fontSize: 13, lineHeight: 1.8 }}>
                    {lang === "it"
                      ? "Grazie! Abbiamo ricevuto il tuo ordine."
                      : "شكراً لك! تم استلام طلبك بنجاح."}
                  </div>

                  {(receivedParams.order || receivedParams.name) && (
                    <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                      <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12 }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#6aa58a", fontWeight: 800 }}>{lang === "it" ? "Numero ordine" : "رقم الطلب"}</div>
                        <div style={{ marginTop: 6, fontSize: 16, color: "#eaf7ee", fontWeight: 900, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>
                          {receivedParams.order || (lang === "it" ? "—" : "—")}
                        </div>
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12 }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#6aa58a", fontWeight: 800 }}>{lang === "it" ? "Cliente" : "اسم العميل"}</div>
                        <div style={{ marginTop: 6, fontSize: 16, color: "#eaf7ee", fontWeight: 900 }}>
                          {receivedParams.name || (lang === "it" ? "—" : "—")}
                        </div>
                      </div>
                    </div>
                  )}

                  {isReceived && !(receivedParams.order || receivedParams.name) && (
                    <div style={{ marginTop: 12, color: "#7aa996", fontSize: 12, lineHeight: 1.8 }}>
                      {lang === "it"
                        ? "Suggerimento: configura Shopify per reindirizzare a questa pagina con ?order=...&name=..."
                        : "ملاحظة: تحتاج إعداد Shopify ليُرجعك لهذه الصفحة مع ?order=...&name=..."}
                    </div>
                  )}
                </div>
              )}

              <div style={{ background: "#0a0a0a", border: "1px solid #111", borderRadius: 18, padding: isMobile ? 16 : 22 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 18 : 22, color: "#f0ece4", marginBottom: 6 }}>{t.authTitle}</div>
                    <div style={{ color: "#666", fontSize: 13, lineHeight: 1.8 }}>{t.checkoutLoginHint}</div>
                  </div>
                  {session?.user ? (
                    <button onClick={handleLogout} style={{ padding: "10px 14px", borderRadius: 14, border: "1px solid #1e1e1e", background: "#0d0d0d", color: "#c9a96e", fontWeight: 800, cursor: "pointer" }}>
                      {t.logout}
                    </button>
                  ) : null}
                </div>

                {!supabaseReady && (
                  <div style={{ marginTop: 16, padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.35)", color: "#888", fontSize: 12, lineHeight: 1.8 }}>
                    {lang === "it"
                      ? "Configurazione mancante: aggiungi VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY."
                      : "Missing setup: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."}
                  </div>
                )}

                {supabaseReady && !session?.user && (
                  <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 11, color: "#777" }}>{t.emailLabel}</label>
                      <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 11, color: "#777" }}>{t.passwordLabel}</label>
                      <input type="password" value={authPass} onChange={(e) => setAuthPass(e.target.value)} style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button disabled={authLoading} onClick={handleLogin} style={{ padding: "12px 18px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, cursor: authLoading ? "not-allowed" : "pointer", opacity: authLoading ? 0.7 : 1 }}>
                        {t.login}
                      </button>
                      <button disabled={authLoading} onClick={handleSignup} style={{ padding: "12px 18px", borderRadius: 14, border: "1px solid #c9a96e33", background: "transparent", color: "#c9a96e", fontWeight: 900, cursor: authLoading ? "not-allowed" : "pointer", opacity: authLoading ? 0.7 : 1 }}>
                        {t.signup}
                      </button>
                    </div>

                    {authError && (
                      <div style={{ gridColumn: isMobile ? "auto" : "1 / -1", color: "#c9a96e", fontSize: 12, lineHeight: 1.6, opacity: 0.95 }}>{authError}</div>
                    )}
                  </div>
                )}

                {supabaseReady && session?.user && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ color: "#888", fontSize: 12, marginBottom: 10 }}>
                      {session.user.email}
                      {isAdmin ? (
                        <span style={{ marginLeft: 10, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(201,169,110,0.25)", background: "rgba(201,169,110,0.08)", color: "#c9a96e", fontSize: 11, fontWeight: 900 }}>
                          ADMIN
                        </span>
                      ) : null}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.25)" }}>
                        <div style={{ fontSize: 10, color: "#777", letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>{t.addAddress}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                          <input placeholder="Label" value={addrDraft.label} onChange={(e) => setAddrDraft((p: any) => ({ ...p, label: e.target.value }))} style={{ padding: "9px 10px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                          <input placeholder="Phone" value={addrDraft.phone} onChange={(e) => setAddrDraft((p: any) => ({ ...p, phone: e.target.value }))} style={{ padding: "9px 10px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                        </div>
                        <input placeholder="Address line" value={addrDraft.address_line1} onChange={(e) => setAddrDraft((p: any) => ({ ...p, address_line1: e.target.value }))} style={{ marginTop: 8, padding: "9px 10px", width: "100%", boxSizing: "border-box", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                          <input placeholder="City" value={addrDraft.city} onChange={(e) => setAddrDraft((p: any) => ({ ...p, city: e.target.value }))} style={{ padding: "9px 10px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                          <input placeholder="Postal code" value={addrDraft.postal_code} onChange={(e) => setAddrDraft((p: any) => ({ ...p, postal_code: e.target.value }))} style={{ padding: "9px 10px", borderRadius: 12, border: "1px solid #1a1a1a", background: "#070707", color: "#f0ece4" }} />
                        </div>
                        <button
                          onClick={() => addAddress(addrDraft)}
                          style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, cursor: "pointer" }}
                        >
                          {t.save}
                        </button>
                      </div>

                      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.25)" }}>
                        <div style={{ fontSize: 10, color: "#777", letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>{t.myAddresses}</div>
                        {addresses.length === 0 ? (
                          <div style={{ color: "#555", fontSize: 12 }}>—</div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {addresses.map((a) => (
                              <div key={a.id} style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 10, color: "#888", fontSize: 12, lineHeight: 1.6 }}>
                                <div style={{ color: "#c9a96e", fontWeight: 900 }}>{a.label || 'Address'}</div>
                                <div>{a.address_line1}</div>
                                <div>{a.city} {a.postal_code}</div>
                                {a.phone ? <div>{a.phone}</div> : null}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: 16, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, background: "rgba(0,0,0,0.25)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 10, color: "#777", letterSpacing: 2, textTransform: "uppercase", fontWeight: 800 }}>{t.myOrders}</div>
                        <button onClick={refreshUserData} style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid #1e1e1e", background: "#0d0d0d", color: "#888", cursor: "pointer", fontWeight: 700 }}>
                          ↻
                        </button>
                      </div>

                      {orders.length === 0 ? (
                        <div style={{ marginTop: 10, color: "#555", fontSize: 12, lineHeight: 1.6 }}>{t.trackText}</div>
                      ) : (
                        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                          {orders.map((o) => (
                            <div key={o.id} style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                <div>
                                  <div style={{ color: "#c9a96e", fontWeight: 900, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>{o.id}</div>
                                  <div style={{ color: "#666", fontSize: 12 }}>{new Date(o.created_at).toLocaleString()}</div>
                                </div>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                  <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(201,169,110,0.22)", background: "rgba(201,169,110,0.08)", color: "#c9a96e", fontWeight: 900, fontSize: 12 }}>
                                    {o.status || 'processing'}
                                  </span>
                                  {o.tracking_url ? (
                                    <a href={o.tracking_url} target="_blank" rel="noreferrer" style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(34,197,94,0.22)", background: "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 900, fontSize: 12, textDecoration: "none" }}>
                                      {t.tracking}
                                    </a>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {isAdmin && (
                      <div style={{ marginTop: 16, border: "1px solid rgba(201,169,110,0.18)", borderRadius: 16, padding: 14, background: "rgba(201,169,110,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                          <div style={{ fontSize: 10, color: "#c9a96e", letterSpacing: 2, textTransform: "uppercase", fontWeight: 900 }}>{t.adminPanel}</div>
                          <button onClick={fetchAdminOrders} style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid rgba(201,169,110,0.25)", background: "transparent", color: "#c9a96e", cursor: "pointer", fontWeight: 900 }}>
                            Load orders
                          </button>
                        </div>

                        {adminOrders.length > 0 && (
                          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                            {adminOrders.slice(0, 25).map((o) => (
                              <div key={o.id} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 12, background: "rgba(0,0,0,0.22)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                  <div>
                                    <div style={{ color: "#c9a96e", fontWeight: 900, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}>{o.id}</div>
                                    <div style={{ color: "#777", fontSize: 12 }}>{o.customer_email || '—'}</div>
                                  </div>
                                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                                    <select
                                      value={o.status || 'processing'}
                                      onChange={(e) => updateAdminOrder({ id: o.id, status: e.target.value })}
                                      style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "#070707", color: "#f0ece4" }}
                                    >
                                      <option value="processing">processing</option>
                                      <option value="shipped">shipped</option>
                                      <option value="delivered">delivered</option>
                                    </select>
                                    <input
                                      placeholder="Carrier (GLS / Poste Italiane)"
                                      defaultValue={o.carrier || ''}
                                      onBlur={(e) => updateAdminOrder({ id: o.id, carrier: e.target.value })}
                                      style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "#070707", color: "#f0ece4", minWidth: 160 }}
                                    />
                                    <input
                                      placeholder="Tracking #"
                                      defaultValue={o.tracking_number || ''}
                                      onBlur={(e) => updateAdminOrder({ id: o.id, tracking_number: e.target.value, carrier: o.carrier })}
                                      style={{ padding: "8px 10px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "#070707", color: "#f0ece4", minWidth: 140 }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
                          <div style={{ fontSize: 10, color: "#c9a96e", letterSpacing: 2, textTransform: "uppercase", fontWeight: 900, marginBottom: 10 }}>{t.newAnnouncement}</div>
                          <input placeholder={t.announcementSubject} value={adminSubject} onChange={(e) => setAdminSubject(e.target.value)} style={{ padding: "9px 10px", width: "100%", boxSizing: "border-box", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "#070707", color: "#f0ece4" }} />
                          <textarea placeholder={t.announcementMessage} value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} style={{ marginTop: 8, padding: "9px 10px", width: "100%", boxSizing: "border-box", borderRadius: 12, border: "1px solid rgba(255,255,255,0.10)", background: "#070707", color: "#f0ece4", minHeight: 90 }} />
                          <button onClick={sendAnnouncement} style={{ marginTop: 10, padding: "10px 12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#c9a96e,#8b6914)", color: "#000", fontWeight: 900, cursor: "pointer" }}>
                            {t.sendAnnouncement}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{ fontSize: 9, color: "#c9a96e", letterSpacing: 4, marginBottom: 10, textTransform: "uppercase" }}>{t.guideSubtitle}</div>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 26 : 34, fontWeight: 400, margin: 0 }}>{t.guideTitle}</h2>
              </div>
              {t.guideItems.map((s, i) => (
                <div
                  key={i}
                  style={{ background: "#0a0a0a", border: "1px solid #111", borderRadius: 16, padding: isMobile ? 18 : 26, marginBottom: 14, transition: "border 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid #c9a96e22")}
                  onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid #111")}
                >
                  <h3 style={{ color: "#c9a96e", fontFamily: "Georgia,serif", fontWeight: 400, fontSize: isMobile ? 16 : 19, margin: "0 0 10px" }}>{s.title}</h3>
                  <p style={{ color: "#444", lineHeight: 1.85, margin: 0, fontSize: 13 }}>{s.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid #0d0d0d", padding: isMobile ? "28px 20px 100px" : "44px 44px 100px", textAlign: "center", marginTop: 44 }}>
          <div style={{ fontSize: 8, color: "#c9a96e88", letterSpacing: 6, marginBottom: 8, textTransform: "uppercase" }}>ST PROFUMI · {lang === "it" ? "Campioni di Lusso" : "Luxury Samples"}</div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", margin: "10px 0 6px" }}>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={{ color: "#c9a96e", opacity: 0.9, display: "inline-flex" }}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              style={{ color: "#c9a96e", opacity: 0.9, display: "inline-flex" }}
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={`mailto:${SOCIAL.email}`}
              aria-label="Email"
              style={{ color: "#c9a96e", opacity: 0.9, display: "inline-flex" }}
            >
              <MailIcon size={18} />
            </a>
          </div>

          <div style={{ color: "#8a8a8a", fontSize: 10, marginTop: 4 }}>{t.footer}</div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          style={{
            position: "fixed",
            bottom: isMobile ? 20 : 28,
            right: isMobile ? 14 : 28,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 14px 9px 9px",
            borderRadius: 50,
            border: "none",
            background: "linear-gradient(135deg,#d4873a,#b85c10)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 13,
            boxShadow: "0 6px 20px rgba(170,80,10,0.65), 0 2px 6px rgba(0,0,0,0.45)",
            transition: "transform 0.18s, box-shadow 0.18s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(170,80,10,0.75)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(170,80,10,0.65), 0 2px 6px rgba(0,0,0,0.45)";
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <span>{lang === "it" ? "Carrello" : "Cart"}</span>
          {cartCount > 0 && <span style={{ background: "rgba(0,0,0,0.22)", borderRadius: 50, padding: "1px 7px", fontSize: 11, fontWeight: 900, color: "#fff" }}>{cartCount}</span>}
        </button>
      </div>

      {showCart && (
        <CartDrawer
          items={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onQty={changeQty}
          isMobile={isMobile}
          lang={lang}
          customerEmail={session?.user?.email || undefined}
          userId={session?.user?.id || undefined}
        />
      )}

    </>
  );
}
