#!/usr/bin/env bash
# Verifica pe VIU mediul de proba, dupa un deploy.
#
# Regula care sta la baza: un serviciu care raspunde 200 nu dovedeste ca a livrat
# commit-ul nostru. Dovada e marcajul din repo regasit in raspuns. De aceea pasul 3
# compara ce spune serverul cu ce scrie in fisierul din arborele local.
#
# Folosire:  BASIC_AUTH_USER=... BASIC_AUTH_PASS=... .claude/scripts/porti/verifica-staging.sh
# Iesire:    0 = tot in regula · 1 = o verificare a picat · 2 = folosire gresita

set -u

ADRESA="${ADRESA_STAGING:-https://3s2.ke2.in}"
UTILIZATOR="${BASIC_AUTH_USER:-}"
PAROLA="${BASIC_AUTH_PASS:-}"
RADACINA="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

# Autentificarea de baza a fost SCOASA la cererea owner-ului (5 sep 2026): site-ul e
# de prezentare, deci se arata partenerilor fara frecare. Ce ramane pana la lansare e
# antetul de neindexare, verificat mai jos. Daca variabilele exista totusi, se folosesc.
ACRED=""
if [ -n "$UTILIZATOR" ] && [ -n "$PAROLA" ]; then
  ACRED="-u $UTILIZATOR:$PAROLA"
fi

esec=0
verdict() {
  if [ "$1" = "0" ]; then printf 'OK    %s\n' "$2"; else printf 'PICAT %s\n' "$2"; esec=1; fi
}

# 1. Site-ul trebuie sa raspunda public.
cod=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$ADRESA/")
[ "$cod" = "200" ]
verdict $? "site-ul raspunde public (asteptat 200, primit $cod)"

# 2. Antetul de neindexare trebuie sa fie prezent.
antet=$(curl -sI --max-time 20 "$ADRESA/" | tr -d '\r' | grep -i '^x-robots-tag:' || true)
case "$antet" in
  *noindex*) verdict 0 "antet de neindexare prezent" ;;
  *) verdict 1 "antet de neindexare LIPSA (primit: '${antet:-nimic}')" ;;
esac

# 3. Marcajul livrat trebuie sa fie identic cu cel din arborele local.
livrat=$(curl -s --max-time 20 $ACRED "$ADRESA/stamp")
# Calea se da RELATIV, cu cwd mutat in radacina: python-ul de Windows nu poate deschide
# forma /c/Users/... pe care o produce bash-ul din MSYS. Capcana e documentata si costa
# o verificare care pare picata cand de fapt nu s-a masurat nimic.
local_marcaj=$(cd "$RADACINA" && python -c "import json,io; print(json.load(io.open('src/content/_stamp.json', encoding='utf-8'))['marcaj'])" 2>/dev/null)
if [ -z "$local_marcaj" ]; then
  verdict 1 "nu am putut citi marcajul local - verificarea e NEMASURATA, nu trecuta"
else
  [ "$livrat" = "$local_marcaj" ]
  verdict $? "continutul livrat corespunde commit-ului (server: '$livrat', local: '$local_marcaj')"
fi

# 4. Pagina de start trebuie sa fie randata pe server, nu construita din JavaScript:
#    un agent AI care nu executa JS trebuie sa poata citi raspunsul.
pagina=$(curl -s --max-time 25 $ACRED "$ADRESA/")
octeti=${#pagina}
[ "$octeti" -gt 2000 ]
verdict $? "pagina de start vine randata din server ($octeti octeti in HTML brut)"

# 5. Titlul trebuie sa fie al nostru, nu al scheletului.
case "$pagina" in
  *"Create Next App"*) verdict 1 "pagina inca poarta titlul implicit al scheletului" ;;
  *) verdict 0 "titlul paginii nu mai e cel implicit" ;;
esac

exit $esec
