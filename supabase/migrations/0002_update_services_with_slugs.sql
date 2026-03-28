-- Atnaujina paslaugų duomenis su naujais laukais: slug, fullDescription, features
-- Paleiskite šį SQL jei jau turėjote senas duomenis be slug laukų

UPDATE site_content
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      content,
      '{services}',
      '[
        {
          "title": "Butų valymas",
          "slug": "butu-valymas",
          "description": "Reguliarus ir generalinis butų valymas su dėmesiu virtuvei, voniai ir sunkiau pasiekiamoms vietoms.",
          "fullDescription": "Mūsų komanda atlieka profesionalų butų valymą Vilniuje – tiek vienkartinį generalinį, tiek reguliarų palaikomąjį. Kiekvieną kampelį kruopščiai išvalome, kad jūsų namai visada atrodytų švarūs ir jaukūs.\n\nDirbame su saugiomis, ekologiškomis valymo priemonėmis, kurios nekenksmingas žmonėms ir augintiniams. Prieš kiekvieną valymą aptariame jūsų pageidavimus ir sudarome individualų planą.",
          "features": [
            "Grindų ir kilimų valymas bei dulkių siurbimas",
            "Virtuvės paviršių valymas ir dezinfekavimas",
            "Vonios kambario valymas ir šveičiamas",
            "Langų ir veidrodžių šluostymas",
            "Baldų paviršių valymas nuo dulkių",
            "Šiukšlių išnešimas ir maišų pakeitimas",
            "Sunkiai pasiekiamų vietų valymas"
          ],
          "image": "/images/hero-clean.png"
        },
        {
          "title": "Biurų priežiūra",
          "slug": "biuru-prieziura",
          "description": "Lankstus valymo grafikas biurams ir komercinėms patalpoms, kad darbo aplinka visada išliktų tvarkinga.",
          "fullDescription": "Tvarkinga darbo aplinka – produktyvios komandos pagrindas. Teikiame reguliarias ir vienkartines biurų valymo paslaugas Vilniuje, pritaikytas prie jūsų darbo grafiko – galime dirbti rytu, vakare arba savaitgaliais.\n\nSudarome ilgalaikius sutarties pagrindus, todėl galite būti tikri, kad jūsų biuras bus švaros visuomet.",
          "features": [
            "Darbo vietų ir stalų paviršių valymas",
            "Grindų valymas ir poliravimas",
            "Bendro naudojimo patalpų valymas",
            "Virtuvėlės ir poilsio zonų priežiūra",
            "Tualetų valymas ir dezinfekavimas",
            "Šiukšliadėžių ištuštinimas",
            "Stiklainių ir pertvarų valymas",
            "Lankstus grafikas pagal jūsų poreikius"
          ],
          "image": "/images/hero-clean.png"
        },
        {
          "title": "Po remonto valymas",
          "slug": "po-remonto-valymas",
          "description": "Statybinių dulkių, dažų likučių ir kitų nešvarumų šalinimas po remonto darbų.",
          "fullDescription": "Po remonto likusios statybinės dulkės, dažų dėmės ir kiti nešvarumai reikalauja specialių valymo priemonių ir profesionalios technikos. Mūsų komanda turi patirties dirbant sudėtingose sąlygose ir greitai sutvarkys jūsų patalpas.\n\nAtliekame tiek dalinį, tiek generalinį po remonto valymą – nuo langų ir sienų iki grindų ir lubų.",
          "features": [
            "Statybinių dulkių šalinimas visose patalpose",
            "Dažų ir skiedinio dėmių valymas",
            "Plytelių ir fugų valymas",
            "Langų ir stiklo paviršių valymas",
            "Santechnikos ir armatūros poliravimas",
            "Grindų valymas ir apsauga",
            "Šiukšlių ir statybinių atliekų tvarkymas",
            "Galutinis patalpų paruošimas gyvenimui"
          ],
          "image": "/images/hero-clean.png"
        }
      ]'::jsonb
    ),
    '{updatedAt}',
    to_jsonb(now()::text)
  ),
  '{contact,hours}',
  '"Dirbame I–VII pagal susitarimą"'::jsonb
)
WHERE id = 1;
