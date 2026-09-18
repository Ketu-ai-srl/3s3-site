#!/usr/bin/env node
// Toate portile de browser intr-o singura trecere: un build, un server, o rulare.
//
// De ce nu se cheama cele cinci lansatoare unul dupa altul: fiecare ar reface build-ul si
// ar porni alt server. Un pas ieftin pus dupa unul scump nu economiseste nimic, iar aici
// pasul scump s-ar plati de cinci ori.
//
// Lansatoarele individuale raman pentru rulari tintite, cand repari o singura poarta.
//
// Iesire: 0 trece | 1 pica | 3 NEMASURAT.
//
// CE NU VERIFICA: acoperirea lui e multimea de fisiere din tests/browser/ care exista pe disc
// ACUM. Nimic nu compara acea multime cu lista de lansatoare individuale, deci o proba fara
// lansator ruleaza doar de aici, iar un lansator fara proba nu se semnaleaza. Numarul de porti
// scris in proza din tests/browser/README.md nu e verificat de nimeni.
// Restul reziduurilor sunt in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba picata sau codul paginii. Nu se ingusteaza multimea de fisiere
// data rulatorului ca sa treaca lotul.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('porti de browser', ['tests/browser']))
