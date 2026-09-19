import type {KeyboardEvent} from "react";
/** Keep Tab inside the modal, including when the browser would focus its toolbar. */
export function keepDialogFocus(event:KeyboardEvent<HTMLDialogElement>){
 if(event.key!=="Tab")return;
 const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(el=>el.getClientRects().length>0);
 const first=items[0],last=items.at(-1);
 if(!first){event.preventDefault();return;}
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
}
