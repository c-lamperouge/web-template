import{o as e,c as t,a as u,_ as m,d as p,h as f,b as n,i as r,n as v,e as k,j as g,z as d,T as i,k as b,F as h}from"./index.f79a6eca.js";const _={preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},y=u("path",{fill:"currentColor",d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"},null,-1),B=[y];function C(a,o){return e(),t("svg",_,B)}var N={name:"ic-baseline-person",render:C};const x=p({__name:"DialogBackdrop",props:{modelValue:{type:Boolean},enableClose:{type:Boolean,default:!0},backdropTheme:{default:"dark"},backdropTransitionName:{default:"fade"},slotTransitionName:{default:()=>{}},transitionDuration:{default:"250ms"}},emits:["update:modelValue"],setup(a,{emit:o}){const l=f(()=>`bg-${a.backdropTheme}`),c=()=>{a.enableClose&&o("update:modelValue",!1)};return(s,T)=>(e(),t(h,null,[n(i,{name:a.backdropTransitionName},{default:r(()=>[a.modelValue?(e(),t("div",{key:0,class:v(["dialog-backdrop",k(l)]),style:g({"--transition-duration":a.transitionDuration}),onClick:c},null,6)):d("",!0)]),_:1},8,["name"]),n(i,{name:a.slotTransitionName},{default:r(()=>[a.modelValue?b(s.$slots,"default",{key:0},void 0,!0):d("",!0)]),_:3},8,["name"])],64))}});var D=m(x,[["__scopeId","data-v-2c764e12"]]);export{D,N as I};
