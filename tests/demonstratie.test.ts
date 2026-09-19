import {describe,it,expect} from 'vitest';
import {DOCUMENTS,findDocument} from '../src/content/demo';
describe('alegerea unui exemplu demonstrativ',()=>{
 it.each([['Care este termenul de plată?','contract'],['Cui este adresată factura?','factura'],['Ce document lipsește la recepție?','receptie']])('selecteaza sursa corecta pentru %s',(query,id)=>{expect(findDocument(query)?.id).toBe(id)});
 it('accepta diacritice, majuscule si spatii fara a schimba sensul',()=>{expect(findDocument('  CARE ESTE TERMENUL DE PLATA ? ')?.id).toBe('contract')});
 it.each(['','Unde este anexa de asigurare?','Când expiră contractul?','Care este valoarea facturii?','Documentul meu lipsește','<script>alert(1)</script>'])('nu inventeaza raspunsul la %s',query=>{expect(findDocument(query)).toBeUndefined()});
 it('raspunsul contractual apare integral pe pagina indicata',()=>{const d=DOCUMENTS[0];expect(d.page).toBe(2);expect(d.pages[1].paragraphs[2]).toContain(d.answer)});
 it('fiecare sursa indicata si fiecare pasaj evidentiat exista',()=>{for(const d of DOCUMENTS){expect(d.pages[d.page-1]).toBeDefined();const p=d.pages[d.page-1];expect(p.highlight).toBeTypeOf('number');expect(p.paragraphs[p.highlight!]).toBeTruthy();expect(d.source).toBeTruthy()}});
});
