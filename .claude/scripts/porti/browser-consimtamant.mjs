#!/usr/bin/env node
// Poarta de browser: C-01 zero terti
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
//
// CE NU VERIFICA: lansatorul nu masoara nimic el insusi. Acoperirea lui e EXACT
// tests/browser/consimtamant.spec.ts, deci ce cereri face pagina IN BROWSER pe drumurile
// pe care proba le parcurge. O cerere declansata pe un drum neparcurs, sau dupa o
// interactiune neprobata, nu se vede.
// Reziduurile comune tuturor lansatoarelor (build refolosit, martori, cod 3) sunt
// scrise in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba din tests/browser/ sau codul paginii pe care il acuza.
// Nu se sterge un caz din proba si nu se scoate acest lansator din lantul verifica.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('C-01 zero terti', ['tests/browser/consimtamant.spec.ts']))
