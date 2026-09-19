import {describe,it,expect} from 'vitest';
import {accountingDates,RETENTION} from '../src/content/retention';
describe('calcul contabil conform art. 25',()=>{
 it('nu incepe la sfarsitul anului si nu numara de la emiterea actului',()=>{expect(accountingDates(2025)).toEqual({start:'1 iulie 2026',end:'1 iulie 2031'})});
 it('accepta un exercitiu mai vechi fara a autoriza stergerea',()=>{expect(accountingDates(2018)).toEqual({start:'1 iulie 2019',end:'1 iulie 2024'})});
 it.each([0,-1,2025.5,NaN,Infinity,1899,2101])('respinge anul invalid %s',year=>{expect(accountingDates(year)).toBeNull()});
 it('include explicit statele de salarii in regula de 5 ani',()=>{const r=RETENTION.find(r=>r.id==='salarii')!;expect(r.term).toBe('5 ani');expect(r.article).toContain('art. 25');expect(r.rule).toContain('dosar de personal')});
 it('nu atribuie automat 5 ani documentelor profesionale',()=>{const r=RETENTION.find(r=>r.id==='alte')!;expect(r.fixed).toBe(false);expect(r.term).toBe('Se verifică pe categorie');expect(r.rule).toContain('reglementările speciale')});
 it('fiecare categorie are o sursa legislativa si un articol',()=>{for(const r of RETENTION){expect(new URL(r.source).hostname).toBe('legislatie.just.ro');expect(r.article).toMatch(/art\./)}});
});
