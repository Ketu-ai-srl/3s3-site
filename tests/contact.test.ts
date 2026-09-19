import {describe,it,expect} from 'vitest';
import {emailLink,EMAIL,SECTORS} from '../src/content/catalog';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ContactComposer from '../src/components/ContactComposer';
describe('contact real prin aplicatia de e-mail',()=>{
 it('destinatarul este adresa publica ADRIA',()=>{expect(EMAIL).toBe('office@adriaarhivare.ro');expect(emailLink()).toMatch(/^mailto:office@adriaarhivare\.ro\?/)});
 it('pastreaza diacriticele, separatorii si liniile fara injectarea altui destinatar',()=>{const subject='Notariat & acte? #3';const body='Bună ziua,\n\nTest & bcc=alt@example.org';const url=new URL(emailLink(subject,body));expect(url.searchParams.get('subject')).toBe(subject);expect(url.searchParams.get('body')).toBe(body);expect(url.searchParams.has('bcc')).toBe(false);expect(url.pathname).toBe(EMAIL)});
 it('fiecare domeniu pregateste o cerere distincta',()=>{expect(new Set(SECTORS.map(s=>s.request)).size).toBe(7);for(const s of SECTORS)expect(new URL(emailLink(s.request)).searchParams.get('subject')).toBe(s.request)});
 it('eticheteaza actiunea ca deschidere de e-mail, fara confirmare falsa',()=>{const html=renderToStaticMarkup(createElement(ContactComposer,{initialSubject:'Evaluare notariat'}));expect(html).toContain('Deschideți e-mailul');expect(html).toContain('Dumneavoastră trimiteți mesajul');expect(html).toContain('Evaluare notariat');expect(html).not.toContain('Mesaj trimis');expect(html).not.toContain('<form')});
});
