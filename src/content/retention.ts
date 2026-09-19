import {SOURCE_ACCOUNTING,SOURCE_ARCHIVES} from "./catalog";
export const RETENTION=[
 {id:"contabile",category:"Financiar",title:"Documente justificative contabile",term:"5 ani",rule:"De la 1 iulie a anului următor încheierii exercițiului financiar în care au fost întocmite.",source:SOURCE_ACCOUNTING,article:"Legea 82/1991, art. 25, modificat prin Legea 36/2023",fixed:true},
 {id:"salarii",category:"Salarizare",title:"State de salarii",term:"5 ani",rule:"Incluse expres în regula contabilă de 5 ani. Nu confundați statele de salarii cu întregul dosar de personal.",source:SOURCE_ACCOUNTING,article:"Legea 82/1991, art. 25, modificat prin Legea 36/2023",fixed:true},
 {id:"registre",category:"Financiar",title:"Registre de contabilitate obligatorii",term:"5 ani",rule:"Calculul începe la 1 iulie din anul următor încheierii exercițiului financiar, conform regulii din art. 25.",source:SOURCE_ACCOUNTING,article:"Legea 82/1991, art. 25, modificat prin Legea 36/2023",fixed:true},
 {id:"alte",category:"Alte documente",title:"Dosare tehnice, profesionale și administrative",term:"Se verifică pe categorie",rule:"Termenul se stabilește din nomenclator și din reglementările speciale aplicabile. Nu există un termen unic pentru toate actele unei organizații.",source:SOURCE_ARCHIVES,article:"Legea Arhivelor Naționale 16/1996, art. 8 și 11",fixed:false}
];
export function accountingDates(year:number){if(!Number.isInteger(year)||year<1900||year>2100)return null;return {start:`1 iulie ${year+1}`,end:`1 iulie ${year+6}`};}
