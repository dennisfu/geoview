/*! Package:geoview-details-panel: 0.1.0 - "12f08edc348e41a62a75830db1cc7c7862dfb81f" - 2023-01-31T22:25:16.238Z */
"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[138],{16933:(e,t,n)=>{var a=n(81744),i=n(56805),o=n(9750),r=n(9018),s=n(30693),l=n(56367),u=n(22471),c=n(33719),p=n(82482),f=n(45202),d=window;function h(e){var t=e.mapId,n=d.cgpv,a=n.api,i=n.react,o=i.useState,r=i.useEffect,s=o([]),l=(0,p.Z)(s,2),u=l[0],h=l[1],m=o([]),g=(0,p.Z)(m,2),v=g[0],E=g[1],y=o(),_=(0,p.Z)(y,2),P=_[0],Z=_[1];return r((function(){return a.event.on(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,(function(e){if((0,c.gNW)(e)){var n=e.resultSets,i=[];Object.keys(n).forEach((function(e){var o=(0,c.dIw)(a.map(t).layer.registeredLayers[e].layerName,t),r=n[e];r.length>0&&i.push({layerPath:e,layerName:o,features:r})})),i.length>0?h(i):h([])}else h([])}),t,"".concat(t,"-DetailsAPI")),a.event.on(a.eventNames.GET_FEATURE_INFO.QUERY_LAYER,(function(e){if((0,c.k3d)(e)){var t=e.location;E(t)}else E([])}),t),function(){a.event.off(a.eventNames.GET_FEATURE_INFO.ALL_QUERIES_DONE,t),a.event.off(a.eventNames.GET_FEATURE_INFO.QUERY_LAYER,t)}}),[]),r((function(){Z(a.map(t).details.createDetails(t,u,{mapId:t,location:v,backgroundStyle:"dark",singleColumn:!0}))}),[u,v]),(0,f.jsx)("div",{children:P})}const m=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Details Panel/Legend Config Schema","type":"object","version":1,"comments":"Configuration for GeoView layers package.","additionalProperties":false,"properties":{"suportedLanguages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en","fr"]},"default":["en","fr"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}},"required":["suportedLanguages"]}'),g=JSON.parse('{"suportedLanguages":["en","fr"]}');function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=(0,l.Z)(e);if(t){var i=(0,l.Z)(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return(0,s.Z)(this,n)}}var E=window,y=function(e){(0,r.Z)(n,e);var t=v(n);function n(e,i){var r;return(0,a.Z)(this,n),r=t.call(this,e,i),(0,u.Z)((0,o.Z)(r),"schema",(function(){return m})),(0,u.Z)((0,o.Z)(r),"defaultConfig",(function(){return(0,c.ZQJ)(g)})),(0,u.Z)((0,o.Z)(r),"translations",(0,c.ZQJ)({en:{detailsPanel:"Details",nothing_found:"Nothing found",click_map:"Choose a point on the map to start",action_back:"Back"},fr:{detailsPanel:"Détails",nothing_found:"Aucun résultat",click_map:"Choisissez un point sur la carte pour commencer",action_back:"Retour"}})),(0,u.Z)((0,o.Z)(r),"added",(function(){var e,t,n=r.pluginProps.mapId,a=E.cgpv,i=a.api,o=a.ui.elements.DetailsIcon,s=i.map(n).displayLanguage,l={id:"detailsPanelButton",tooltip:r.translations[s].detailsPanel,tooltipPlacement:"right",children:(0,f.jsx)(o,{}),visible:!0},u={title:r.translations[s].detailsPanel,icon:'<i class="material-icons">details</i>',width:300};r.buttonPanel=i.map(n).appBarButtons.createAppbarPanel(l,u,null),null===(e=r.buttonPanel)||void 0===e||null===(t=e.panel)||void 0===t||t.changeContent((0,f.jsx)(h,{mapId:n}))})),r.buttonPanel=null,r}return(0,i.Z)(n,[{key:"removed",value:function(){var e=this.pluginProps.mapId,t=E.cgpv.api;this.buttonPanel&&t.map(e).appBarButtons.removeAppbarPanel(this.buttonPanel.buttonPanelId)}}]),n}(c.Vw$);E.plugins=E.plugins||{},E.plugins["details-panel"]=(0,c.RFZ)(y)}},e=>{var t;t=16933,e(e.s=t)}]);
//# sourceMappingURL=geoview-details-panel.js.map