#!/usr/bin/env node
// Poarta de browser: PA-03 accesibilitate
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
//
// CE NU VERIFICA: lansatorul nu masoara nimic el insusi. Acoperirea lui e EXACT
// tests/browser/accesibilitate.spec.ts, deci ce afirma acea proba, si atat: regulile
// automate nu acopera contrastul perceput, ordinea logica de citire, sau daca un text
// alternativ chiar descrie imaginea.
// Reziduurile comune tuturor lansatoarelor (build refolosit, martori, cod 3) sunt
// scrise in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba din tests/browser/ sau codul paginii pe care il acuza.
// Nu se sterge un caz din proba si nu se scoate acest lansator din lantul verifica.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('PA-03 accesibilitate', ['tests/browser/accesibilitate.spec.ts']))
