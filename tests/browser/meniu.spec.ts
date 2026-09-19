import {expect,test} from '@playwright/test';
test.use({viewport:{width:390,height:844}});
test('meniul modal retine focalizarea, se inchide cu Escape si restabileste declansatorul',async({page})=>{
 await page.goto('/');const open=page.getByRole('button',{name:'Deschideți meniul'});await open.click();const dialog=page.getByRole('dialog',{name:'Meniu principal'});await expect(dialog).toBeVisible();
 for(let i=0;i<18;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true)}
 await page.keyboard.press('Shift+Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true);
 await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(open).toBeFocused();
});
test('fiecare legatura din meniul mobil navigheaza si inchide dialogul',async({page})=>{
 for(const [name,url] of [['Servicii','/cum-functioneaza'],['Domenii','/solutii'],['Ghid de păstrare','/instrumente/termene-de-pastrare'],['Costuri','/investitia'],['Despre 3S','/despre'],['Contact','/contact']]){await page.goto('/');await page.getByRole('button',{name:'Deschideți meniul'}).click();const dialog=page.getByRole('dialog',{name:'Meniu principal'});await dialog.getByRole('link',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp(url+'$'));await expect(dialog).toBeHidden();await expect(page.locator('h1')).toBeVisible()}
});
test('navigatia este prezenta in HTML inainte de hidratare',async({request})=>{const response=await request.get('/');const html=await response.text();expect(html).toContain('aria-label="Meniu principal"');expect(html).toContain('href="/solutii"');expect(html).toContain('href="/contact"')});
test('martor POZITIV: focalizarea din afara unui dialog deschis este detectata',async({page})=>{await page.setContent('<button id="outside">Exterior</button><dialog open><button>Interior</button></dialog>');await page.locator('#outside').focus();expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(false)});
test('martor NEGATIV: un dialog modal retine focalizarea',async({page})=>{await page.setContent('<button>Exterior</button><dialog><button>Interior</button><button>Al doilea</button></dialog>');await page.locator('dialog').evaluate((d:HTMLDialogElement)=>d.showModal());await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog'))).toBe(true)});
