#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Vaneaza liniutele lungi (em-dash / en-dash) pe PUNCTE DE COD, cu controalele obligatorii.

DE CE EXISTA, si e o cifra, nu o preferinta de stil (#988):
    reteta care circula in fabrica era `grep -c $'[--]'` pe randurile adaugate. Intr-o locala
    non-UTF-8 `grep` nu vede clasa aia ca pe doua PUNCTE DE COD, ci ca pe multimea OCTETILOR
    care le compun. U+2014 si U+2013 incep amandoua cu `0xE2 0x80`, prefix comun unei familii
    intregi - inclusiv U+2500 (box-drawing), din care separatoarele noastre de sectiune au
    sute. Masurat pe felia #981: reteta a raportat 39 de liniute lungi pe un fisier cu ZERO,
    fiindca fisierul avea 322 de U+2500. Cifra iese UMFLATA, deci trimite oameni sa "repare"
    separatoare ASCII legitime.

CE FACE ALTFEL: decodeaza UTF-8 explicit si numara punctele de cod cerute, prin `ord`.
Nicio clasa de caractere, nicio locala, niciun `grep`.

CELE DOUA CONTROALE, si nu-s optionale - ruleaza la FIECARE invocare (`absenta-nu-e-valoare`):
    (1) MARTOR POZITIV: un rand fabricat LA RULARE care contine chiar U+2014. Daca detectorul
        nu-l gaseste, masuratoarea e invalida (exit 3), nu "zero".
    (2) FRATE DE ACELASI FEL - controlul care lipsea din reteta veche: un rand fabricat cu
        U+2500 si U+00D7, care IMPART octeti cu tinta. Daca detectorul il numara, e din nou
        pe octeti, si iese 3. Fara controlul asta, "unealta vede" iese nenul si cine il ruleaza
        crede ca masoara ce trebuie.

FIXTURILE SE ASAMBLEAZA LA RULARE, niciodata scrise pe litere in corpul fisierului: un fisier
care poarta chiar tiparul pe care il vaneaza devine o instanta a lui, si atunci detectorul se
gaseste pe sine. De aceea martorii se construiesc din `chr(0x2014)`, nu din caracterul insusi.

UTILIZARE
    python .claude/scripts/porti/tipografie-liniute.py --diff <baza>..<varf> [-- <cale>...]
    python .claude/scripts/porti/tipografie-liniute.py --fisiere <cale>...
    python .claude/scripts/porti/tipografie-liniute.py --text-stdin

CE NU VERIFICA (reziduuri)
Intrebarea pe care o pune de fapt: "apare vreunul dintre cele patru puncte de cod din TINTE?"
Nu "e tipografia corecta".
  - Alte liniute lungi din Unicode - forme late, variante de prezentare, alte semne de minus -
    nu sunt in TINTE si trec.
  - Ghilimelele tipografice, punctele de suspensie ca un singur caracter si spatiile
    neintrerupte nu se ating deloc.
  - In modul pe interval se citesc DOAR randurile adaugate. O liniuta lunga aflata deja pe baza
    de comparatie e invizibila; scanarea completa se face doar pe lista de fisiere.
  - Textul se decodeaza ca UTF-8. Un fisier in alta codificare se masoara pe ce a iesit din
    decodor, nu pe ce a scris autorul.
  - Raporteaza pozitia; nu repara nimic.
  - Multimea de fisiere nu se decide aici, ci de cine il apeleaza. Zeroul lui acopera exact
    lista primita, si atat.

LA ROSU: CE AI VOIE SA EDITEZI
  DA  fisierul raportat, in care liniuta lunga devine cratima.
  NU  TINTE, FRATI, controale(). Adaugarea unui punct de cod in TINTE e libera; scoaterea nu.

IESIRE
    0 = zero liniute lungi, si controalele au trecut (deci zeroul are acoperire)
    1 = gasite; fiecare are fisier:rand:coloana si numele caracterului
    2 = eroare de folosire / git a refuzat
    3 = CONTROL PICAT - detectorul nu masoara ce spune; verdictul e NEMASURAT, nu "curat"
"""

import subprocess
import sys

# Tintele, ca puncte de cod. Scrise ca numere tocmai ca fisierul asta sa nu le contina.
TINTE = {
    0x2014: "EM DASH (U+2014)",
    0x2013: "EN DASH (U+2013)",
    0x2212: "MINUS SIGN (U+2212)",
    0x2011: "NON-BREAKING HYPHEN (U+2011)",
}
# Fratii de acelasi fel: caractere multi-octet care IMPART octeti cu tintele si care NU trebuie
# numarate. U+2500 e cel care a produs cele 39 de false pozitive; U+00D7 a picat in aceeasi
# capcana la hook-ul global (memoria `hook-emdash-fals-pozitiv`).
FRATI = (0x2500, 0x2502, 0x00D7, 0x2192)


def gaseste(text, eticheta):
    """Randurile cu tinte, ca liste de (eticheta, nr_rand, coloana, nume). Pe puncte de cod."""
    gasite = []
    for nr, rand in enumerate(text.split("\n"), 1):
        for col, ch in enumerate(rand, 1):
            nume = TINTE.get(ord(ch))
            if nume:
                gasite.append((eticheta, nr, col, nume, rand.strip()[:120]))
    return gasite


def controale():
    """Cele doua controale. Intoarce lista de esecuri; goala = masuratoarea are acoperire."""
    esecuri = []
    # (1) martor pozitiv, asamblat la rulare
    martor = "control pozitiv: aici urmeaza un " + chr(0x2014) + " adevarat"
    if len(gaseste(martor, "<control+>")) != 1:
        esecuri.append(
            "MARTOR POZITIV: un rand care CONTINE U+2014 n-a fost gasit - detectorul e mut, "
            "deci un zero de la el nu inseamna nimic"
        )
    # (2) frate de acelasi fel, tot asamblat la rulare
    frate = "control negativ: " + "".join(chr(c) for c in FRATI) * 4
    fals = gaseste(frate, "<control->")
    if fals:
        esecuri.append(
            "FRATE DE ACELASI FEL: au fost numarate %d potriviri pe caractere care doar IMPART "
            "octeti cu tinta (U+2500 etc.) - detectorul numara OCTETI, nu puncte de cod. Asta e "
            "chiar defectul din #988." % len(fals)
        )
    return esecuri


def randuri_adaugate(interval, cai):
    """Randurile ADAUGATE de un diff, ca (fisier, nr_rand_in_varf, text)."""
    cmd = ["git", "diff", "--unified=0", "--no-color", interval]
    if cai:
        cmd += ["--"] + cai
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if p.returncode != 0:
        sys.stderr.write("git diff a refuzat (exit %d): %s\n"
                         % (p.returncode, p.stderr.decode("utf-8", "replace").strip()))
        sys.exit(2)
    # Decodarea e EXPLICITA aici. Cu `errors="replace"` un octet stricat devine U+FFFD, care nu
    # e in TINTE - deci nu poate produce un fals pozitiv, doar un fals negativ vizibil in text.
    brut = p.stdout.decode("utf-8", "replace")
    fisier, nr = None, 0
    for linie in brut.split("\n"):
        if linie.startswith("+++ b/"):
            fisier, nr = linie[6:], 0
        elif linie.startswith("@@"):
            # @@ -a,b +c,d @@ - se ia `c`
            try:
                nr = int(linie.split("+")[1].split(",")[0].split(" ")[0]) - 1
            except (IndexError, ValueError):
                nr = 0
        elif linie.startswith("+") and not linie.startswith("+++"):
            nr += 1
            yield (fisier or "<necunoscut>", nr, linie[1:])


def main(argv):
    esecuri = controale()
    if esecuri:
        for e in esecuri:
            sys.stderr.write("CONTROL PICAT: %s\n" % e)
        sys.stderr.write("VERDICT: NEMASURAT. Nu citi asta ca 'zero liniute lungi'.\n")
        return 3

    gasite = []
    sursa = ""
    if "--diff" in argv:
        i = argv.index("--diff")
        if i + 1 >= len(argv):
            sys.stderr.write("--diff cere un interval, ex. origin/develop..HEAD\n")
            return 2
        interval = argv[i + 1]
        cai = argv[argv.index("--") + 1:] if "--" in argv else []
        sursa = "randurile ADAUGATE de %s" % interval
        n = 0
        for fis, nr, text in randuri_adaugate(interval, cai):
            n += 1
            for _, _, col, nume, ctx in gaseste(text, fis):
                gasite.append((fis, nr, col, nume, ctx))
        sursa += " (%d randuri adaugate citite)" % n
        if n == 0:
            sys.stderr.write(
                "ATENTIE: diff-ul n-a produs NICIUN rand adaugat. Zeroul de mai jos e despre o "
                "multime GOALA, nu despre tipografie - verifica intervalul.\n")
    elif "--fisiere" in argv:
        cai = argv[argv.index("--fisiere") + 1:]
        if not cai:
            sys.stderr.write("--fisiere cere cel putin o cale\n")
            return 2
        sursa = "%d fisier(e)" % len(cai)
        for cale in cai:
            with open(cale, "rb") as f:
                gasite += gaseste(f.read().decode("utf-8", "replace"), cale)
    elif "--text-stdin" in argv:
        sursa = "textul de la stdin"
        gasite += gaseste(sys.stdin.buffer.read().decode("utf-8", "replace"), "<stdin>")
    else:
        sys.stderr.write(__doc__)
        return 2

    print("CONTROALE: martor pozitiv OK, frate de acelasi fel OK (pe puncte de cod, nu pe octeti)")
    print("SURSA: %s" % sursa)
    if not gasite:
        print("LINIUTE LUNGI: 0")
        return 0
    print("LINIUTE LUNGI: %d" % len(gasite))
    for fis, nr, col, nume, ctx in gasite:
        print("  %s:%s:%s  %s  | %s" % (fis, nr, col, nume, ctx))
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
