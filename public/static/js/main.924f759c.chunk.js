(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a(55)},30:function(e,t,a){},50:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),i=a.n(c),o=(a(30),a(4)),s=a(5),l=a(7),u=a(6),d=a(8),f=a(2),h=a.n(f),m=(a(50),"http://kicker.www109.lan/api"),k=(a(10),a(22),a(23),a(3)),p=a.n(k),v=a(9),g=a(12),b=function(e){return r.a.createElement("div",{className:"field_root"},r.a.createElement("div",{className:"field_title"},e.title),r.a.createElement("input",{className:"field_input",value:e.value,onChange:e.onChange,type:e.type?e.type:"text"}))},w=m,E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isSignIn:!0,login:"",firstName:"",secondName:"",password:""},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"send",value:function(){var e=Object(v.a)(p.a.mark(function e(){var t,a,n,r,c,i,o,s,l,u;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state,a=t.isSignIn,n=t.login,r=t.firstName,c=t.secondName,i=t.password,a){e.next=9;break}return e.next=4,h()({method:"post",url:"".concat(w,"/auth/").concat(n),withCredentials:!0,data:{password:i}});case 4:o=e.sent,s=o.data,this.props.onLogin(s.user),e.next=14;break;case 9:return e.next=11,h()({method:"post",url:"".concat(w,"/user"),withCredentials:!0,data:{id:Object(g.v4)(),login:n,password:i,firstName:r,lastName:c}});case 11:l=e.sent,u=l.data,this.props.onLogin(u.user);case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.isSignIn,n=t.login,c=t.firstName,i=t.secondName,o=t.password;return r.a.createElement("div",{className:"auth_root"},r.a.createElement("div",{className:"auth_togglerWrapper"},r.a.createElement("div",{onClick:function(){e.setState({isSignIn:!0})},style:a?{fontWeight:"bold"}:null,className:"auth_toggler"},"Sign in"),r.a.createElement("div",{onClick:function(){e.setState({isSignIn:!1})},style:a?null:{fontWeight:"bold"},className:"auth_toggler"},"Sign up")),a?r.a.createElement("div",{className:"auth_reg"},r.a.createElement(b,{title:"login",value:n,onChange:function(t){e.setState({login:t.target.value})}}),r.a.createElement(b,{title:"password",value:o,type:"password",onChange:function(t){e.setState({password:t.target.value})}})):r.a.createElement("div",{className:"auth_reg"},r.a.createElement(b,{title:"login",value:n,onChange:function(t){e.setState({login:t.target.value})}}),r.a.createElement(b,{title:"first name",value:c,onChange:function(t){e.setState({firstName:t.target.value})}}),r.a.createElement(b,{title:"second name",value:i,onChange:function(t){e.setState({secondName:t.target.value})}}),r.a.createElement(b,{title:"password",value:o,type:"password",onChange:function(t){e.setState({password:t.target.value})}})),r.a.createElement("button",{onClick:this.send.bind(this)},"send"))}}]),t}(r.a.Component),y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={redAttack:null,redDef:null,blackAttack:null,blackDef:null},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"join",value:function(){var e=Object(v.a)(p.a.mark(function e(t,a){var n,r;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({method:"post",url:"".concat(m,"/game"),withCredentials:!0,data:{role:t,side:a}});case 2:n=e.sent,r=n.data,console.log(r);case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}()},{key:"fetchData",value:function(){var e=Object(v.a)(p.a.mark(function e(){var t,a,n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h()({method:"get",url:"".concat(m,"/game"),withCredentials:!0});case 2:t=e.sent,a=t.data,n=a.players,this.setPlayers(n);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"setPlayers",value:function(e){var t={red:{attack:null,def:null},black:{attack:null,def:null}};e.forEach(function(e){"BLACK"===e.side?"attack"===e.role?t.black.attack=e:t.black.def=e:"attack"===e.role?t.red.attack=e:t.red.def=e}),this.setState({redAttack:t.red.attack,redDef:t.red.def,blackAttack:t.black.attack,blackDef:t.black.def})}},{key:"render",value:function(){var e=this,t=this.state,a=t.redAttack,n=t.redDef,c=t.blackAttack,i=t.blackDef;return r.a.createElement("div",{className:"game_root"},r.a.createElement("div",{className:"game_title"},"kicker.lan"),r.a.createElement("button",{disabled:!!a,onClick:function(){e.join("attack","RED")}},"Join (red attack)"),r.a.createElement("button",{disabled:!!n,onClick:function(){e.join("defense","RED")}},"Join (red def)"),r.a.createElement("button",{disabled:!!c,onClick:function(){e.join("attack","BLACK")}},"Join (black attack)"),r.a.createElement("button",{disabled:!!i,onClick:function(){e.join("defense","BLACK")}},"Join (black def)"))}}]),t}(r.a.Component),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={user:null},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;try{h()({method:"get",url:m+"/auth",withCredentials:!0}).then(function(t){var a=t.data;e.setState({user:a.user})})}catch(t){console.log("err")}}},{key:"onLogin",value:function(e){this.setState({user:e})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},this.state.user?r.a.createElement(y,{user:this.state.user}):r.a.createElement(E,{onLogin:this.onLogin.bind(this)}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.924f759c.chunk.js.map