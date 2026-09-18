#!/usr/bin/env node
// Poarta de browser: S-17 raspuns in HTML brut
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
//
// CE NU VERIFICA: lansatorul nu masoara nimic el insusi. Acoperirea lui e EXACT
// tests/browser/html-brut.spec.ts, deci ca raspunsul cerut se afla in HTML-ul servit
// pentru rutele probei. Nu spune nimic despre calitatea raspunsului, si nimic despre
// rutele care nu apar in proba.
// Reziduurile comune tuturor lansatoarelor (build refolosit, martori, cod 3) sunt
// scrise in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba din tests/browser/ sau codul paginii pe care il acuza.
// Nu se sterge un caz din proba si nu se scoate acest lansator din lantul verifica.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('S-17 raspuns in HTML brut', ['tests/browser/html-brut.spec.ts']))
