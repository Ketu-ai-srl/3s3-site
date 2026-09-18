#!/usr/bin/env node
// Poarta de browser: legaturi si imagini
// Iesire: 0 trece | 1 pica | 3 NEMASURAT. Detaliu in browser-rulator.mjs.
//
// CE NU VERIFICA: lansatorul nu masoara nimic el insusi. Acoperirea lui e EXACT
// tests/browser/legaturi-imagini.spec.ts, deci legaturile si imaginile atinse de proba.
// O legatura aparuta doar dupa o interactiune, si una catre exterior care raspunde azi
// si moare maine, nu sunt acoperite.
// Reziduurile comune tuturor lansatoarelor (build refolosit, martori, cod 3) sunt
// scrise in browser-rulator.mjs, modulul importat mai jos.
//
// LA ROSU: se editeaza proba din tests/browser/ sau codul paginii pe care il acuza.
// Nu se sterge un caz din proba si nu se scoate acest lansator din lantul verifica.
import { ruleazaPoarta } from './browser-rulator.mjs'

process.exit(await ruleazaPoarta('legaturi si imagini', ['tests/browser/legaturi-imagini.spec.ts']))
