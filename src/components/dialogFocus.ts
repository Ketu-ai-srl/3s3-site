import type {KeyboardEvent} from "react";
/** Use the same Tab order when a browser's native order skips links or buttons. */
export function keepDialogFocus(event:KeyboardEvent<HTMLDialogElement>){
 if(event.key!=="Tab")return;
 const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(el=>el.tabIndex>=0&&el.getClientRects().length>0);
 event.preventDefault();
 if(!items.length){event.currentTarget.focus();return;}
 const current=items.indexOf(document.activeElement as HTMLElement);
 const next=event.shiftKey?(current<=0?items.length-1:current-1):(current+1)%items.length;
 items[next].focus();
}
