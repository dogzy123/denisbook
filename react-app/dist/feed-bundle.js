!function(e){function t(t){for(var n,a,i=t[0],c=t[1],l=t[2],h=0,u=[];h<i.length;h++)a=i[h],r[a]&&u.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(p&&p(t);u.length;)u.shift()();return o.push.apply(o,l||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],n=!0,i=1;i<s.length;i++){var c=s[i];0!==r[c]&&(n=!1)}n&&(o.splice(t--,1),e=a(a.s=s[0]))}return e}var n={},r={1:0},o=[];function a(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var p=c;o.push([517,0]),s()}({16:function(e,t,s){"use strict";s.d(t,"a",function(){return a});s(53);var n=s(5),r=s.n(n),o=s(3);const a=e=>{const t=(()=>window.auth2.currentUser.get())(),s=r()({googleIdToken:t.Zi.id_token},e);return fetch("https://midiana.lv:8086/?f="+s.func,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)}).then(e=>{if(e)return e.json();throw Error("Something bad is happening with server.")}).then(t=>{if((t.error||!t.hasOwnProperty("message"))&&e.hasOwnProperty("componentDispatch")){const s={isError:!0,errorMsg:t.error||"Something went wrong :/"};return e.componentDispatch(Object(o.y)(s)),Promise.reject(t.error)}return t}).catch(e=>{console.error(e)})}},284:function(e,t,s){"use strict";(function(e){var n=s(0),r=s(522),o=s(523),a=s(521),i=s(301),c=s.n(i),l=s(303),p=s.n(l),h=s(285),u=s(296),d=s(7),m=s(3);t.a=Object(d.b)(e=>({error:e.error}))(class extends n.Component{constructor(e){super(e),this.closeSnackbar=this.closeSnackbar.bind(this)}closeSnackbar(){this.props.dispatch(Object(m.y)({isError:!1,errorMsg:""}))}render(){return e.createElement("div",{className:"main-app"},e.createElement(h.a,null),e.createElement(u.a,null),e.createElement(r.a,{open:this.props.error.isError,autoHideDuration:6e3,anchorOrigin:{vertical:"bottom",horizontal:"left"}},e.createElement(o.a,{className:"error-notification",message:e.createElement("span",{className:"error-msg-content"},e.createElement(c.a,{className:"error-msg-icon"}),this.props.error.errorMsg),action:[e.createElement(a.a,{key:"close","aria-label":"Close",color:"inherit",onClick:this.closeSnackbar},e.createElement(p.a,null))]})))}})}).call(this,s(0))},285:function(e,t,s){"use strict";var n=s(5),r=s.n(n),o=s(7),a=s(0),i=s.n(a),c=s(16),l=s(3),p=s(520);const h=()=>({position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}),u=()=>({maxHeight:"575px",maxWidth:"100%"});t.a=Object(o.b)(null)(class extends a.Component{constructor(e){super(e),this.state={text:"",pastedImages:[],isError:!1,fullImage:"",newLine:{16:!1,13:!1}},this.onKeyDown=this.onKeyDown.bind(this),this.onInput=this.onInput.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.onPaste=this.onPaste.bind(this),this.fullImageClose=this.fullImageClose.bind(this),this.fullImageOpen=this.fullImageOpen.bind(this)}addPost(){const e={text:this.state.text};this.state.pastedImages.length>0&&this.state.pastedImages.forEach(t=>{e.text=e.text+"![](".concat(t,")\n")}),Object(c.a)(r()({func:"addPost",componentDispatch:this.props.dispatch},e)).then(t=>{const s=r()({rowId:t.rowId,author:t.author},e);this.props.dispatch(Object(l.r)(s))}),this.setState(r()({},this.state,{text:"",pastedImages:[]}))}onInput(e){this.setState(r()({},this.state,{text:e.target.value,isError:e.target.value.length<1}))}removePreviewImage(e){const t=this.state.pastedImages;t.splice(e,1),this.setState(r()({},this.state,{pastedImages:t}))}onPaste(e){const t=(e.clipboardData||e.originalEvent.clipboardData).items;for(let e in t){let s=t[e];if("file"===s.kind){const e=s.getAsFile(),t=new FileReader;t.onload=(t=>{const s=t.target.result;Object(c.a)({func:"uploadImage",fileName:e.name,imageBase64:s.substring(s.indexOf("base64,")+7,s.length)}).then(e=>{e&&"ok"===e.message&&this.setState(r()({},this.state,{pastedImages:this.state.pastedImages.concat([e.imageUrl])}))})}),t.readAsDataURL(e)}}}onKeyUp(e){13!==e.keyCode&&16!==e.keyCode||this.setState(r()({},this.state,{newLine:r()({},this.state.newLine,{[e.keyCode]:!1})}))}onKeyDown(e){if((16===e.keyCode||13===e.keyCode)&&(this.setState(r()({},this.state,{newLine:r()({},this.state.newLine,{[e.keyCode]:!0})})),13===e.keyCode&&!this.state.newLine[16]))return e.preventDefault(),e.target.value.length<1&&this.state.pastedImages.length<1?this.setState(r()({},this.state,{isError:!0})):this.addPost()}fullImageOpen(e){this.setState(r()({},this.state,{fullImage:e}))}fullImageClose(){this.setState(r()({},this.state,{fullImage:""}))}render(){const e=[];return this.state.pastedImages.length>0&&this.state.pastedImages.forEach((t,s)=>{e.push(i.a.createElement("div",{className:"preview-image-wrapper",key:s},i.a.createElement("span",{className:"preview-image-remove",onClick:()=>this.removePreviewImage(s)},i.a.createElement("svg",{className:"close-svg",viewBox:"0 0 40 40"},i.a.createElement("path",{className:"close-svg-path",d:"M 10,10 L 30,30 M 30,10 L 10,30"}))),i.a.createElement("img",{src:t,alt:"preview"+s,onClick:e=>this.fullImageOpen(t)})))}),i.a.createElement("div",{className:"create-post"},i.a.createElement("div",{className:"create-post-wrapper"},i.a.createElement("textarea",{value:this.state.text,onPaste:this.onPaste,className:"create-post-text"+(this.state.isError?" error":""),onKeyDown:this.onKeyDown,onKeyUp:this.onKeyUp,onChange:this.onInput,placeholder:"Write something here..."})),this.state.pastedImages.length>0&&i.a.createElement("div",{className:"create-post-image-preview"},e,i.a.createElement(p.a,{open:this.state.fullImage.length>0,onClose:this.fullImageClose},i.a.createElement("div",{style:h()},i.a.createElement("div",null,i.a.createElement("img",{src:this.state.fullImage,style:u()}))))))}})},296:function(e,t,s){"use strict";var n=s(5),r=s.n(n),o=s(33),a=s.n(o),i=s(0),c=s.n(i),l=s(7),p=s(1),h=s.n(p),u=s(16),d=s(3),m=s(297),g=s.n(m),f=s(298),j=s(299),v=s.n(j),b=s(519),w=s(11);const E=Object(w.a)(e=>({root:{backgroundColor:"#e0f2f1",border:"2px solid #a4bfbe"}}))(b.a);t.a=Object(l.b)(e=>({posts:e.posts,showPosts:e.showPosts,showPostStep:e.showPostStep,newPost:e.newPost,postsLength:e.postsLength,user:e.user}))(class extends i.Component{constructor(e){super(e),this.postSound=null,this.processingUsers=[],this.isBlurred=!1,this.updateInterval=null,this.state={users:[],play:!1},this.getUserAvatar=this.getUserAvatar.bind(this)}getBlurred(){return this.isBlurred}changeFavIco(e){let t=e.type;const s=document.querySelector("link[rel*='icon']")||document.createElement("link");s.type="image/x-icon",s.rel="shortcut icon",s.href=t&&"NEW MESSAGE"===t?"../react-app/src/style/img/favicon-msg.ico":"../react-app/src/style/img/favicon.ico",document.getElementsByTagName("head")[0].appendChild(s)}componentWillMount(){const e=t=>{if(window.pageYOffset+1e3>document.body.clientHeight&&this.props.posts.length){let t=this.props.showPostStep+35;if(this.props.showPostStep>=this.props.posts.length)return this.props.dispatch(Object(d.D)({showPosts:this.props.showPosts,showPostStep:this.props.posts.length})),window.removeEventListener("scroll",e);this.props.dispatch(Object(d.D)({showPosts:this.props.showPosts.concat(this.props.posts.slice(this.props.showPosts.length,t)),showPostStep:t}))}},t=()=>Object(u.a)({func:"getRelevantPosts",componentDispatch:this.props.dispatch}).then(e=>this.props.dispatch({type:d.d,posts:e.records||[]})).then(()=>{this.props.dispatch(Object(d.D)({showPosts:this.props.posts.slice(0,this.props.showPosts.length),showPostStep:this.props.showPostStep}))}).then(()=>{this.props.postsLength>0&&this.props.posts.length>this.props.postsLength&&(this.getBlurred()&&this.props.posts[0].author!==this.props.user.getBasicProfile().getEmail()&&(this.changeFavIco({type:"NEW MESSAGE"}),this.postSound.play()),this.props.dispatch(Object(d.B)({postsLength:this.props.posts.length})))});t().then(()=>{this.props.dispatch(Object(d.B)({postsLength:this.props.posts.length}))}).then(()=>{this.props.dispatch(Object(d.D)({showPosts:this.props.posts.slice(0,35),showPostStep:35})),window.addEventListener("scroll",e)}),this.updateInterval=setInterval(t,2e3)}shouldComponentUpdate(e,t){return e.showPosts.length!==this.props.showPosts.length||e.posts.length!==this.props.postsLength||t.users.length>this.state.users.length}getUserAvatar(e){let t=!1;this.state.users.forEach(s=>{s.email===e&&(t=!0)}),!t&&this.processingUsers.indexOf(e)<0&&(this.processingUsers=this.processingUsers.concat([e]),Object(u.a)({func:"getUserData",email:e,componentDispatch:this.props.dispatch}).then(t=>{if(t&&"ok"===t.message){const s=this.state.users.filter(e=>t.email===e.email);a()(s,1)[0]||(this.processingUsers=this.processingUsers.filter(t=>t!==e),this.setState(r()({},this.state,{users:this.state.users.concat(r()({},t))})))}}))}componentDidMount(){window.onblur=(e=>this.isBlurred=!0),window.onfocus=(e=>{this.isBlurred=!1,this.changeFavIco({type:!1})})}render(){const e=[],t=this.props.user.getBasicProfile();return this.props.showPosts.length&&this.props.showPosts.map(s=>{let n,r;if(t.getEmail()===s.author)n=t.getImageUrl(),r=t.getName();else{const e=this.state.users.filter(e=>s.author===e.email),t=a()(e,1)[0];t?(n=t.imageUrl,r=t.displayName):this.getUserAvatar(s.author)}e.push(c.a.createElement("div",{key:s.rowId,className:"post"},c.a.createElement("div",{className:"post-wrapper"},this.props.user.getBasicProfile().getEmail()===s.author&&c.a.createElement(f.a,{post:s}),c.a.createElement("div",{className:"post-sub-title"},c.a.createElement("div",{className:"post-avatar"},c.a.createElement(E,{src:n})),c.a.createElement("div",{className:"post-user-info"},c.a.createElement("div",{className:"post-author"},c.a.createElement("span",null,r||s.author)),c.a.createElement("div",{className:"post-date"},h()(s.dt).format("DD MMMM, HH:mm")))),c.a.createElement("div",{className:"post-body"},c.a.createElement(g.a,{source:s.text})),c.a.createElement("div",{className:"post-footer"},c.a.createElement("div",{className:"footer-icons"},c.a.createElement("span",{className:"icon-like"},c.a.createElement(v.a,{fontSize:"small"})))))))}),c.a.createElement("div",{className:"user-posts"},e,c.a.createElement("audio",{src:"../react-app/src/audio/newpost.mp3",ref:e=>this.postSound=e}))}})},298:function(e,t,s){"use strict";(function(e){s.d(t,"a",function(){return o});var n=s(0),r=s(16);class o extends n.Component{constructor(e){super(e),this.onRemove=this.onRemove.bind(this)}onRemove(){Object(r.a)({func:"deletePost",rowId:this.props.post.rowId})}render(){return e.createElement("div",{className:"post-remove",onClick:this.onRemove},"⨯")}}}).call(this,s(0))},3:function(e,t,s){"use strict";s.d(t,"d",function(){return n}),s.d(t,"b",function(){return r}),s.d(t,"i",function(){return o}),s.d(t,"j",function(){return a}),s.d(t,"q",function(){return i}),s.d(t,"k",function(){return c}),s.d(t,"e",function(){return l}),s.d(t,"g",function(){return p}),s.d(t,"h",function(){return h}),s.d(t,"m",function(){return u}),s.d(t,"l",function(){return d}),s.d(t,"a",function(){return m}),s.d(t,"f",function(){return g}),s.d(t,"p",function(){return f}),s.d(t,"c",function(){return j}),s.d(t,"o",function(){return v}),s.d(t,"n",function(){return b}),s.d(t,"w",function(){return w}),s.d(t,"r",function(){return E}),s.d(t,"B",function(){return y}),s.d(t,"D",function(){return S}),s.d(t,"C",function(){return I}),s.d(t,"u",function(){return P}),s.d(t,"v",function(){return k}),s.d(t,"x",function(){return O}),s.d(t,"s",function(){return N}),s.d(t,"z",function(){return C}),s.d(t,"t",function(){return D}),s.d(t,"A",function(){return x}),s.d(t,"y",function(){return L});s(80);const n="FETCH POSTS",r="ADD POST",o="LOGGED IN",a="LOG_OUT",i="SET SESSION",c="POSTS TO SHOW",l="INITIAL POSTS STATUS",p="LOAD DIALOGS",h="LOAD MESSAGES",u="SET DIALOG KEY",d="SET CURRENT DIALOG",m="ADD MY MESSAGES",g="INIT MY MESSAGES",f="SET MY MESSAGES",j="CHECK KEYS",v="SET KEYS",b="SET ERROR",w=()=>({type:a,loggedIn:!1,user:{}}),E=e=>({type:r,post:e}),y=e=>{let t=e.postsLength;return{type:l,postsLength:t}},S=e=>{let t=e.showPosts,s=e.showPostStep;return{type:c,showPosts:t,showPostStep:s}},I=e=>{return{session:e.session,user:e.user,type:i,loggedIn:!0}},P=e=>{let t=e.dialogs;return{type:p,dialogs:t}},k=e=>({type:h,messages:e}),O=e=>({type:d,currentDialog:e}),N=e=>({type:j,keysChecking:e}),C=e=>{let t=e.publicKeyB64,s=e.privateKeyB64;return{type:v,publicKey:t.trim(),privateKey:s.trim()}},D=e=>({type:u,string:e}),x=e=>({type:f,myMessages:e}),L=e=>({type:b,error:e})},403:function(e,t,s){var n={"./af":139,"./af.js":139,"./ar":140,"./ar-dz":141,"./ar-dz.js":141,"./ar-kw":142,"./ar-kw.js":142,"./ar-ly":143,"./ar-ly.js":143,"./ar-ma":144,"./ar-ma.js":144,"./ar-sa":145,"./ar-sa.js":145,"./ar-tn":146,"./ar-tn.js":146,"./ar.js":140,"./az":147,"./az.js":147,"./be":148,"./be.js":148,"./bg":149,"./bg.js":149,"./bm":150,"./bm.js":150,"./bn":151,"./bn.js":151,"./bo":152,"./bo.js":152,"./br":153,"./br.js":153,"./bs":154,"./bs.js":154,"./ca":155,"./ca.js":155,"./cs":156,"./cs.js":156,"./cv":157,"./cv.js":157,"./cy":158,"./cy.js":158,"./da":159,"./da.js":159,"./de":160,"./de-at":161,"./de-at.js":161,"./de-ch":162,"./de-ch.js":162,"./de.js":160,"./dv":163,"./dv.js":163,"./el":164,"./el.js":164,"./en-SG":165,"./en-SG.js":165,"./en-au":166,"./en-au.js":166,"./en-ca":167,"./en-ca.js":167,"./en-gb":168,"./en-gb.js":168,"./en-ie":169,"./en-ie.js":169,"./en-il":170,"./en-il.js":170,"./en-nz":171,"./en-nz.js":171,"./eo":172,"./eo.js":172,"./es":173,"./es-do":174,"./es-do.js":174,"./es-us":175,"./es-us.js":175,"./es.js":173,"./et":176,"./et.js":176,"./eu":177,"./eu.js":177,"./fa":178,"./fa.js":178,"./fi":179,"./fi.js":179,"./fo":180,"./fo.js":180,"./fr":181,"./fr-ca":182,"./fr-ca.js":182,"./fr-ch":183,"./fr-ch.js":183,"./fr.js":181,"./fy":184,"./fy.js":184,"./ga":185,"./ga.js":185,"./gd":186,"./gd.js":186,"./gl":187,"./gl.js":187,"./gom-latn":188,"./gom-latn.js":188,"./gu":189,"./gu.js":189,"./he":190,"./he.js":190,"./hi":191,"./hi.js":191,"./hr":192,"./hr.js":192,"./hu":193,"./hu.js":193,"./hy-am":194,"./hy-am.js":194,"./id":195,"./id.js":195,"./is":196,"./is.js":196,"./it":197,"./it-ch":198,"./it-ch.js":198,"./it.js":197,"./ja":199,"./ja.js":199,"./jv":200,"./jv.js":200,"./ka":201,"./ka.js":201,"./kk":202,"./kk.js":202,"./km":203,"./km.js":203,"./kn":204,"./kn.js":204,"./ko":205,"./ko.js":205,"./ku":206,"./ku.js":206,"./ky":207,"./ky.js":207,"./lb":208,"./lb.js":208,"./lo":209,"./lo.js":209,"./lt":210,"./lt.js":210,"./lv":211,"./lv.js":211,"./me":212,"./me.js":212,"./mi":213,"./mi.js":213,"./mk":214,"./mk.js":214,"./ml":215,"./ml.js":215,"./mn":216,"./mn.js":216,"./mr":217,"./mr.js":217,"./ms":218,"./ms-my":219,"./ms-my.js":219,"./ms.js":218,"./mt":220,"./mt.js":220,"./my":221,"./my.js":221,"./nb":222,"./nb.js":222,"./ne":223,"./ne.js":223,"./nl":224,"./nl-be":225,"./nl-be.js":225,"./nl.js":224,"./nn":226,"./nn.js":226,"./pa-in":227,"./pa-in.js":227,"./pl":228,"./pl.js":228,"./pt":229,"./pt-br":230,"./pt-br.js":230,"./pt.js":229,"./ro":231,"./ro.js":231,"./ru":232,"./ru.js":232,"./sd":233,"./sd.js":233,"./se":234,"./se.js":234,"./si":235,"./si.js":235,"./sk":236,"./sk.js":236,"./sl":237,"./sl.js":237,"./sq":238,"./sq.js":238,"./sr":239,"./sr-cyrl":240,"./sr-cyrl.js":240,"./sr.js":239,"./ss":241,"./ss.js":241,"./sv":242,"./sv.js":242,"./sw":243,"./sw.js":243,"./ta":244,"./ta.js":244,"./te":245,"./te.js":245,"./tet":246,"./tet.js":246,"./tg":247,"./tg.js":247,"./th":248,"./th.js":248,"./tl-ph":249,"./tl-ph.js":249,"./tlh":250,"./tlh.js":250,"./tr":251,"./tr.js":251,"./tzl":252,"./tzl.js":252,"./tzm":253,"./tzm-latn":254,"./tzm-latn.js":254,"./tzm.js":253,"./ug-cn":255,"./ug-cn.js":255,"./uk":256,"./uk.js":256,"./ur":257,"./ur.js":257,"./uz":258,"./uz-latn":259,"./uz-latn.js":259,"./uz.js":258,"./vi":260,"./vi.js":260,"./x-pseudo":261,"./x-pseudo.js":261,"./yo":262,"./yo.js":262,"./zh-cn":263,"./zh-cn.js":263,"./zh-hk":264,"./zh-hk.js":264,"./zh-tw":265,"./zh-tw.js":265};function r(e){var t=o(e);return s(t)}function o(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=403},517:function(e,t,s){"use strict";s.r(t);var n=s(0),r=s.n(n),o=s(12),a=s.n(o),i=s(7),c=s(59),l=s(284),p=s(44),h=(s(56),s(74),s(5)),u=s.n(h),d=s(3);const m={loggedIn:!1,user:null,posts:[],showPosts:[],postsLength:0,showPostStep:0,error:{isError:!1,errorMsg:""}};const g=Object(p.b)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case d.d:return u()({},e,{posts:t.posts});case d.b:return u()({},e,{newPost:t.post,showPosts:[t.post,...e.showPosts],showPostStep:e.showPostStep+1});case d.e:return u()({},e,{postsLength:t.postsLength});case d.k:return u()({},e,{showPosts:t.showPosts,showPostStep:t.showPostStep});case d.i:return u()({},e,{loggedIn:t.loggedIn,user:t.user});case d.q:return u()({},e,{loggedIn:t.loggedIn,session:t.session,user:t.user});case d.j:return u()({},e,{loggedIn:t.loggedIn,user:t.user});case d.n:return u()({},e,{error:{isError:t.error.isError,errorMsg:t.error.errorMsg}});default:return u()({},e)}});g.subscribe(()=>{});var f=class extends n.Component{render(){return r.a.createElement(i.a,{store:g},r.a.createElement(c.a,{body:r.a.createElement(l.a,null)}))}};a.a.render(r.a.createElement(f,null),document.getElementById("main"))},59:function(e,t,s){"use strict";(function(e){var n=s(0),r=s(60),o=s(76),a=s(7),i=s(3);t.a=Object(a.b)(e=>({loggedIn:e.loggedIn,user:e.user}))(class extends n.Component{constructor(e){super(e)}componentDidMount(){let e;const t=this.props.dispatch;gapi.load("auth2",function(){e=gapi.auth2.init({client_id:"521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com"}).then(e=>e.isSignedIn.get()?(window.auth2=e,t(Object(i.C)({session:e,user:e.currentUser.get()}))):t(Object(i.w)()))})}getContext(){return this.props.loggedIn?this.props.body:this.props.user?e.createElement(r.a,null):e.createElement("div",{className:"loader"},e.createElement(o.BarLoader,{color:"#26A69A",width:200,height:5}))}render(){return this.getContext()}})}).call(this,s(0))},60:function(e,t,s){"use strict";(function(e){var n=s(5),r=s.n(n),o=s(0),a=s(7),i=s(3),c=s(16);t.a=Object(a.b)(e=>({loggedIn:e.loggedIn,user:e.user}))(class extends o.Component{constructor(e){super(e)}onSignIn(e){return function(t){const s=gapi.auth2.getAuthInstance();window.auth2=r()({},s),e(Object(i.C)({session:s,user:t})),Object(c.a)({func:"login"})}}componentDidMount(){const e=this.onSignIn(this.props.dispatch);gapi.signin2.render("google-signin",{scope:"profile email",width:240,height:50,longtitle:!0,theme:"dark",onsuccess:e})}render(){return e.createElement("div",{id:"login-panel"},e.createElement("div",{className:"login-wrapper"},e.createElement("div",{className:"login-title"},e.createElement("h1",null,"Choose login form")),e.createElement("div",{className:"login-body"},e.createElement("div",{id:"google-signin"}))))}})}).call(this,s(0))}});