function createCodeSnippet(){const e=Array.prototype.filter.call(document.getElementsByTagName("script"),(e=>null===e.getAttribute("id"))),t=e[e.length-1],l=document.getElementById("codeSnippet");null!==l&&(l.innerHTML=`<pre>${t.textContent.replace("//create snippets\n","").replace("createConfigSnippet();\n","").replace("createCodeSnippet();\n","")}</pre>`)}function createConfigSnippet(){let e=0;for(e=0;e<document.getElementsByClassName("llwp-map").length;e++){let t="";const l=document.getElementsByClassName("llwp-map")[e].id;t=document.getElementById(l).attributes["data-config"];const n=document.getElementById(`${l}CS`);try{if(void 0!==t&&null!==n){const e=t.value.split(/(?<!\\)'/gm).map(((e,t)=>t%2?e.replaceAll(/\/\*/gm,String.fromCharCode(1)).replaceAll(/\*\//gm,String.fromCharCode(2)):e)).join("'").replaceAll(/\/\*(?<=\/\*)((?:.|\n|\r)*?)(?=\*\/)\*\//gm,"").replaceAll(String.fromCharCode(1),"/*").replaceAll(String.fromCharCode(2),"*/");n.textContent=JSON.stringify(JSON.parse(e.replace(/(\r\n|\n|\r)/gm,"").replace(/(?<!\\)'/gm,'"').replace(/\\'/gm,"'")),void 0,2)}}catch(e){console.log("Error trapped in createConfigSnippet")}}createCollapsible()}function createCollapsible(){const e=document.getElementsByClassName("collapsible");let t;for(t=0;t<e.length;t++)e[t].addEventListener("click",(function(){this.classList.toggle("active");const e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"}))}