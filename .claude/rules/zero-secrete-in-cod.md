---
paths:
  - "**/*"
  - "!node_modules/**"
  - "!.next/**"
  - "!dist/**"
  - "!.git/**"
---
# Depozitul nu poarta niciun secret si niciun material intern

## Ce e un secret: testul rotatiei

Aplicabil fara judecata: **daca valoarea ar trebui SCHIMBATA in clipa in care un strain o citeste,
e secret.** Daca ramane valida si corecta dupa ce a fost citita de oricine, e configurare si se
comite linistit.

Cheie de API, parola, jeton, cheie privata, sir de conexiune: toate cad la stanga, fiindca lectura
lor de catre un strain le anuleaza. Numele unei gazde, un port, o ruta, un identificator de
aplicatie: cad la dreapta, fiindca lectura nu le strica.

Secretele traiesc in variabilele de mediu ale aplicatiei si in secretele depozitului. Nicaieri
altundeva.

## Ce e material intern: testul destinatarului

Aplicabil fara judecata: **a fost scris ca sa fie citit de client sau de un strain?** Daca a fost
scris pentru noi - analiza unui concurent, pret de cost, material de vanzare, note despre relatia
cu clientul - nu intra in depozit, chiar daca nu contine nicio valoare rotabila.

Datele personale intra tot aici: nume, telefoane, adrese de posta personale, orice identifica un om
anume. Un numar de telefon nu se roteste.

## Vizibilitatea depozitului nu e o aparare

Starea "public" sau "privat" a unui depozit se schimba dintr-un buton, si s-a schimbat de doua ori
intr-o singura zi in proiectul asta. Istoricul nu se schimba odata cu ea: ce a fost comis ramane in
obiectele git, in clonele existente, in cache-urile de la distanta si in orice fork. **Regula se
aplica la fel in ambele stari** - de aia nu e scrisa nicaieri drept "fiindca depozitul e public".

## Ordinea la incident

Cand un secret a ajuns totusi in istoric: **intai se roteste secretul, apoi se curata istoricul.**
Ordinea inversa lasa secretul valid pe internet exact cat dureaza curatarea, adica intervalul in
care stie si atacatorul ca e acolo.

## Corect si gresit

```
gresit:  const cheie = "valoarea propriu-zisa scrisa in fisier"
corect:  const cheie = process.env.CHEIE_SERVICIU

gresit:  // comparatie cu <numele firmei concurente> pe pretul de scanare
corect:  // comparatie de piata; materialul sta in afara depozitului
```

## Why

Ce se strica: o valoare care trebuie rotita ajunge citibila de oricine, permanent. Sau un material
scris pentru noi ajunge sub ochii celui despre care e scris.

Cum arata in momentul in care se strica: nu arata a incident. Arata a comentariu de doua cuvinte
lasat la coada unui rand, sau a fisier de cache comis din reflex. Pe 5 septembrie 2026 numele unui
concurent ajunsese in doua comentarii de cod si intr-un fisier compilat din cache; a fost prins
citind, cu ochii, o singura data.

De ce nu-l vede masinaria: un secret e sintactic identic cu orice alt sir, iar un material intern e
sintactic identic cu orice alta proza. Nimic din forma nu il deosebeste; il deosebeste destinatarul.

Poarta care il prinde: **`poarta-scurgeri.py`**, pe amprente de cuvinte si pe cateva tipare de forma
cunoscuta. Ce nu prinde: numele scris altfel decat amprenta lui, orice fisier cu o extensie
neinclusa in lista ei - fisierul compilat din incidentul de mai sus NU ar fi prins nici azi - si
tot ce e deja in istoric, fiindca poarta citeste arborele de lucru. Pentru istoric si pentru
destinatar, proza e singura garda.
