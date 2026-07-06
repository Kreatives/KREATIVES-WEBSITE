---
name: kreatives-blog-visuals
description: Genereer Higgsfield prompts voor blog-thumbnails en hero-foto's van KREATIVES blogartikelen, op basis van de blogtitel, inhoud en categorie. Gebruik deze skill ALTIJD wanneer Ricky een foto, thumbnail, hero image of "visual" nodig heeft voor een blogpost, een blogtitel of blogtekst deelt en vraagt om beeld, zegt "maak de foto's voor deze blog", een blog-URL deelt met de vraag om een thumbnail, of zijn eigen foto uploadt en vraagt om alleen de achtergrond te veranderen voor een blogbeeld. Ook van toepassing wanneer hij meerdere blogs tegelijk van beeld wil voorzien of de blog-fotostijl consistent wil houden.
---

# KREATIVES Blog Visuals

Genereer per blogartikel exact **2 Higgsfield prompts**: één voor de **thumbnail** (blogoverzicht/kaart) en één voor de **hero-foto** (bovenaan het artikel). De beelden moeten inhoudelijk kloppen bij de blog, per categorie de juiste sfeer hebben, en samen één consistente KREATIVES-look vormen over het hele blogoverzicht.

Deze skill bouwt voort op de prompt-anatomie van `higgsfield-prompt-builder` (10 lagen), maar met vaste stijlregels en harde restricties die NOOIT overtreden mogen worden.

---

## HARDE REGELS — nooit overtreden

### 1. NOOIT hoofden of gezichten
Geen gezichten, geen hoofden, ook niet van achteren, ook niet onscherp op de achtergrond. AI-gegenereerde gezichten maken het beeld direct herkenbaar als AI en breken de stockfoto-look.

**Los dit op via framing, niet via negatieve prompts.** BELANGRIJK: vraag NOOIT om een zichtbare torso/romp met het hoofd buiten beeld ("framed from chest down", "head out of frame") — het model rendert dan vaak een onthoofd lichaam in beeld. Gebruik uitsluitend deze veilige framings:
- **Hands-only**: alleen handen en onderarmen die vanaf de framerand binnenkomen (schrijven, typen, koffie inschenken, telefoon vasthouden). De rest van de persoon bestaat buiten het frame.
- **Overhead flatlay**: bureau, notitieboek, materialen recht van bovenaf — eventueel met handen vanaf de rand
- **Still life / omgeving**: gestyled werkplekhoekje, restauranttafel, architectuurdetail, objectcompositie — helemaal zonder mensen
- **Detail-shots**: extreme close-up van pen op papier, laptophoek, stoffen, materialen

Zet in de prompt altijd expliciete framing-taal: *"a tight close-up of the desk surface, only two hands and forearms entering the frame from the bottom edge"*, *"no people in frame"*, *"cropped tightly on the hands and desk surface"*. Vermijd woorden als "person", "woman", "man", "seated figure" — beschrijf alleen wat er ín het frame zit (handen, mouwen, objecten).

**Enige uitzondering:** Ricky uploadt een eigen foto → zie "Modus B" hieronder. Dan blijft hij volledig intact en verandert alleen de achtergrond.

### 2. NOOIT webdesign of designwerk in beeld
Geen zichtbare websites, UI's, wireframes, Figma-schermen, moodboards met layouts, of schetsen van interfaces. AI rendert dit vreemd en het verraadt het beeld direct.

Oplossingen:
- Laptopschermen: **dichtgeklapt, van de zijkant/achterkant gezien, buiten focus, of onder een hoek waardoor het scherm niet leesbaar is** (*"laptop screen angled away from camera"*, *"closed MacBook"*, *"screen out of frame"*)
- Notitieboeken: handschrift-suggestie of blanco, **nooit UI-schetsen**
- Papier/prints: abstracte texturen, kleurstalen, materiaalsamples — geen layouts

### 3. Stockfoto-realisme, geen AI-perfectie
Het beeld moet aanvoelen als een premium stockfoto of editorial lifestyle-shot. Bouw imperfectie in: natuurlijke rommel op een bureau, gebruikssporen, asymmetrische compositie, echt daglicht.

---

## De KREATIVES bloglook — vaste stijllaag

Deze laag gaat in **elke** prompt, zodat alle blogbeelden samen één grid vormen. Alleen de scène varieert.

**Kleurpalet:** warme neutralen — beige, crème, zand, taupe, zacht bruin hout, gebroken wit. Eén gedempte accentkleur toegestaan (bijv. muted teal, terracotta, navy) afhankelijk van categorie. Geen felle kleuren, geen koude blauwe kantoorsfeer.

**Licht:** zacht natuurlijk daglicht, meestal van opzij door een groot raam of sheer gordijnen. Zachte schaduwen, warme gloed. Geen harde flits, geen studiolampen-look.

**Setting-taal:** premium maar geleefd — warm houten vloeren, linnen, keramiek, boeken, natuurlijke materialen. Denk editorial lifestyle (Sézane / Kinfolk-achtig), niet corporate stock.

**Camera/ästhetiek (standaard):** *"Shot on a full-frame mirrorless camera with a 50mm lens at f/2.8, soft natural depth of field, subtle film-like grain, warm color grade, high-end editorial lifestyle photography"*

**Mood-zin (bindend, pas aan per blog):** varianten op *"Calm, warm, and composed editorial work atmosphere — premium yet lived-in"*

---

## Categorie → scène-richting

Kies de scène op basis van categorie(ën) + bloginhoud. Combineer bij dubbele categorieën de dominante.

| Categorie | Scène-richting (altijd zonder hoofden, zonder designwerk) |
|---|---|
| **Prijzen** | Handen met rekenmachine/notitieboek met cijfers-suggestie, offerte-envelop op bureau, koffie + pen + papier flatlay, hand die factuur/document vasthoudt |
| **Webdesign** | Werkplek-stillleven: dichtgeklapte MacBook, notitieboek, koffie; handen op toetsenbord met scherm buiten beeld; bureau van opzij met warm licht |
| **AI** | Iets moderner/strakker: hand met telefoon, minimalistisch bureau met subtiel techniek-element, abstracte compositie met licht en schaduw — hou het warm, niet futuristisch-blauw |
| **Redesign** | Verandering suggereren: verfstalen/materiaalsamples naast elkaar, half opgeruimd bureau, hand die oude papieren opzij schuift, voor/na-gevoel in objecten |
| **Strategie** | Notitieboek met handgeschreven aantekeningen (geen schetsen), hand met pen boven papier, schaakstuk of ander metafoor-object op warm bureau, koffiegesprek-tafel van bovenaf |
| **Werkwijze** | Proces-suggestie: geordende bureau-flatlay, agenda/planner met handen, twee koffiekopjes aan tafel (gesprek-suggestie, personen buiten beeld) |
| **Horeca** | Restaurantscène: gedekte tafel met warm licht, handen van chef/bediening met bord (gekaderd op handen), interieurdetail van restaurant, menukaart op tafel (tekst onleesbaar/soft focus) |
| **Coaches** | Rustige 1-op-1 setting: twee stoelen bij raam, notitieboek + thee, handen in gesprek-gebaar over tafel (hands-only vanaf framerand), zachte woonkamer/praktijk-sfeer |

Nieuwe categorie zonder match? Leid de scène af uit de bloginhoud en hou je aan de vaste stijllaag.

---

## Twee modi

### Modus A — Volledig gegenereerd beeld (standaard)
Ricky geeft titel + inhoud (of URL/samenvatting) + categorie. Jij levert 2 prompts.

**Thumbnail (3:2 landscape):**
- Eén duidelijk onderwerp, leesbaar op klein formaat (blogkaart)
- Iets strakkere, meer gecentreerde compositie
- Weinig visuele ruis — het moet op 300px breed nog werken

**Hero (16:9 wide):**
- Bredere scène, meer omgeving en gelaagdheid (FG/MG/BG)
- Ruimte in de compositie waar eventueel een titel overheen kan (rustige zone links of rechts)
- Mag hetzelfde onderwerp zijn als de thumbnail in een wijder kader, of een tweede scène uit dezelfde "wereld"

Thumbnail en hero moeten voelen als twee foto's uit **dezelfde shoot**: zelfde licht, zelfde palet, zelfde locatie-suggestie.

### Modus B — Eigen foto van Ricky (achtergrond vervangen)
Als Ricky een foto van zichzelf uploadt: **hij blijft volledig onaangetast**. Alleen de achtergrond wordt vervangen.

De prompt moet dan:
1. Expliciet instrueren dat het subject exact behouden blijft: *"Keep the subject completely unchanged — same pose, clothing, lighting on the subject, and proportions. Replace only the background."*
2. De nieuwe achtergrond beschrijven volgens de vaste stijllaag + categorie-richting
3. De lichtrichting van de nieuwe achtergrond laten **matchen met het licht dat al op Ricky valt** (analyseer eerst de foto: waar komt het licht vandaan, warm of koel, hard of zacht) — anders wordt het composiet zichtbaar
4. Perspectief en camerahoogte van de originele foto respecteren

In deze modus vervallen de "geen hoofden"-regels vanzelfsprekend voor Ricky zelf, maar er mogen **geen andere mensen** in de gegenereerde achtergrond staan, en nog steeds geen designwerk in beeld.

---

## Werkwijze

1. **Lees de input.** Titel, inhoud/samenvatting, categorie(ën). Bij een URL zonder inhoud: vraag om een korte samenvatting of haal de kern uit de titel + meta-beschrijving. Bij meerdere blogs tegelijk: verwerk ze allemaal, maar varieer de scènes zodat het blogoverzicht niet repetitief wordt (niet drie keer "handen met koffie").
2. **Bepaal het concept.** Wat is de kernboodschap van de blog, en welk concreet, fotografeerbaar beeld (zonder hoofden, zonder designwerk) vertegenwoordigt dat? Kies uit de categorie-richting of bedenk iets passenders binnen de stijllaag.
3. **Schrijf de 2 prompts** volgens de anatomie van `higgsfield-prompt-builder`: shot type eerst, dan subject (handen/objecten hyper-specifiek: materiaal + kleur + staat), licht (richting + kwaliteit + effect), gelaagde achtergrond, camera specs, ästhetiek, kleurpalet, textuur-taal, afsluitende mood-zin. Doorlopende tekst, 150–300 woorden per prompt, in het Engels.
4. **Kwaliteitscheck** (verplicht, voor elke prompt):
   - [ ] Kan er fysiek geen hoofd in frame zijn door de gekozen framing?
   - [ ] Expliciete framing-taal aanwezig ("head out of frame" / "only hands visible" / "no people in frame")?
   - [ ] Geen zichtbare schermen met content, geen UI, geen wireframes/layouts?
   - [ ] Vaste stijllaag verwerkt (palet, daglicht, editorial ästhetiek)?
   - [ ] Concept sluit aan bij de bloginhoud, niet alleen bij de categorie?
   - [ ] Thumbnail werkt op klein formaat; hero heeft rustige zone voor titel-overlay?
   - [ ] Aspect ratio benoemd (3:2 thumbnail, 16:9 hero)?

## Output formaat

Per blog:

```
## [Blogtitel]

**Concept:** [1-2 zinnen: welk beeld en waarom het past bij de inhoud]

### Thumbnail (3:2)
[volledige Higgsfield prompt]

### Hero (16:9)
[volledige Higgsfield prompt]
```

Geen lange uitleg eromheen. Bij meerdere blogs: elk blog zijn eigen blok, en sluit af met één regel over hoe de variatie over het grid is verdeeld.
