import {describe,it,expect} from 'vitest';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync} from 'node:fs';
import {RUTE,ADRESA_BAZA,indexareaEstePermisa} from '../src/content/rute';
import {SECTORS} from '../src/content/catalog';
import SectorPage from '../src/components/SectorPage';
import {Questions,Action} from '../src/components/Elements';
import NotFound from '../src/app/not-found';
describe('structura si rute',()=>{
 it('foloseste domeniul alternativei pentru canonical',()=>{expect(ADRESA_BAZA).toBe('https://3s3.ke2.in');expect(RUTE.length).toBe(22);expect(new Set(RUTE.map(r=>r.cale)).size).toBe(22)});
 it('dezactiveaza indexarea implicit si in staging',()=>{const original=process.env.SITE_ENV;try{delete process.env.SITE_ENV;expect(indexareaEstePermisa()).toBe(false);process.env.SITE_ENV='staging';expect(indexareaEstePermisa()).toBe(false);process.env.SITE_ENV='productie';expect(indexareaEstePermisa()).toBe(true)}finally{process.env.SITE_ENV=original}});
 it.each(SECTORS.map(s=>[s.slug,s]))('pagina %s are continut specific si contact contextual',(_,s)=>{const html=renderToStaticMarkup(createElement(SectorPage,{slug:s.slug}));expect((html.match(/<h1\b/g)||[]).length).toBe(1);expect(html).toContain(s.title);expect(html).toContain(s.problem);expect(html).toContain('subiect='+encodeURIComponent(s.request));expect(html).toContain('Date fictive.');expect(html).not.toContain('<img')});
 it('nu repeta titlurile si problemele intre cele sapte domenii',()=>{expect(new Set(SECTORS.map(s=>s.title)).size).toBe(7);expect(new Set(SECTORS.map(s=>s.problem)).size).toBe(7);expect(new Set(SECTORS.map(s=>s.steps[0][1])).size).toBe(7)});
 it('acordeonul contine raspunsul in HTML inainte de JavaScript',()=>{const html=renderToStaticMarkup(createElement(Questions,{items:[['Întrebare','Răspuns util']]}));expect(html).toContain('<details>');expect(html).toContain('<summary>');expect(html).toContain('Răspuns util')});
 it('actiunea contextuala duce direct la contact',()=>{const html=renderToStaticMarkup(createElement(Action,{context:'Dosar notarial'}));expect(html).toContain('/contact?subiect=Dosar%20notarial');expect(html).not.toContain('/#discutie')});
 it('pagina negasita ofera recuperare prin rute reale',()=>{const html=renderToStaticMarkup(createElement(NotFound));expect(html).toContain('Pagina nu a fost găsită');expect(html).toContain('href="/"');expect(html).toContain('href="/harta-site"')});
 it('opreste miscarea decorativa la preferinta utilizatorului',()=>{const css=readFileSync('src/app/site.css','utf8');expect(css).toContain('@media(prefers-reduced-motion:reduce)');expect(css).toContain('animation:none!important');expect(css).toContain(':focus-visible')});
});
