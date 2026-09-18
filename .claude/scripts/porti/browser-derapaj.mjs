#!/usr/bin/env node
// Poarta de browser: derapaj orizontal 390px
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
//
// CE NU VERIFICA: lansatorul nu masoara nimic el insusi. Acoperirea lui e EXACT
// tests/browser/derapaj.spec.ts, deci derapajul la latimile pe care proba le deschide.
// Alte latimi, alte orientari, si derapajul din interiorul unui element cu defilare
// proprie raman nemasurate.
// Reziduurile comune tuturor lansatoarelor (build refolosit, martori, cod 3) sunt
// scrise in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba din tests/browser/ sau codul paginii pe care il acuza.
// Nu se sterge un caz din proba si nu se scoate acest lansator din lantul verifica.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('derapaj orizontal 390px', ['tests/browser/derapaj.spec.ts']))
