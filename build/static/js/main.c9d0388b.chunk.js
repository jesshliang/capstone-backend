(this["webpackJsonpcapstone-frontend"]=this["webpackJsonpcapstone-frontend"]||[]).push([[0],{31:function(e,t,n){e.exports=n(94)},36:function(e,t,n){},83:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(28),c=n.n(l),o=(n(36),n(2)),i=n(29),s=n.n(i),u=n(6),m=n.n(u),p=(n(83),function(e){return r.a.createElement("div",{id:"homepage"},r.a.createElement("header",null,r.a.createElement("h1",null,"the travel mApp")),r.a.createElement("main",null,r.a.createElement(s.a,{authCallback:function(t,n){console.log({err:t},{data:n}),console.log(n.screen_name),m()({method:"post",url:"https://the-travel-mapp.herokuapp.com/users",params:{username:n.screen_name},headers:{"Access-Control-Allow-Origin":"*"}}).then((function(t){e.setUserCallback(n.screen_name),e.setUserInformationCallback(t.data.trips)})).catch((function(e){console.log(e)}))},consumerKey:"luVu8KaYbTvMVCVkgs0wLT48J",consumerSecret:"ySQwiAO5SUC64bbv8tVitaBzoqbY9KfZbjiOj9nekl21CLK6RS",callbackUrl:"https://the-travel-mapp.herokuapp.com/"})),r.a.createElement("footer",null,r.a.createElement("p",null,"Jessica made this.")))}),d=n(5),f=n(30),h=n(8),E=n.n(h),b=(n(84),n(85),{width:"100vw",height:"65vh",overflow:"hidden"}),g=function(e){var t=e.userInformation,n=e.coordinates,l=Object(a.useState)(null),c=Object(o.a)(l,2),i=c[0],s=c[1],u=Object(a.useState)([]),m=Object(o.a)(u,2),p=m[0],d=(m[1],Object(a.useRef)(null));return Object(a.useEffect)((function(){E.a.accessToken="pk.eyJ1IjoiamVzc2ljYWxpYW5nIiwiYSI6ImNrY2I3N25wazFpOGEzMHF0dHY3aHNkOWUifQ.ItSK1BDpYydbUVyDPvdj6A";i||function(e){var a=e.setMap,r=e.mapContainer,l=new E.a.Map({container:r.current,style:"mapbox://styles/jessicaliang/ckcv0sd9t00861irp6uuv5xh6",center:[0,16],zoom:1});l.on("load",(function(){a(l),l.resize(),console.log({coordinates:n});for(var e=0;e<n.length;e++)for(var r=0;r<n[e].length;r++){var c=document.createElement("div");c.style.backgroundImage="url(".concat(n[e][r][1],")"),c.style.width="75px",c.style.height="75px",c.className="marker";var o=new E.a.Popup({offset:40}).setText(t[e].places[r][0].toUpperCase());p.push(new E.a.Marker(c).setLngLat(n[e][r][0]).setPopup(o).addTo(l))}}))}({setMap:s,mapContainer:d})}),[i]),Object(a.useEffect)((function(){if(i){console.log({coordinates:n}),console.log({userInformation:t}),p.forEach((function(e){e.remove()})),p.length=0,console.log({mapMarkers:p});for(var e=0;e<n.length;e++)for(var a=0;a<n[e].length;a++){var r=document.createElement("div");r.style.backgroundImage="url(".concat(n[e][a][1],")"),r.style.width="75px",r.style.height="75px",r.className="marker";var l=new E.a.Popup({offset:40}).setText(t[e].places[a][0].toUpperCase());p.push(new E.a.Marker(r).setLngLat(n[e][a][0]).setPopup(l).addTo(i))}}}),[n,i]),r.a.createElement("div",{ref:function(e){return d.current=e},style:b})},v=(n(86),function(e){return r.a.createElement("div",{className:"map-container"},r.a.createElement(g,e))}),C=n(14),k=(n(87),function(e){var t=e.index,n=e.title,l=e.date,c=e.tripPlaces,i=e.editTripCallback,s=e.setToggleEdit,u=Object(a.useState)({title:n,date:l}),m=Object(o.a)(u,2),p=m[0],f=m[1],h=Object(a.useState)(c),E=Object(o.a)(h,2),b=E[0],g=E[1],v=function(e){var t=Object(C.a)({},p);t[e.target.name]=e.target.value,f(t)},k=function(e){e.preventDefault(),s(!1),console.log(b),console.log(p),i(p,b,t)};return r.a.createElement("div",{className:"edit_trip_form_container"},r.a.createElement("h2",null,"Edit"),r.a.createElement("form",{onSubmit:k},r.a.createElement("section",{className:"edit_trip_form_container--title"},r.a.createElement("label",null,r.a.createElement("strong",null,"Title "),r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:p.title,name:"title",onChange:v,maxLength:"26",required:!0}))),r.a.createElement("section",{className:"edit_trip_form_container--date"},r.a.createElement("label",null,r.a.createElement("strong",null,"Date "),r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:p.date,name:"date",onChange:v,pattern:"\\d{1,2}-\\d{4}",maxLength:"7",required:!0}))),r.a.createElement("section",{className:"edit_trip_form_container--places"},r.a.createElement("label",null,r.a.createElement("strong",null,"Places "),r.a.createElement("br",null),b.map((function(e,t){return r.a.createElement("section",{key:t},r.a.createElement("input",{type:"text",value:e[0],onChange:function(e){return function(e,t){var n=Object(d.a)(b);n[t][0]=e.target.value,g(n)}(e,t)},maxLength:"26",required:!0}),r.a.createElement("input",{type:"text",value:e[1],onChange:function(e){return function(e,t){var n=Object(d.a)(b);n[t][1]=e.target.value,g(n)}(e,t)},maxLength:"100",required:!0}),r.a.createElement("button",{onClick:function(e){return function(e,t){e.preventDefault();var n=Object(d.a)(b);n.splice(t,1),g(n)}(e,t)}},"X"))})))),r.a.createElement("section",{className:"edit_trip_form_container--buttons"},r.a.createElement("button",{onClick:function(e){e.preventDefault();var t=Object(d.a)(b);t.push(["",""]),g(t)}},"Add Place"),r.a.createElement("button",{onClick:function(){return s(!1)}},"Close"),r.a.createElement("input",{type:"submit",value:"Save",onSubmit:k}))))}),O=(n(88),function(e){var t=e.index,n=e.title,l=e.date,c=e.places,i=e.editTripCallback,s=e.deleteTripCallback,u=Object(a.useState)(!1),m=Object(o.a)(u,2),p=m[0],d=m[1],f=c.map((function(e,t){return r.a.createElement("li",{key:t,className:"trip_listing_container--place"},r.a.createElement("img",{src:e[1],alt:e[0]}),e[0])}));return r.a.createElement("section",{className:"trip_listing_container"},!1===p?r.a.createElement("section",null,r.a.createElement("section",{className:"trip_list_container--header"},r.a.createElement("h2",null,n),r.a.createElement("p",{className:"trip_listing_container--date"},r.a.createElement("em",null,l))),r.a.createElement("h3",null,"Places"),r.a.createElement("section",{className:"trip_listing_container--places-container"},f),r.a.createElement("section",{className:"trip_listing_container--buttons"},r.a.createElement("button",{onClick:function(){return d(!0)}},"Edit"),r.a.createElement("button",{onClick:function(){window.confirm("Are you sure you wish to delete this item?")&&s(t)}},"Delete"))):r.a.createElement(k,{key:t,index:t,title:n,date:l,tripPlaces:c,editTripCallback:i,setToggleEdit:d}))}),T=(n(89),function(e){var t;return t=e.userInformation.map((function(t,n){return r.a.createElement(O,{key:n,index:n,title:t.title,date:t.date,places:t.places,editTripCallback:e.editTripCallback,deleteTripCallback:e.deleteTripCallback})})),r.a.createElement("div",{className:"all-trips-container"},r.a.createElement("h1",null,"Your Trips"),t)}),j=(n(90),function(e){var t=Object(a.useState)({title:"",month:"",year:""}),n=Object(o.a)(t,2),l=n[0],c=n[1],i=Object(a.useState)([["",""]]),s=Object(o.a)(i,2),u=s[0],m=s[1],p=Object(a.useState)(!1),f=Object(o.a)(p,2),h=f[0],E=f[1],b=function(e){var t=Object(C.a)({},l);t[e.target.name]=e.target.value,c(t)},g=function(t){t.preventDefault(),console.log(u),console.log(l),e.addNewTripCallback(l,u),c({title:"",month:"",year:""}),m([["",""]])};return r.a.createElement("div",null,h?r.a.createElement("div",{className:"new_trip_form_container"},r.a.createElement("h2",null,"Add a New Trip"),r.a.createElement("form",{onSubmit:g},r.a.createElement("section",{className:"new_trip_form_container--title"},r.a.createElement("label",null,r.a.createElement("strong",null,"Title "),r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:l.title,name:"title",onChange:b,maxLength:"26",required:!0}))),r.a.createElement("section",{className:"new_trip_form_container--date"},r.a.createElement("label",null,r.a.createElement("strong",null,"Date "),r.a.createElement("br",null),r.a.createElement("input",{type:"text",placeholder:"month",value:l.month,name:"month",onChange:b,pattern:"\\d*",maxLength:"2",required:!0})," /",r.a.createElement("input",{type:"text",placeholder:"year",value:l.year,name:"year",onChange:b,pattern:"\\d*",maxLength:"4",required:!0}))),r.a.createElement("section",{className:"new_trip_form_container--places"},r.a.createElement("label",null,r.a.createElement("strong",null,"Places "),r.a.createElement("br",null),u.map((function(e,t){return r.a.createElement("section",{key:t},r.a.createElement("input",{type:"text",value:e[0],onChange:function(e){return function(e,t){var n=Object(d.a)(u);n[t][0]=e.target.value,m(n)}(e,t)},maxLength:"26",required:!0}),r.a.createElement("input",{type:"text",value:e[1],onChange:function(e){return function(e,t){var n=Object(d.a)(u);n[t][1]=e.target.value,m(n)}(e,t)},maxLength:"100",required:!0}),r.a.createElement("button",{onClick:function(e){return function(e,t){e.preventDefault();var n=Object(d.a)(u);n.splice(t,1),m(n)}(e,t)}},"X"))})))),r.a.createElement("section",{className:"new_trip_form_container--buttons"},r.a.createElement("button",{onClick:function(e){e.preventDefault();var t=Object(d.a)(u);t.push(["",""]),m(t)}},"Add Place"),r.a.createElement("input",{type:"submit",value:"Add New Trip",onSubmit:g}),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){return E(!1)}},"Cancel")))):r.a.createElement("button",{onClick:function(){return E(!0)},className:"new_trip_form_button"},"Add New Trip"))}),y=(n(91),function(e){var t=Object(a.useState)([]),n=Object(o.a)(t,2),l=(n[0],n[1]),c=Object(a.useState)([]),i=Object(o.a)(c,2),s=i[0],u=i[1];Object(a.useEffect)((function(){for(var t=[],n=0;n<e.userInformation.length;n++){t.push([]);var a,r=Object(f.a)(e.userInformation[n].places);try{for(r.s();!(a=r.n()).done;){var c=a.value;t[n].push(escape(c[0]))}}catch(h){r.e(h)}finally{r.f()}}l(t);for(var o=[],i=[],s=function(n){o.push([]);var a=t[n].map((function(t,a){return m.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(t,".json?access_token=pk.eyJ1IjoiamVzc2ljYWxpYW5nIiwiYSI6ImNrY2I3N25wazFpOGEzMHF0dHY3aHNkOWUifQ.ItSK1BDpYydbUVyDPvdj6A")).then((function(t){o[n].push([t.data.features[0].center,e.userInformation[n].places[a][1]])})).catch((function(e){console.log(e)}))}));i.push.apply(i,Object(d.a)(a))},p=0;p<t.length;p++)s(p);Promise.all(i).then((function(){u(o)}))}),[e.userInformation]);return r.a.createElement("div",{id:"dashboard"},r.a.createElement("header",null,r.a.createElement("section",null,e.currentUser),r.a.createElement("h1",null,"the travel mApp"),r.a.createElement("section",null,r.a.createElement("button",{onClick:e.onLogoutCallback},"Log Out"))),r.a.createElement("main",{id:"dashboard__main_content"},r.a.createElement(v,{userInformation:e.userInformation,coordinates:s}),r.a.createElement(j,{addNewTripCallback:function(t,n){m()({method:"post",url:"https://the-travel-mapp.herokuapp.com/trips",params:{username:e.currentUser,date:"".concat(t.month,"-").concat(t.year),title:t.title,places:n},headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, X-Auth-Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"}}).then((function(t){console.log(t.data.trips),e.setUserInformationCallback(t.data.trips)})).catch((function(e){console.log(e)}))}}),r.a.createElement(T,{userInformation:e.userInformation,editTripCallback:function(t,n,a){console.log(t),console.log(n),console.log(a),m()({method:"patch",url:"https://the-travel-mapp.herokuapp.com/trips",params:{index:a,username:e.currentUser,date:t.date,title:t.title,places:n},headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, X-Auth-Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"}}).then((function(t){console.log(t.data.trips),e.setUserInformationCallback(t.data.trips)})).catch((function(e){console.log(e)}))},deleteTripCallback:function(t){m()({method:"delete",url:"https://the-travel-mapp.herokuapp.com/trips",data:{username:e.currentUser,key:t},headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, PUT, DELETE, OPTIONS","Access-Control-Allow-Headers":"Origin, X-Auth-Token, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"}}).then((function(t){console.log(t.data.trips),e.setUserInformationCallback(t.data.trips)})).catch((function(e){console.log(e)}))}})))}),_=(n(92),n(93),function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(null),i=Object(o.a)(c,2),s=i[0],u=i[1];return r.a.createElement("div",null,""===n&&r.a.createElement(p,{setUserCallback:l,setUserInformationCallback:u}),""!==n&&null!==s&&r.a.createElement(y,{onLogoutCallback:function(e){e.preventDefault(),l("")},currentUser:n,setUserInformationCallback:u,userInformation:s}))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.c9d0388b.chunk.js.map