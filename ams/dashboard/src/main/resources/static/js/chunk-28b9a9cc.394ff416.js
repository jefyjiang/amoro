(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28b9a9cc"],{"11e6":function(e,t,a){},4139:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),n=a("6c02"),o=a("2b46"),l=a("47e2");const r={class:"field-wrap"};var s=Object(c["defineComponent"])({__name:"Field",props:{fields:null,loading:{type:Boolean}},setup(e,{expose:t}){const a=e,{t:n}=Object(l["b"])(),o=Object(c["shallowReactive"])([{dataIndex:"field",title:n("field"),ellipsis:!0},{dataIndex:"type",title:n("type"),ellipsis:!0},{dataIndex:"comment",title:n("description"),ellipsis:!0},{dataIndex:"primaryKey",title:n("primaryKey"),scopedSlots:{customRender:"primaryKey"}}]);return t({getPkname(){return a.fields.filter(e=>e.checked).map(e=>({fieldName:e.field||""}))}}),(t,n)=>{const l=Object(c["resolveComponent"])("a-checkbox"),s=Object(c["resolveComponent"])("a-table");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",r,[Object(c["createVNode"])(s,{loading:e.loading,class:"ant-table-common",columns:Object(c["unref"])(o),"data-source":a.fields,pagination:!1},{bodyCell:Object(c["withCtx"])(({column:e,record:t})=>["primaryKey"===e.dataIndex?(Object(c["openBlock"])(),Object(c["createBlock"])(l,{key:0,checked:t.checked,"onUpdate:checked":e=>t.checked=e},null,8,["checked","onUpdate:checked"])):Object(c["createCommentVNode"])("",!0)]),_:1},8,["loading","columns","data-source"])])}}}),i=(a("9ca6"),a("6b0d")),u=a.n(i);const d=u()(s,[["__scopeId","data-v-5b1564d8"]]);var b=d;const p={class:"partition-field-wrap"};var m=Object(c["defineComponent"])({__name:"Partition",props:{partitionFields:null,loading:{type:Boolean}},setup(e){const t=e,{t:a}=Object(l["b"])(),n=Object(c["shallowReactive"])([{dataIndex:"field",title:a("field"),ellipsis:!0},{dataIndex:"type",title:a("type"),ellipsis:!0},{dataIndex:"comment",title:a("description"),ellipsis:!0}]);return(a,o)=>{const l=Object(c["resolveComponent"])("a-table");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",p,[Object(c["createVNode"])(l,{loading:e.loading,class:"ant-table-common",columns:Object(c["unref"])(n),"data-source":t.partitionFields,pagination:!1},null,8,["loading","columns","data-source"])])}}});const f=m;var O=f,j=a("a878"),g=a("5738"),v=a("d257"),h=a("8552");const k={class:"config-properties"},y={class:"config-header g-flex"},P={class:"td g-flex-ac"},$={class:"td g-flex-ac bd-left"},C=Object(c["createTextVNode"])("+");var N=Object(c["defineComponent"])({__name:"Properties",props:{propertiesObj:null},setup(e,{expose:t}){const a=e,n=Object(c["reactive"])([]),o=Object(c["ref"])(),l=Object(c["reactive"])([]),r=Object(c["ref"])(),s=Object(c["reactive"])({data:[]}),i=Object(c["reactive"])(Object(h["a"])());function u(){n.length=0,s.data.length=0,Object.keys(a.propertiesObj).forEach(e=>{s.data.push({key:e,value:a.propertiesObj[e],uuid:Object(v["g"])()})})}async function d(){l.length=0,o.value=[];const e=await Object(g["l"])();Object.keys(e).forEach(t=>{const a={key:t,label:t,value:t,text:e[t]||""};l.push(a),o.value.push(a)})}function b(e,t){return t.key.toUpperCase().indexOf(e.toUpperCase())>=0}function p(e,t,a){const c=t.key,n=l.find(e=>e.key===c),o=s.data.find(e=>e.uuid===a.uuid);o&&(o.value=n.text||"",o.key=n.key||"")}function m(e){const t=s.data.indexOf(e);-1!==t&&s.data.splice(t,1)}function f(){s.data.push({key:"",value:"",uuid:Object(v["g"])()})}return Object(c["watch"])(()=>a.propertiesObj,()=>{u()},{immediate:!0,deep:!0}),t({getProperties(){return r.value.validateFields().then(()=>{const e={};return s.data.forEach(t=>{e[t.key]=t.value}),Promise.resolve(e)}).catch(()=>!1)}}),Object(c["onMounted"])(()=>{d()}),(e,t)=>{const a=Object(c["resolveComponent"])("a-auto-complete"),n=Object(c["resolveComponent"])("a-form-item"),l=Object(c["resolveComponent"])("a-input"),u=Object(c["resolveComponent"])("a-form"),d=Object(c["resolveComponent"])("a-button");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",k,[Object(c["createElementVNode"])("div",y,[Object(c["createElementVNode"])("div",P,Object(c["toDisplayString"])(e.$t("key")),1),Object(c["createElementVNode"])("div",$,Object(c["toDisplayString"])(e.$t("value")),1)]),Object(c["createVNode"])(u,{ref_key:"propertiesFormRef",ref:r,model:s,class:"g-mt-12"},{default:Object(c["withCtx"])(()=>[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(s.data,(t,r)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"config-row",key:t.uuid},[Object(c["createVNode"])(n,{name:["data",r,"key"],rules:[{required:!0,message:""+e.$t(i.selectPh)}],class:"g-mr-8"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(a,{value:t.key,"onUpdate:value":e=>t.key=e,options:o.value,onSelect:(e,a)=>p(e,a,t),"filter-option":b,style:{width:"100%"},class:"g-mr-12"},{option:Object(c["withCtx"])(({key:e})=>[Object(c["createElementVNode"])("span",null,Object(c["toDisplayString"])(e),1)]),_:2},1032,["value","onUpdate:value","options","onSelect"])]),_:2},1032,["name","rules"]),Object(c["createVNode"])(n,{name:["data",r,"value"],rules:[{required:!0,message:""+e.$t(i.inputPh)}]},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(l,{value:t.value,"onUpdate:value":e=>t.value=e,maxlength:64,style:{width:"100%"}},null,8,["value","onUpdate:value"])]),_:2},1032,["name","rules"]),Object(c["createVNode"])(Object(c["unref"])(j["a"]),{class:"icon-close",onClick:e=>m(t)},null,8,["onClick"])]))),128))]),_:1},8,["model"]),Object(c["createVNode"])(d,{class:"config-btn",onClick:f},{default:Object(c["withCtx"])(()=>[C]),_:1})])}}});a("bc77");const w=N;var x=w;const V={class:"upgrade-table"},_={class:"nav-bar"},B={class:"title g-ml-8"},E={class:"content"},S={class:"table-attrs"},z={class:"footer-btn"};var F=Object(c["defineComponent"])({__name:"upgrade",emits:["goBack","refresh"],setup(e,{emit:t}){const a=Object(c["ref"])(!1),l=Object(c["reactive"])([]),r=Object(c["reactive"])([]),s=Object(c["reactive"])({}),i=Object(c["reactive"])([]),u=(Object(n["e"])(),Object(n["d"])()),d=Object(c["computed"])(()=>({...u.query})),p=Object(c["ref"])(),m=Object(c["ref"])();async function f(){try{const{catalog:e,db:t,table:c}=d.value;if(!e||!t||!c)return;a.value=!0,r.length=0,l.length=0;const n=await Object(g["d"])({...d.value}),{partitionColumnList:o=[],schema:i,properties:u}=n;(o||[]).forEach(e=>{r.push(e)}),(i||[]).forEach(e=>{l.push(e)}),Object.assign(s,u)}catch(e){}finally{a.value=!1}}function j(){v()}async function v(){i.length=0;const e=p.value.getPkname();e.forEach(e=>{i.push(e)}),m.value.getProperties().then(e=>{e&&(Object.assign(s,e),h())})}async function h(){try{const{catalog:e,db:c,table:n}=d.value;if(!e||!c||!n)return;a.value=!0,await Object(g["n"])({...d.value,pkList:i,properties:s}),k(),t("refresh")}catch(e){k()}finally{a.value=!1}}function k(){t("goBack")}function y(){k()}return Object(c["onMounted"])(()=>{f()}),(e,t)=>{const n=Object(c["resolveComponent"])("a-form-item"),i=Object(c["resolveComponent"])("a-form"),u=Object(c["resolveComponent"])("a-button");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",V,[Object(c["createElementVNode"])("div",_,[Object(c["createVNode"])(Object(c["unref"])(o["a"]),{onClick:k}),Object(c["createElementVNode"])("span",B,Object(c["toDisplayString"])(e.$t("upgradeHiveTable")),1)]),Object(c["createElementVNode"])("div",E,[Object(c["createElementVNode"])("div",S,[Object(c["createVNode"])(i,{name:"fields",class:"label-120"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(n,{label:e.$t("field"),name:"field"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(b,{loading:a.value,fields:l,ref_key:"schemaFieldRef",ref:p},null,8,["loading","fields"])]),_:1},8,["label"]),Object(c["createVNode"])(n,{label:e.$t("partitonField"),name:"partitonField"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(O,{loading:a.value,partitionFields:r},null,8,["loading","partitionFields"])]),_:1},8,["label"]),Object(c["createVNode"])(n,{label:e.$t("otherProperties"),name:"otherProperties"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(x,{propertiesObj:s,ref_key:"propertiesRef",ref:m},null,8,["propertiesObj"])]),_:1},8,["label"])]),_:1})]),Object(c["createElementVNode"])("div",z,[Object(c["createVNode"])(u,{type:"primary",onClick:j,loading:a.value,class:"btn g-mr-12"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.$t("ok")),1)]),_:1},8,["loading"]),Object(c["createVNode"])(u,{type:"ghost",onClick:y,class:"btn"},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.$t("cancel")),1)]),_:1})])])])}}});a("4dbb");const I=u()(F,[["__scopeId","data-v-5c84690d"]]);t["default"]=I},"4dbb":function(e,t,a){"use strict";a("cf8e")},5738:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"j",(function(){return l})),a.d(t,"i",(function(){return r})),a.d(t,"d",(function(){return s})),a.d(t,"m",(function(){return i})),a.d(t,"h",(function(){return u})),a.d(t,"g",(function(){return d})),a.d(t,"k",(function(){return b})),a.d(t,"c",(function(){return p})),a.d(t,"e",(function(){return m})),a.d(t,"f",(function(){return f})),a.d(t,"n",(function(){return O})),a.d(t,"l",(function(){return j}));var c=a("b32d");function n(){return c["a"].get("ams/v1/catalogs")}function o(e){const{catalog:t,keywords:a}=e;return c["a"].get(`ams/v1/catalogs/${t}/databases`,{params:{keywords:a}})}function l(e){const{catalog:t,db:a,keywords:n}=e;return c["a"].get(`ams/v1/catalogs/${t}/databases/${a}/tables`,{params:{keywords:n}})}function r({catalog:e="",db:t="",table:a="",token:n=""}){return c["a"].get(`ams/v1/tables/catalogs/${e}/dbs/${t}/tables/${a}/details`,{params:{token:n}})}function s({catalog:e="",db:t="",table:a=""}){return c["a"].get(`ams/v1/tables/catalogs/${e}/dbs/${t}/tables/${a}/hive/details`)}function i({catalog:e="",db:t="",table:a=""}){return c["a"].get(`ams/v1/tables/catalogs/${e}/dbs/${t}/tables/${a}/upgrade/status`)}function u(e){const{catalog:t,db:a,table:n,page:o,pageSize:l,token:r}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/partitions`,{params:{page:o,pageSize:l,token:r}})}function d(e){const{catalog:t,db:a,table:n,partition:o,page:l,pageSize:r,token:s}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/partitions/${o}/files`,{params:{page:l,pageSize:r,token:s}})}function b(e){const{catalog:t,db:a,table:n,page:o,pageSize:l,token:r}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/transactions`,{params:{page:o,pageSize:l,token:r}})}function p(e){const{catalog:t,db:a,table:n,transactionId:o,page:l,pageSize:r,token:s}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/transactions/${o}/detail`,{params:{page:l,pageSize:r,token:s}})}function m(e){const{catalog:t,db:a,table:n,page:o,pageSize:l,token:r}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/operations`,{params:{page:o,pageSize:l,token:r}})}function f(e){const{catalog:t,db:a,table:n,page:o,pageSize:l,token:r}=e;return c["a"].get(`ams/v1/tables/catalogs/${t}/dbs/${a}/tables/${n}/optimizing-processes`,{params:{page:o,pageSize:l,token:r}})}function O({catalog:e="",db:t="",table:a="",properties:n={},pkList:o=[]}){return c["a"].post(`ams/v1/tables/catalogs/${e}/dbs/${t}/tables/${a}/upgrade`,{properties:n,pkList:o})}function j(){return c["a"].get("ams/v1/upgrade/properties")}},8552:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var c=a("7a23"),n=a("47e2");function o(){const{t:e}=Object(n["b"])(),t=Object(c["computed"])(()=>e("catalog")).value,a=Object(c["computed"])(()=>e("databaseName")).value,o=Object(c["computed"])(()=>e("tableName")).value,l=Object(c["computed"])(()=>e("optimzerGroup")).value,r=Object(c["computed"])(()=>e("resourceGroup")).value,s=Object(c["computed"])(()=>e("parallelism")).value,i=Object(c["computed"])(()=>e("username")).value,u=Object(c["computed"])(()=>e("password")).value,d=Object(c["computed"])(()=>e("database",2)).value,b=Object(c["computed"])(()=>e("table",2)).value,p=Object(c["computed"])(()=>e("name")).value,m=Object(c["computed"])(()=>e("container")).value;return{selectPh:e("selectPlaceholder"),inputPh:e("inputPlaceholder"),selectClPh:e("selectPlaceholder",{selectPh:t}),selectDBPh:e("selectPlaceholder",{selectPh:a}),inputDBPh:e("inputPlaceholder",{inputPh:a}),inputClPh:e("inputPlaceholder",{inputPh:t}),inputTNPh:e("inputPlaceholder",{inputPh:o}),selectOptGroupPh:e("inputPlaceholder",{inputPh:l}),resourceGroupPh:e("inputPlaceholder",{inputPh:r}),parallelismPh:e("inputPlaceholder",{inputPh:s}),usernamePh:e("inputPlaceholder",{inputPh:i}),passwordPh:e("inputPlaceholder",{inputPh:u}),filterDBPh:e("filterPlaceholder",{inputPh:d}),filterTablePh:e("filterPlaceholder",{inputPh:b}),groupNamePh:e("inputPlaceholder",{inputPh:p}),groupContainer:e("selectPlaceholder",{selectPh:m})}}},"9ca6":function(e,t,a){"use strict";a("ebb5")},bc77:function(e,t,a){"use strict";a("11e6")},cf8e:function(e,t,a){},ebb5:function(e,t,a){}}]);