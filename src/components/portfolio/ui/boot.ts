import { THEME_COLORS, THEME_STORAGE_KEY } from "./theme";

/**
 * Two inline scripts, so nothing waits for hydration.
 *
 * HEAD runs before first paint: marks `<html class="js">` (reveals may hide
 * content from here on) and applies a stored explicit theme. No stored theme
 * means follow the system, which CSS handles alone. One frame after the first
 * paint it adds `hand`, which lets the handwriting font load (brand-fonts.tsx).
 *
 * BODY runs after the HTML is parsed: points `theme-color` at an explicit
 * theme, then observes every `[data-reveal]` and `[data-draw]` once and marks
 * it `data-in` the first time it is 12% into view. A MutationObserver picks up
 * elements added by client navigation. At the very bottom of the page every
 * leftover is shown, since a short last block may never cross the line.
 */

export const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add("hand")})})})();`;

export const BODY_SCRIPT = `(function(){var d=document.documentElement,c=${JSON.stringify(THEME_COLORS)},t=d.dataset.theme;if(t)document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.content=c[t]});var s="[data-reveal],[data-draw]";function show(e){e.setAttribute("data-in","")}if(!("IntersectionObserver" in window)){document.querySelectorAll(s).forEach(show);return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:"0px 0px -12% 0px"});function scan(r){if(r.matches&&r.matches(s))io.observe(r);r.querySelectorAll(s).forEach(function(e){if(!e.hasAttribute("data-in"))io.observe(e)})}scan(document);new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n)})})}).observe(document.body,{childList:true,subtree:true});addEventListener("scroll",function(){if(innerHeight+scrollY>=d.scrollHeight-4)document.querySelectorAll(s).forEach(show)},{passive:true})})();`;
