"use strict";(self.webpackChunkfaceit=self.webpackChunkfaceit||[]).push([[176],{3068:(f,a,e)=>{e.d(a,{s:()=>d});var t=e(7983),l=e(1465);const o=["vega-flex-grow","vega-flex-shrink","vega-flex-grow-0","vega-flex-shrink-0","vega-flex-basis-0","v-flex-1","v-min-w-min","disabled","v-text-black","v-text-white","v-hidden","vega-loader-container-relative","vega-page-notification-fade-out"];function d(s,i){return t.F.isEnabled("VEGA_COMPONENT.SANITIZE_VEGA_COMPONENT")&&(function n(s,i){var r,u,h;const c=["hydrated"].concat((null===(u=null===(r=s.$attrs$)||void 0===r?void 0:r.class)||void 0===u?void 0:u.split(/\s+/).filter(Boolean))||[]),_=(null===(h=i.dataset.verifiedClasses)||void 0===h?void 0:h.split(" "))||[],S=new Set([...c,..._,...o]),v=Array.from(i.classList).filter(Boolean).filter(T=>{const b=T.replace(/(S|M|L|XL):/,"");return!S.has(b)}).filter(T=>!T.startsWith("ng-"));v.length&&l.L.error(`Found class(es) ${v} added to component:`,i," which is anti vega design pattern and we will forbid this behavior in the future release."," for more details, please refer to: https://heartland1.gitlab.io/vega/tiger/?path=/docs/other-best-practice--page"),"hydrated"!==c.join()&&(i.dataset.verifiedClasses=c.join(" "))}(s,i),function g(s){s.children&&Array.from(s.children).forEach(r=>{r.hasAttribute("data-shrink")&&l.L.error("Found attribute [data-shrink='0'] inside component:",s," which will be deprecated, please use classes of vega-flex-shrink, vega-flex-grow, vega-flex-shrink-0, vega-flex-grow-0, vega-flex-basis-0 instead.")})}(i)),s}},7607:(f,a,e)=>{e.d(a,{B:()=>t,D:()=>l,F:()=>n,I:()=>d,P:()=>o});const t=["default","S","M","L","XL"],l={default:200,S:246,M:616,L:820,XL:1134},o=["top","left","bottom","right"],d=1500,n=["row","col"]},2176:(f,a,e)=>{e.r(a),e.d(a,{vega_item_toggle:()=>n});var t=e(5934),l=e(3068),o=e(7607);e(7983);const n=class{constructor(g){(0,t.r)(this,g),this.vegaToggleStatus=(0,t.c)(this,"vegaToggleStatus",7),this.toggleStatus="unToggled",this.itemToggleStatusMap={unToggledIcon:"plus-sign",toggledIcon:"delete-bin",unToggledLabel:"Add",togglingLabel:"Added",toggledLabel:"Remove",unTogglingLabel:"Removed"},this.isToggled=!1,this.isError=!1,this.handleToggle=s=>{this.updateToggleStatus(),s.preventDefault()}}onToggledPropsChange(){this.initTransitionStatus()}componentWillLoad(){this.initTransitionStatus()}render(){return(0,l.s)((0,t.h)(t.H,{class:{"vega-toggled-status":this.isTogglingOrUnToggling(),"vega-error-status":this.isError}},this.renderLabelDom(),(0,t.h)("vega-button-circle",{size:"small",variant:"secondary",icon:"unToggled"===this.toggleStatus?this.itemToggleStatusMap.unToggledIcon||"plus-sign":"toggled"===this.toggleStatus?this.itemToggleStatusMap.toggledIcon||"delete-bin":"checkmark",onClick:this.isTogglingOrUnToggling()?null:this.handleToggle})),this.el)}renderLabelDom(){let g;switch(this.toggleStatus){case"unToggled":g=this.itemToggleStatusMap.unToggledLabel;break;case"toggling":g=this.itemToggleStatusMap.togglingLabel;break;case"toggled":g=this.itemToggleStatusMap.toggledLabel;break;case"unToggling":g=this.itemToggleStatusMap.unTogglingLabel}return(0,t.h)("div",null,g||"No label defined")}isTogglingOrUnToggling(){return"toggling"===this.toggleStatus||"unToggling"===this.toggleStatus}updateToggleStatus(){switch(this.toggleStatus){case"unToggled":this.toggleStatus="toggling",setTimeout(()=>{this.toggleStatus="toggled",this.isToggled=!0,this.vegaToggleStatus.emit(this.isToggled)},o.I);break;case"toggled":this.toggleStatus="unToggling",setTimeout(()=>{this.toggleStatus="unToggled",this.isToggled=!1,this.vegaToggleStatus.emit(this.isToggled)},o.I)}}initTransitionStatus(){this.toggleStatus=this.isToggled?"toggled":"unToggled",this.vegaToggleStatus.emit(this.isToggled)}get el(){return(0,t.g)(this)}static get watchers(){return{isToggled:["onToggledPropsChange"]}}}}}]);