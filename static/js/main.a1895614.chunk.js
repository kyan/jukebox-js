(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{113:function(e,t,n){e.exports=n.p+"static/media/default-artwork.6bba9800.png"},258:function(e,t){e.exports={transformUrl:function(e){var t=e.replace(/^.*\/track\//,"spotify:track:");return t.match(/spotify:track/g)?t:null}}},287:function(e,t,n){e.exports=n(546)},334:function(e,t){},482:function(e,t,n){},483:function(e,t,n){},484:function(e,t,n){},544:function(e,t,n){},545:function(e,t,n){},546:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"updateToken",(function(){return F})),n.d(r,"clearToken",(function(){return H})),n.d(r,"addNewTrack",(function(){return W})),n.d(r,"addCurrentTrack",(function(){return q})),n.d(r,"addTrackList",(function(){return X})),n.d(r,"removeFromTracklist",(function(){return Z})),n.d(r,"updateProgressTimer",(function(){return Q})),n.d(r,"wsConnect",(function(){return $})),n.d(r,"wsConnecting",(function(){return ee})),n.d(r,"wsConnected",(function(){return te})),n.d(r,"wsDisconnect",(function(){return ne})),n.d(r,"wsDisconnected",(function(){return re})),n.d(r,"mopidyConnected",(function(){return ae})),n.d(r,"mopidyDisconnected",(function(){return oe})),n.d(r,"getCurrentTrack",(function(){return ce})),n.d(r,"getTimePosition",(function(){return ie})),n.d(r,"getState",(function(){return ue})),n.d(r,"getImage",(function(){return le})),n.d(r,"newImage",(function(){return se})),n.d(r,"resolveImage",(function(){return de})),n.d(r,"getTrackList",(function(){return me})),n.d(r,"clearTrackList",(function(){return pe})),n.d(r,"startPlaying",(function(){return fe})),n.d(r,"stopPlaying",(function(){return Ee})),n.d(r,"pausePlaying",(function(){return be})),n.d(r,"nextPlaying",(function(){return ke})),n.d(r,"previousPlaying",(function(){return ye})),n.d(r,"getVolume",(function(){return ge})),n.d(r,"updateVolume",(function(){return Ce})),n.d(r,"updatePlaybackState",(function(){return he})),n.d(r,"setVolume",(function(){return Oe}));var a=n(0),o=n.n(a),c=n(24),i=n.n(c),u=n(26),l=n(29),s=n(73),d=n.n(s),m=n(256),p=n(55),f=n(56),E=n(61),b=n(57),k=n(62),y=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(E.a)(this,Object(b.a)(t).call(this,e))).state={hasError:!1},n}return Object(k.a)(t,e),Object(f.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?o.a.createElement("h1",null,"Ouch! I broke a bit."):this.props.children}}]),t}(o.a.Component),g=o.a.createContext(),C=n(257),h=n.n(C),O="mopidy::playback.getCurrentTrack",v="mopidy::event:trackPlaybackStarted",N="mopidy::event:playbackStateChanged",T="mopidy::tracklist.getTracks",D="mopidy::tracklist.add",S="mopidy::tracklist.remove",j="mopidy::tracklist.clear",P="mopidy::library.getImages",_="mopidy::playback.getTimePosition",I="mopidy::playback.getState",w="mopidy::playback.play",A="mopidy::playback.stop",R="mopidy::playback.pause",x="mopidy::playback.next",U="mopidy::playback.previous",M="playing",L="paused",V="stopped",K="mopidy::mixer.setVolume",G="mopidy::mixer.getVolume",Y="mopidy::event:volumeChanged",B="mopidy::tracklist.validation",J={ADD_CURRENT_TRACK:"actionAddCurrentTrack",ADD_TRACKS:"actionAddTracks",CONNECT:"actionConnect",CONNECTING:"actionConnecting",CONNECTED:"actionConnected",DISCONNECT:"actionDisconnect",DISCONNECTED:"actionDisconnected",DROP_TYPES:["__NATIVE_URL__"],NEW_IMAGE:"actionNewImage",RESOLVE_IMAGE:"actionResolveImage",SEND:"actionSend",STORE_TOKEN:"actionStoreToken",CLEAR_STORE_TOKEN:"actionClearStoreToken",UPDATE_VOLUME:"actionUpdateVolume",UPDATE_PLAYBACK_STATE:"actionPlaybackState",UPDATE_PROGRESS_TIMER:"actionUpdateProgressTimer",MOPIDY_CONNECTED:"actionMopidyConnected",MOPIDY_DISCONNECTED:"actionMopidyDisconnected"},z=n(258),F=function(e){return{type:J.STORE_TOKEN,token:e}},H=function(){return{type:J.CLEAR_STORE_TOKEN}},W=function(e){var t=Object(z.transformUrl)(e);return{type:J.SEND,key:D,params:{uri:t}}},q=function(e){return{type:J.ADD_CURRENT_TRACK,track:e}},X=function(e){return{type:J.ADD_TRACKS,list:e}},Z=function(e){return{type:J.SEND,key:S,params:{uri:[e]}}},Q=function(e,t){return t===1/0&&(t=0),{type:J.UPDATE_PROGRESS_TIMER,position:e,duration:t}},$=function(){return{type:J.CONNECT}},ee=function(){return{type:J.CONNECTING}},te=function(){return{type:J.CONNECTED}},ne=function(){return{type:J.DISCONNECT}},re=function(){return{type:J.DISCONNECTED}},ae=function(){return{type:J.MOPIDY_CONNECTED}},oe=function(){return{type:J.MOPIDY_DISCONNECTED}},ce=function(){return{type:J.SEND,key:O}},ie=function(){return{type:J.SEND,key:_}},ue=function(){return{type:J.SEND,key:I}},le=function(e){return{type:J.SEND,key:P,params:[[e]],uri:e}},se=function(e){return{type:J.NEW_IMAGE,uri:e}},de=function(e){return{type:J.RESOLVE_IMAGE,data:e}},me=function(){return{type:J.SEND,key:T}},pe=function(){return{type:J.SEND,key:j}},fe=function(){return{type:J.SEND,key:w}},Ee=function(){return{type:J.SEND,key:A}},be=function(){return{type:J.SEND,key:R}},ke=function(){return{type:J.SEND,key:x}},ye=function(){return{type:J.SEND,key:U}},ge=function(){return{type:J.SEND,key:G}},Ce=function(e){return{type:J.UPDATE_VOLUME,volume:e}},he=function(e){return{type:J.UPDATE_PLAYBACK_STATE,state:e}},Oe=function(e){return{type:J.SEND,key:K,params:[Number(e)]}},ve=function(e,t){var n=t.findIndex((function(t){return t.ref===e}));return t[n]?t[n].uri:null},Ne=n(259),Te=n.n(Ne),De=function(e){var t=Math.floor(e/6e4),n=(e%6e4/1e3).toFixed(0);return t+":"+(n<10?"0":"")+n},Se=function(e){return.001*e},je=function(e){if(0===e.duration)return 0;var t=Se(e.position),n=Se(e.duration),r=Math.round(t/n*100);return isNaN(r)?0:r},Pe="auth::authenticationTokenInvalid",_e={encode:function(e,t,n){return{jwt:e,key:t,data:n}},decode:function(e){return JSON.parse(e)},encodeToJson:function(e,t,n){return JSON.stringify(_e.encode(e,t,n))}},Ie=_e,we={success:function(e){return s.notify.show(e,"success",3e3,{})},warning:function(e){return s.notify.show(e,"warning",3e3,{})}},Ae=function(e,t){e.dispatch(he(t))},Re=function(e){return e.composer?e.composer.uri:e.album.uri},xe=function(e,t,n){var r=Ie.decode(t),a=r.key,o=r.data;switch(a){case Pe:console.log("AUTHENTICATION_TOKEN_INVALID: ".concat(o.error)),e.dispatch(H());break;case O:case v:o&&o.track&&function(e,t,n){t.dispatch(q(e)),t.dispatch(le(Re(e)));var r=n.set(0,e.length);t.getState().jukebox.playbackState===M&&r.start()}(o.track,e,n);break;case N:case I:!function(e,t,n){switch(t){case L:case V:Ae(e,t),n.stop(),we.success("Jukebox Halted");break;case M:Ae(e,t),n.start()}}(e,o,n);break;case T:!function(e,t){t.dispatch(X(e)),e.forEach((function(e){t.dispatch(le(Re(e.track)))}))}(o,e);break;case x:case U:e.dispatch(ce());break;case G:e.dispatch(Ce(o));break;case Y:e.dispatch(Ce(o)),we.success("Volume Changed");break;case P:e.dispatch(de(o));break;case _:n.set(o);break;case B:we.warning(o);break;default:console.log("Unknown message: ".concat(a," body: ").concat(o))}},Ue={loadInitial:function(e){["getCurrentTrack","getTimePosition","getState","getTrackList","getVolume"].forEach((function(t){e.dispatch(r[t]())}))}},Me=function(){var e="http://".concat("jukebox-api-prod.local",":").concat("8080"),t=null,n=null;return function(a){return function(o){return function(c){var i=function(){return c.key===P},u=function(e){if(JSON.parse(e).online)return a.dispatch(ae()),Ue.loadInitial(a);a.dispatch(oe())},l=function(e){n=function(e,t){return Te()({callback:function(n,r){e.dispatch(t.updateProgressTimer(n,r))},fallbackTargetFrameRate:1,disableRequestAnimationFrame:!0})}(a,r),a.dispatch(te())},s=function(e){return a.dispatch(ne())},d=function(e){return xe(a,e,n)};switch(c.type){case J.CONNECT:return null!=t&&t.close(),(t=h()(e,{transports:["websocket"]})).on("mopidy",u),t.on("message",d),t.on("connect",l),t.on("disconnect",s),void a.dispatch(ee());case J.DISCONNECT:return n&&n.reset(),void a.dispatch(re());case J.SEND:if(i()&&ve(c.uri,a.getState().assets))return;return i()&&a.dispatch(se(c.uri)),t.emit("message",Ie.encodeToJson(a.getState().settings.token,c.key,c.params));default:return o(c)}}}}}(),Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.ADD_CURRENT_TRACK:return t.track;default:return e}},Ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.ADD_TRACKS:return t.list.map((function(e){return e.track}));default:return e}},Ke=n(260),Ge=n(276);function Ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Be(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ye(n,!0).forEach((function(t){Object(Ke.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ye(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Je=[],ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.NEW_IMAGE:return e.find((function(e){return t.uri&&e.ref===t.uri}))?e:[].concat(Object(Ge.a)(e),[{ref:t.uri}]);case J.RESOLVE_IMAGE:return e.map((function(e){return t.data[e.ref]&&t.data[e.ref][0]?Be({},e,{uri:t.data[e.ref][0].uri}):e})).slice(0,200);default:return e}},Fe={position:0,duration:0,remaining:0},He=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.UPDATE_PROGRESS_TIMER:return{position:t.position,duration:t.duration,remaining:t.duration-t.position};default:return e}},We={online:!1,mopidyOnline:!1,volume:0,playbackState:V},qe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:We,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.CONNECTED:return Object.assign({},e,{online:!0});case J.DISCONNECTED:return Object.assign({},e,{online:!1});case J.MOPIDY_CONNECTED:return Object.assign({},e,{mopidyOnline:!0});case J.MOPIDY_DISCONNECTED:return Object.assign({},e,{mopidyOnline:!1});case J.UPDATE_VOLUME:return Object.assign({},e,{volume:t.volume});case J.UPDATE_PLAYBACK_STATE:return Object.assign({},e,{playbackState:t.state});default:return e}},Xe={token:null},Ze=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case J.STORE_TOKEN:return t.token===e.token?e:Object.assign({},e,{token:t.token});case J.CLEAR_STORE_TOKEN:return Object.assign({},e,{token:null});default:return e}},Qe=Object(l.combineReducers)({track:Le,tracklist:Ve,assets:ze,timer:He,jukebox:qe,settings:Ze}),$e=n(552),et=n(58),tt=n(107),nt=n.n(tt),rt=n(161),at={refresh:function(e,t){return rt.b((function(){e.reloadAuthResponse().then((function(e){return t(e.id_token)}),(function(e){return console.warn("Token un-refreshable: ",e.message)}))}),27e5)},clear:function(e){e&&rt.a(e)}},ot=n(157),ct=function(e){return e.assets},it=Object(ot.a)([function(e){return e.track},ct],(function(e,t){return e?ve(e.album.uri,t):null})),ut=Object(ot.a)([function(e){return e.tracklist},ct],(function(e,t){var n={};return e.forEach((function(e){n[e.album.uri]=ve(e.album.uri,t)})),n})),lt=n(560),st=n(551),dt=n(558),mt=n(559),pt=n(557),ft=n(34),Et=function(e){var t=e.disabled,n=e.onPrevious,r=e.onNext;return o.a.createElement("span",null,function(e,t){return o.a.createElement(pt.a,{onClick:e,animated:"vertical",className:"jb-previous-button",disabled:t},o.a.createElement(pt.a.Content,{hidden:!0},"Prev"),o.a.createElement(pt.a.Content,{visible:!0},o.a.createElement(ft.a,{name:"step backward"})))}(n,t),function(e,t){return o.a.createElement(pt.a,{onClick:e,animated:"vertical",className:"jb-next-button",disabled:t},o.a.createElement(pt.a.Content,{hidden:!0},"Next"),o.a.createElement(pt.a.Content,{visible:!0},o.a.createElement(ft.a,{name:"step forward"})))}(r,t))},bt=function(e){var t=e.disabled,n=e.playbackState,r=e.onPlay,a=e.onPause,c=e.onStop,i=e.onPrevious,u=e.onNext;return o.a.createElement("span",null,o.a.createElement(Et,{disabled:t,onPrevious:i,onNext:u}),function(e,t,n){return o.a.createElement(pt.a,{onClick:e,animated:"vertical",disabled:t===M||n,active:t===M,className:"jb-play-button"},o.a.createElement(pt.a.Content,{hidden:!0},"Play"),o.a.createElement(pt.a.Content,{visible:!0},o.a.createElement(ft.a,{name:"play"})))}(r,n,t),function(e,t,n){return o.a.createElement(pt.a,{onClick:e,animated:"vertical",disabled:t===L||t===V||n,active:t===L,className:"jb-pause-button"},o.a.createElement(pt.a.Content,{hidden:!0},"Pause"),o.a.createElement(pt.a.Content,{visible:!0},o.a.createElement(ft.a,{name:"pause"})))}(a,n,t),function(e,t,n){return o.a.createElement(pt.a,{onClick:e,animated:"vertical",disabled:t===V||n,active:t===V,className:"jb-stop-button"},o.a.createElement(pt.a.Content,{hidden:!0},"Stop"),o.a.createElement(pt.a.Content,{visible:!0},o.a.createElement(ft.a,{name:"stop"})))}(c,n,t))},kt=function(e){function t(){return Object(p.a)(this,t),Object(E.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(k.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return(0,this.props.connectDropTarget)(o.a.createElement("div",{title:"Drag in Spotify tracks to add to playlist"},this.props.children))}}]),t}(a.Component),yt=Object(et.DropTarget)((function(e){return e.accepts}),{drop:function(e,t){e.onDrop&&e.onDrop(e,t)}},(function(e,t){return{connectDropTarget:e.dropTarget()}}))(kt),gt=function(e){var t=e.disabled,n=e.onDrop,r=e.children;return t?r:o.a.createElement(et.DragDropContextProvider,{backend:nt.a},o.a.createElement(yt,{accepts:J.DROP_TYPES,onDrop:n},r))},Ct=n(556),ht=n(277),Ot=n(275),vt=n(113),Nt=n.n(vt),Tt=(n(482),function(e){return e||(e=Nt.a),o.a.createElement(ht.a,{src:e})}),Dt=function(e){var t,n=e.track,r=e.image,a=e.progress,c=e.remaining;return n?o.a.createElement(Ct.a,null,Tt(r),o.a.createElement(Ct.a.Content,null,o.a.createElement("div",{className:"progress-container"},o.a.createElement("span",{className:"remaining-text"},De(c)),o.a.createElement("span",{className:"track-length"},De(n.length)),o.a.createElement(Ot.a,{percent:a})),o.a.createElement(Ct.a.Header,null,n.name),o.a.createElement(Ct.a.Meta,null,n.artist.name),function(e){if(!e)return null;var t=e.year?" (".concat(e.year,")"):null;return o.a.createElement(Ct.a.Description,null,e.name,t)}(n.album),(t=n.composer)?o.a.createElement(Ct.a.Description,null,t.name):null),o.a.createElement(Ct.a.Content,{extra:!0},function(e){var t={spotify:"green"},n=e.split(":")[0];return t[n]?o.a.createElement(ft.a,{name:n,color:t[n]}):null}(n.uri))):o.a.createElement(Ct.a,null,Tt(null),o.a.createElement(Ct.a.Content,null,o.a.createElement(Ct.a.Header,null,"Nothing playing"),o.a.createElement(Ct.a.Description,null,"Drag some music here or press play.")))},St=Object(u.b)((function(e){return{track:e.track,image:it(e),progress:je(e.timer),remaining:e.timer.remaining}}))((function(e){var t=e.track,n=e.image,r=e.progress,a=e.remaining;return o.a.createElement(Dt,{track:t,image:n,progress:r,remaining:a})})),jt=(n(483),function(){var e=Object(a.useContext)(g),t=e.googleUser,n=e.signIn,r=e.signOut,c=o.a.createElement(pt.a,{icon:"power off",floated:"right",onClick:function(){return n()},className:"jb-settings-toggle",title:"Login using Google"});return t&&t.profileObj&&(c=o.a.createElement(ht.a,{rounded:!0,size:"mini",floated:"right",title:t.profileObj.name,src:t.profileObj.imageUrl,onClick:function(){return r()}})),o.a.createElement(o.a.Fragment,null,c)}),Pt=n(3),_t=n.n(Pt),It=n(555),wt=(n(484),function(e,t,n,r,a,c){var i,u,l;return n&&t.album&&(i=n[t.album.uri]),n&&t.composer&&(i=n[t.composer.uri]),i||(i=Nt.a),function(e){var t,n,r=e.image,a=e.isCurrent,c=e.onClick,i=e.hasBeenPlayed;return a&&(t="current-image"),c&&!a&&(n="Click to remove from playlist",t="remove-image"),o.a.createElement(ht.a,{className:t,size:i?"tiny":"mini",src:r,title:n,onClick:c,inline:!0})}({image:i,hasBeenPlayed:c,isCurrent:r,onClick:e||r?void 0:(u=t.uri,l=a,function(){return l(u)})})}),At=function(e,t,n,r,a){var c;return t.map((function(t,i){var u=function(e,t){return!!e&&e.uri===t.uri}(r,t);return c&&(c+=t.length),u&&(c=Date.now()),o.a.createElement(It.a.Item,{className:_t()({"current-track":u}),key:"".concat(i,"-").concat(t.uri)},wt(e,t,n,u,a,c),o.a.createElement(It.a.Content,{className:_t()({"track-info":!c})},function(e){return o.a.createElement(It.a.Header,{as:"h4"},e.name)}(t),function(e){return o.a.createElement(It.a.Description,null,e.artist.name," ",o.a.createElement("small",null,"(",De(e.length),")"))}(t)))}))},Rt=function(e){var t=e.disabled,n=e.tracks,r=e.images,a=e.currentTrack,c=e.onRemoveTrack;return n?o.a.createElement(It.a,{relaxed:!0},At(t,n,r,a,c)):null},xt=function(e,t){if((e+=1)<=100)return function(){t(e)}},Ut=function(e,t){if((e-=1)>=0)return function(){t(e)}},Mt=function(e){var t=e.disabled,n=e.volume,r=e.onVolumeChange;return o.a.createElement(pt.a.Group,{floated:"right"},o.a.createElement(pt.a,{className:"jb-volume-down",onClick:Ut(n,r),disabled:t},o.a.createElement(ft.a,{name:"volume down"})),o.a.createElement(pt.a.Or,{text:n}),o.a.createElement(pt.a,{className:"jb-volume-up",onClick:xt(n,r),disabled:t},o.a.createElement(ft.a,{name:"volume up"})))},Lt=n(114),Vt=n(553),Kt=function(e){function t(){var e,n;Object(p.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(E.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(a)))).state={open:!1},n.clearButton=function(){return o.a.createElement(Lt.a,{horizontal:!0,size:"mini",as:"a",color:"red",onClick:n.show,className:"jb-clear-button"},"CLEAR")},n.show=function(){n.setState({open:!0})},n.handleConfirm=function(e){n.setState({open:!1}),n.props.onClear(e)},n.handleCancel=function(){n.setState({open:!1})},n}return Object(k.a)(t,e),Object(f.a)(t,[{key:"render",value:function(){return this.props.disabled?null:o.a.createElement("span",null,this.clearButton(),o.a.createElement(Vt.a,{content:"Are you sure you want to nuke the playlist?",cancelButton:"No thanks",confirmButton:"Do it!",open:this.state.open,onCancel:this.handleCancel,onConfirm:this.handleConfirm}))}}]),t}(a.Component),Gt=(n(544),function(e){var t=e.online,n=e.disabled,r=e.volume,a=e.playbackState,c=e.onPlay,i=e.onStop,u=e.onPause,l=e.onNext,s=e.onPrevious,d=e.onVolumeChange,m=e.onDrop,p=e.onTracklistClear,f=e.trackListImages,E=e.tracklist,b=e.currentTrack,k=e.onRemoveTrack;return o.a.createElement(lt.a.Dimmable,{blurring:!0,className:"jukebox-dashboard",dimmed:!t},o.a.createElement(jt,null),o.a.createElement(Mt,{disabled:n,volume:r,onVolumeChange:d}),o.a.createElement(bt,{disabled:n,playbackState:a,onPlay:c,onStop:i,onPause:u,onNext:l,onPrevious:s}),o.a.createElement(st.a,null),o.a.createElement(dt.a,{columns:2},o.a.createElement(dt.a.Column,{width:4},o.a.createElement(gt,{disabled:n,onDrop:m},o.a.createElement(mt.a,{size:"small"},"Current Track"),o.a.createElement(St,null))),o.a.createElement(dt.a.Column,{width:12},o.a.createElement(mt.a,{size:"small"},"Playlist ",o.a.createElement(Kt,{disabled:n,onClear:p})),o.a.createElement(Rt,{disabled:n,images:f,tracks:E,currentTrack:b,onRemoveTrack:k}))))}),Yt=Object(et.DragDropContext)(nt.a)((function(){var e=Object(u.d)((function(e){return e.jukebox})),t=Object(u.d)((function(e){return e.tracklist})),n=Object(u.d)((function(e){return e.track})),r=Object(u.d)((function(e){return ut(e)})),c=Object(u.c)(),i=Object(a.useContext)(g),l=i.isSignedIn,s=i.googleUser,d=!(l&&e.mopidyOnline),m=Object(a.useRef)(),p=Object(a.useRef)();return Object(a.useEffect)((function(){return c($()),function(){c(ne())}}),[c]),l&&s.Zi.id_token!==m.current&&(m.current=s.Zi.id_token,p.current=at.refresh(s,(function(e){c(F(e))})),c(F(m.current))),l||(m.current=void 0,at.clear(p.current),c(H())),o.a.createElement(Gt,{online:e.online,disabled:d,volume:e.volume,playbackState:e.playbackState,onPlay:function(){return c(fe())},onStop:function(){return c(Ee())},onPause:function(){return c(be())},onNext:function(){return c(ke())},onPrevious:function(){return c(ye())},onVolumeChange:function(e){return c(Oe(e))},onDrop:function(e,t){t&&c(W(t.getItem().urls[0]))},onTracklistClear:function(){return c(pe())},trackListImages:r,tracklist:t,currentTrack:n,onRemoveTrack:function(e){return c(Z(e))}})})),Bt=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.compose,Jt=Object(l.createStore)(Qe,Bt(Object(l.applyMiddleware)(Me))),zt=function(){var e=Object(m.useGoogleLogin)({clientId:"383651533710-l72a24lkiulclgqes5mkgt5ujb2rspiu.apps.googleusercontent.com",hostedDomain:"kyanmedia.com"});return o.a.createElement(u.a,{store:Jt},o.a.createElement($e.a,{fluid:!0},o.a.createElement(g.Provider,{value:e},o.a.createElement(y,null,o.a.createElement(d.a,null),o.a.createElement(Yt,null)))))};n(545);i.a.render(o.a.createElement(zt,null),document.getElementById("root"))}},[[287,1,2]]]);
//# sourceMappingURL=main.a1895614.chunk.js.map