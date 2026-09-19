import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {FAQ,SECTORS} from '../src/content/catalog';
const source=(route:string)=>readFileSync('src/app/'+route+'/page.tsx','utf8');
describe('corectii editoriale',()=>{
 it('separa inferenta AI de antrenare in raspunsul direct',()=>{const answer=FAQ.find(([q])=>q.includes('model AI'))![1];expect(answer).toContain('fragmente din documente');expect(answer).toContain('compune răspunsul');expect(answer).toContain('antrenare');expect(answer).toContain('fictive')});
 it('raspunde direct cand poate fi emis pretul',()=>{const answer=FAQ.find(([q])=>q.includes('preț'))![1];expect(answer).toContain('După evaluarea');expect(answer).toContain('Nu există un tarif unic public')});
 it('politica descrie transferul catre e-mail si clipboard',()=>{const text=source('confidentialitate');expect(text).toContain('clipboard');expect(text).toContain('aplicația dumneavoastră de e-mail');expect(text).toContain('ADRIA SERVICII ARHIVARE SRL');expect(text).toContain('jurnale');expect(text).not.toContain('nu colectăm niciun fel de date')});
 it('securitatea nu garanteaza generic gazduire UE sau jurnal de acces',()=>{const text=source('securitate');expect(text).toContain('trebuie confirmate');expect(text).toContain('Funcțiile de jurnalizare și export se verifică');expect(text).toContain('Inferența, păstrarea datelor și antrenarea')});
 it('nu confunda datele ADRIA cu o noua societate 3S',()=>{expect(source('termeni')).toContain('nu denumirea unei noi societăți');expect(source('despre')).toContain('nu o societate nouă cu numele 3S')});
 it('pagina contabila nu repeta vechiul termen pentru salarii',()=>{const text=JSON.stringify(SECTORS.find(s=>s.slug==='contabilitate'));expect(text).toContain('5 ani');expect(text).toContain('1 iulie');expect(text).not.toMatch(/50 de ani|50 ani/)});
});
