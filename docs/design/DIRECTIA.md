# Directia alternativei 3s3

Versiunea actuala urmeaza ADR-0008. Documentele anterioare raman istorice.

## Compozitie

Titluri ample, tipografie Inter, spatiu alb si o suprafata diagonala cu gradient. Demonstratia este parte din deschiderea paginii, cu documentul sursa accesibil. Nu exista cifre de performanta sau sigle de clienti inventate.

Serviciile folosesc o structura in trei coloane; procesul operational are fundal inchis si fotografie relevanta. Pagina de domenii este un index editorial. Paginile de domeniu au cate un inventar specific, o problema concreta si trei pasi adaptati. Ghidul, costurile, comparatia, contactul si paginile juridice au structuri proprii.

## Culoare

Text principal #18253e, text secundar #546378, actiune #5844d8, fundal operational #102b48. Accentul secundar variaza discret in exemplele de domeniu. Culoarea nu este singurul indiciu pentru starea unui control.

## Interactiune si acces

Meniul mobil si sursele documentelor folosesc dialoguri modale cu focalizare limitata la interior, inchidere Escape si revenire la declansator. Linkurile sunt elemente de navigare, butoanele schimba starea. Preferinta pentru miscare redusa dezactiveaza animatia decorativa.

Pe mobil se elimina coloana laterala a demonstratiei, tabelele lungi se adapteaza, iar comparatia ofera selector de varianta. Footerul pastreaza doua coloane de navigare si legaturile juridice.

## Fotografie

public/img/scan.webp: pregatire de documente la un scaner profesional.
public/img/archive.webp: recuperarea unei cutii din raft, cu carucior de lucru.

Ambele au 1536 x 1024 pixeli si sunt declarate ilustratii generate cu AI. Instructiunile originale sunt pastrate in src/content/assets.json. Nu se folosesc fotografii decorative de mobilier sau portrete fictive prezentate drept echipa.

## Limitele verificarii

Testele automate acopera rute, imagini, tastatura, fluxuri si constrangeri tehnice. Calitatea editoriala si vizuala necesita si citirea tuturor paginilor, plus inspectia capturilor desktop si mobil. Numarul de teste nu este un scor de design.
