import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import provenance from '../src/content/assets.json';
describe('activele reale ale alternativei',()=>{
 it('foloseste doua fotografii distincte, cu provenienta si dimensiuni',()=>{expect(provenance.images.length).toBe(2);const hashes=provenance.images.map(i=>{const bytes=readFileSync('public'+i.path);expect(bytes.subarray(0,4).toString()).toBe('RIFF');expect(bytes.subarray(8,12).toString()).toBe('WEBP');expect(i.width).toBe(1536);expect(i.height).toBe(1024);expect(i.kind).toBe('AI-generated illustration');expect(i.prompt).toBeTruthy();return createHash('sha256').update(bytes).digest('hex')});expect(new Set(hashes).size).toBe(2)});
 it.each(['contract','factura','receptie'])('documentul %s este un PDF descarcabil real',id=>{const p='public/exemple/'+id+'.pdf';expect(existsSync(p)).toBe(true);expect(readFileSync(p).subarray(0,5).toString()).toBe('%PDF-');expect(readFileSync(p).length).toBeGreaterThan(10000)});
 it('legenda nu atribuie fotografiile sediului sau oamenilor reali',()=>{const text=readFileSync('src/components/Elements.tsx','utf8');expect(text).toContain('Imagine ilustrativă generată cu AI.');expect(text).toContain('Nu prezintă sediul sau personalul ADRIA.')});
});
