(window["webpackJsonpreact-recall"]=window["webpackJsonpreact-recall"]||[]).push([[0],{3:function(e,t){var a=Math.PI/180,n=180/Math.PI,r=[8,15,22],o=function(e){for(var t={},a=0;a<e;a++)t[a]=a;return t},c=function(e){return 360/Object.entries(e).length},i=function(e,t){return e*(1+1/Math.sin(a*(180/t)))},s=function(e,t){return 2*e*(1-1/(1+Math.sin(a*c(t)/2)))},l=function(e){return Object.entries(e).reduce((function(e,t,a){return a<r[0]?(e[0]||(e[0]={}),e[0][t[0]]=t[1]):a<r[0]+r[1]?(e[1]||(e[1]={}),e[1][t[0]]=t[1]):a<r[0]+r[1]+r[2]?(e[2]||(e[2]={}),e[2][t[0]]=t[1]):console.error("No more than 45 datapoints are supported for this component"),e}),[])},d=function(e,t){var a=l(e),n=0,c=0;return n=Object.keys(e).length>8?s(t,o(8)):s(t,e),a.map((function(e,a){0===a?c=t:c=i(n/2,r[a]);return{data:e,outerDiameter:c}}))};e.exports={seedData:o,calculateDataNeededForSecondRing:function(e,t){return Math.ceil(180/(n*Math.asin(1/(1+e/(t/2)))))},calculateSubCircleRadialDisplacement:function(e,t){return e/(Math.sin(a*c(t)/2)+1)},calculateSubCircleFullAngle:c,calculateNewOuterDiameter:i,calculateSubCircleRotationAngle:function(e,t){return Number(e*c(t))},calculateSubCircleDiameter:s,calculateNewRadialDisplacement:function(e,t){return i(e,t)-e},distributeData:l,circleTiers:d,largestDiameter:function(e,t){return d(e,t).map((function(e){return e.outerDiameter})).sort((function(e,t){return t-e}))[0]}}},34:function(e,t,a){e.exports=a(69)},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(31),c=a.n(o),i=(a(39),a(4)),s=a(5),l=a(7),d=a(6),u=a(8),m=a(12),p=a(14),g=(a(40),a(41),a(1)),h=a.n(g),f=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).logout=function(e){h.a.post("http://localhost:5000/logout").then((function(){a.props.updateUserID(void 0)}))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{style:{}},void 0!==this.props.user_id?r.a.createElement("div",{className:"navbar"},r.a.createElement(m.b,{to:"/data_collections/me",className:"navbar-brand"},"React. Recall."),r.a.createElement(m.b,{to:"/data_collections/new",className:"navbar-link"},"New Collection"),r.a.createElement(m.b,{to:"/data_collections/me",className:"navbar-link"},"My Collections"),r.a.createElement("button",{onClick:this.logout,className:"logout-button"},"Logout")):"")}}]),t}(r.a.Component),v=(a(64),a(65),function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={axiosRequestSent:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.index,n=t.tierIndex,o=t.parentDiameter,c=t.diameter,i=t.radialDisplacement,s=t.rotationAngle,l=t.transformOffset,d=t.text,u=t.image_url,m=t.top,p=t.left,g=t.transitionAllowed,h=t.allowTransitions,f=t.preventTransitions,v=t.centerTransition,b=t.removeDataByKey,C=t.backgroundSize,y=t.zIndex,E=t.incrementSuccess,x=t.incrementFailure;t.recordGuess;return r.a.createElement("div",{className:"datapoint-rotation-container",style:{position:"relative",width:"".concat(i,"px"),transform:"translate(".concat(o+l,"px,").concat(o+l,"px) rotate(").concat(s,"deg)"),transformOrigin:"left center",height:0,zIndex:0===i?4:y+1,top:m,left:p}},r.a.createElement("div",{className:"datapoint",style:{backgroundImage:"url(".concat(u,")"),backgroundSize:C,position:"relative",width:"".concat(c,"px"),height:"".concat(c,"px"),transform:"translate(".concat(i-c/2,"px,").concat(-c/2,"px) rotate(-").concat(s,"deg)"),zIndex:y,transition:"transform 0.35s ease-in, width 0.35s ease-in, height 0.35s ease-in",color:"#2C3531",fontWeight:"700",textShadow:"1px 1px #D1E8E2",textAlign:"center",fontSize:"1.5em",textWrap:"wrap"},onClick:g?function(){v(a,n),f()}:function(){}},0===i?r.a.createElement("div",{style:{width:"".concat(c,"px"),height:"".concat(c,"px")}},r.a.createElement("div",{style:{userSelect:"none"}},r.a.createElement("span",{style:{fontSize:"",backgroundColor:"rgba(255,203,154,0.65)",height:"".concat(c/3,"px"),lineHeight:"".concat(c/3,"px")}},"Remember",r.a.createElement("br",null),d.split("").slice(0,16).join("")+"?")),r.a.createElement("button",{style:{width:7*c/18,userSelect:"none",zIndex:y+1,padding:"0.25em",backgroundColor:"#FFCB9A",borderRadius:"0.5em",marginRight:"0.5em"},onClick:function(){b(e.props.id,1),h(),E()}},"I remember"),r.a.createElement("button",{style:{width:7*c/18,userSelect:"none",zIndex:y+1,padding:"0.25em",backgroundColor:"#D9B08C",borderRadius:"0.5em"},onClick:function(){b(e.props.id,0),h(),x()}},"I forgot")):""))}}]),t}(r.a.Component)),b=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.successes,a=e.failures;return r.a.createElement("div",{style:{paddingLeft:"1em",paddingRight:"1em",padding:"0.5em",display:"flex",justifyContent:"space-between",backgroundColor:"#2C3531",color:"#D1E8E2"}},r.a.createElement("div",null,"Correct Guesses: ",t),r.a.createElement("div",null,"Incorrect Guesses: ",a))}}]),t}(r.a.Component),C=a(3),y=a.n(C),E=[8,15,22],x=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).renderContainerCircle=function(e,t,n,o){return r.a.createElement("div",{style:{height:0,width:0}},r.a.createElement("div",{className:"DS-container",style:{position:"relative",width:2*e,height:2*e,backgroundColor:t,zIndex:o||"0",top:"calc(".concat(a.state.parentHeight/2).concat(a.state.parentHeightUnit," - ").concat(a.state.largestDiameter-n,"px)"),left:"calc(".concat(a.state.parentWidth/2).concat(a.state.parentWidthUnit," - ").concat(a.state.largestDiameter-n,"px)")}}))},a.recordGuess=function(e,t,n){a.state.axiosInDataPointsAllowed&&h.a.post("http://localhost:5000/guess-sessions/".concat(a.state.session_id,"/").concat(t,"/add"),{user_id:a.props.user_id,remembered:e}).then((function(e){console.log(),console.log("Guess Test Underway"),console.log(e.data),console.log()}))},a.removeDataByKey=function(e,t){console.log("key: ".concat(e));var n=Object.entries(a.state.data).reduce((function(t,a,n){return a[0]!==e?t[a[0]]=a[1]:(console.log("keyValPair[0]: ".concat(a[0])),console.log("keyValPair[1]: ".concat(a[1]))),t}),{}),r=e;h.a.post("http://localhost:5000/guess-sessions/".concat(a.state.session_id,"/").concat(r,"/add"),{user_id:a.props.user_id,remembered:t}).then((function(e){console.log(),console.log("Guess Test Underway"),console.log(e.data),console.log()})),a.setState({data:n,circleTiers:y.a.circleTiers(n,a.state.diameter),selectedCircleIndex:1===Object.entries(n).length?0:void 0,selectedCircleTierIndex:1===Object.entries(n).length?0:void 0,largestDiameter:y.a.largestDiameter(n,a.state.diameter),axiosInDataPointsAllowed:!0})},a.incrementSuccess=function(){a.setState({successes:a.state.successes+1})},a.incrementFailure=function(){a.setState({failures:a.state.failures+1})},a.centerTransition=function(e,t){a.setState({selectedCircleIndex:e,selectedCircleTierIndex:t})},a.allowTransitions=function(){a.setState({transitionsAllowed:!0})},a.preventTransitions=function(){a.setState({transitionsAllowed:!1})},a.renderCircleRing=function(e,t,n,o,c,i){return r.a.createElement("div",null,Object.entries(t).map((function(s,l){return r.a.createElement(v,{recordGuess:a.recordGuess,axiosInDataPointsAllowed:i,key:"dp-".concat(l),id:s[0],zIndex:1!==c?c:5,parentDiameter:e,diameter:a.state.selectedCircleIndex===l&&a.state.selectedCircleTierIndex===c?2*a.state.circleTiers[0].outerDiameter:o||y.a.calculateSubCircleDiameter(e,t),rotationAngle:y.a.calculateSubCircleRotationAngle(l,t),radialDisplacement:a.state.selectedCircleIndex===l&&a.state.selectedCircleTierIndex===c?0:y.a.calculateNewRadialDisplacement(o/2,E[c])||y.a.calculateSubCircleRadialDisplacement(e,t),text:s[1].memoryText,image_url:s[1].imageURL,transformOffset:n,top:"calc(".concat(a.state.parentHeight/2).concat(a.state.parentHeightUnit," - ").concat(a.state.largestDiameter,"px)"),left:"calc(".concat(a.state.parentWidth/2).concat(a.state.parentWidthUnit," - ").concat(a.state.largestDiameter,"px)"),transitionAllowed:a.state.transitionsAllowed,index:l,tierIndex:c,centred:a.selectedCircleIndex===l&&a.selectedCircleTierIndex===c,centerTransition:a.centerTransition,preventTransitions:a.preventTransitions,allowTransitions:a.allowTransitions,removeDataByKey:a.removeDataByKey,incrementSuccess:a.incrementSuccess,incrementFailure:a.incrementFailure,backgroundSize:"".concat(a.state.selectedCircleIndex===l&&a.state.selectedCircleTierIndex===c?2*a.state.circleTiers[0].outerDiameter:o||y.a.calculateSubCircleDiameter(e,t),"px ").concat(a.state.selectedCircleIndex===l&&a.state.selectedCircleTierIndex===c?2*a.state.circleTiers[0].outerDiameter:o||y.a.calculateSubCircleDiameter(e,t),"px,cover")})})))},a.componentDidMount=function(){var e=a.props.match.params,t=e.collection_id,n=e.session_id;h.a.post("http://localhost:5000/datacollections/".concat(t,"/datapoints"),{user_id:a.props.user_id}).then((function(e){var r=e.data.dataPoints;h.a.post("http://localhost:5000/guess-sessions/".concat(n,"/isvalid"),{user_id:a.props.user_id}).then((function(e){e.data.guessSessionIsValid?(console.log("valid"),h.a.post("http://localhost:5000/guess-sessions/".concat(n,"/guesses"),{user_id:a.props.user_id}).then((function(e){var t=e.data.guesses.map((function(e){return e.dataPoint}));console.log(),console.log("All data points"),console.log(r),console.log(),console.log("Guessed Data Points"),console.log(t);var o=r.filter((function(e){return function(e){var a=!0;return t.forEach((function(t){e._id===t&&(console.log("Element '".concat(t,"' removed!")),a=!1)})),a}(e)})).reduce((function(e,t){return e[t._id]={imageURL:t.imageUrl,memoryText:t.memoryText},e}),{});console.log(),console.log("filteredDataObject"),console.log(o),console.log(),a.setState({data:o,circleTiers:y.a.circleTiers(o,a.props.diameter),selectedCircleIndex:1===Object.entries(o).length?0:void 0,selectedCircleTierIndex:1===Object.entries(o).length?0:void 0,largestDiameter:y.a.largestDiameter(o,a.state.diameter),session_id:n})}))):(console.log("invalid"),h.a.post("http://localhost:5000/guess-sessions/".concat(t,"/add"),{user_id:a.props.user_id}).then((function(e){n=e.data.session_id,console.log("New Session Added");var t=r.reduce((function(e,t){return e[t._id]={imageURL:t.imageUrl,memoryText:t.memoryText},e}),{});console.log(),console.log("newDataObject"),console.log(t),console.log(),a.setState({data:t,circleTiers:y.a.circleTiers(t,a.props.diameter),selectedCircleIndex:1===Object.entries(t).length?0:void 0,selectedCircleTierIndex:1===Object.entries(t).length?0:void 0,largestDiameter:y.a.largestDiameter(t,a.state.diameter),session_id:n})})))}))})).catch((function(e){return console.log("Error: ".concat(e))}))},a.prepareToRedirect=function(){0!==Object.keys(a.state.data).length||a.state.redirecting||a.setState({redirecting:!0})},a.redirectOnFinish=function(){if(a.state.redirecting)return r.a.createElement(p.a,{to:"/data_collections/me"})},a.state={diameter:a.props.diameter,subCircleDiameter:y.a.calculateSubCircleDiameter(a.props.diameter,y.a.circleTiers(a.props.data,a.props.diameter)[0].data),data:a.props.data,circleTiers:y.a.circleTiers(a.props.data,a.props.diameter),largestDiameter:y.a.largestDiameter(a.props.data,a.props.diameter),parentWidth:a.props.parentWidth,parentHeight:a.props.parentHeight,parentWidthUnit:a.props.parentWidthUnit,parentHeightUnit:a.props.parentHeightUnit,transitionsAllowed:!0,successes:0,failures:0,session_id:void 0,axiosInDataPointsAllowed:!0,completeMessage:void 0,redirecting:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.subCircleDiameter,n=t.circleTiers,o=t.largestDiameter,c=t.successes,i=t.failures;return r.a.createElement("div",{className:"DS-offset",style:{}},this.prepareToRedirect(),this.redirectOnFinish(),this.state.completeMessage?this.state.completeMessage:"",n.map((function(t,n){return r.a.createElement("div",{key:"CircleTier: ".concat(n),style:{width:0,height:0}},e.renderCircleRing(t.outerDiameter,t.data,o-t.outerDiameter,Object.keys(t.data).length!==E[n]&&0!==n?a:null,n,e.state.axiosInDataPointsAllowed),e.renderContainerCircle(t.outerDiameter,"#116466",o-t.outerDiameter))})),r.a.createElement(b,{successes:c,failures:i}))}}]),t}(r.a.Component),w=(a(66),a(17)),D=a.n(w),R=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={loginUsername:"",registerUsername:"",email:"",loginPassword:"",registerPassword:"",loginErrorMessage:"",registerErrorMessage:""},a.onChangeLoginUsername=function(e){a.setState({loginUsername:e.target.value})},a.onChangeLoginPassword=function(e){a.setState({loginPassword:e.target.value})},a.onChangeRegisterUsername=function(e){a.setState({registerUsername:e.target.value})},a.onChangeEmail=function(e){a.setState({email:e.target.value})},a.onChangeRegisterPassword=function(e){a.setState({registerPassword:e.target.value})},a.renderRedirect=function(){if(null!==a.props.user_id&&void 0!==a.props.user_id)return r.a.createElement(p.a,{to:"/data_collections/me"})},a.submitLogin=function(e){e.preventDefault();var t={username:a.state.loginUsername,password:a.state.loginPassword};h.a.post("http://localhost:5000/login",t).then((function(e){e.data.authenticated&&a.props.updateUserID(e.data.user_id)})).catch((function(e){return a.setState({errorMessage:e})}))},a.submitRegister=function(e){e.preventDefault();var t={username:a.state.registerUsername,email:a.state.email,password:a.state.registerPassword};h.a.post("http://localhost:5000/users/add",t).then((function(e){if(console.log(e.data.msg),e.data.success){console.log("Successful user addition, logging in...");var n={username:t.username,password:t.password};h.a.post("http://localhost:5000/login",n).then((function(e){e.data.authenticated}))}else a.setState({errorMessage:"Invalid email, username or password."})})).catch((function(e){return a.setState({errorMessage:e})}))},a.componentDidMount=function(){D()(".message a").click((function(){D()("form").animate({height:"toggle",opacity:"toggle"},"slow")}))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"login-page"},this.renderRedirect(),this.state.loginErrorMessage?r.a.createElement("div",null,this.state.loginErrorMessage):"",r.a.createElement("div",{className:"form"},r.a.createElement("form",{className:"register-form"},r.a.createElement("input",{type:"text",placeholder:"username",name:"username",onChange:this.onChangeRegisterUsername,value:this.state.registerUsername}),r.a.createElement("input",{type:"password",placeholder:"password",name:"password",onChange:this.onChangeRegisterPassword,value:this.state.registerPassword}),r.a.createElement("input",{type:"text",placeholder:"email address",name:"email",onChange:this.onChangeEmail,value:this.state.email}),r.a.createElement("button",{type:"button",onClick:this.submitRegister},"create"),r.a.createElement("p",{className:"message"},"Already registered? ",r.a.createElement("a",{href:"#"},"Sign In"))),r.a.createElement("form",{className:"login-form"},r.a.createElement("input",{type:"text",placeholder:"username",name:"username",onChange:this.onChangeLoginUsername,value:this.state.loginUsername}),r.a.createElement("input",{type:"password",placeholder:"password",name:"password",onChange:this.onChangeLoginPassword,value:this.state.loginPassword}),r.a.createElement("button",{type:"button",onClick:this.submitLogin},"login"),r.a.createElement("p",{className:"message"},"Not registered? ",r.a.createElement("a",{href:"#"},"Create an account")))))}}]),t}(r.a.Component),_=(a(67),function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={collections:[],metrics:{},redirectURL:{},loading:!0},a.componentDidMount=function(){h.a.post("http://localhost:5000/datacollections",{user_id:a.props.user_id}).then((function(e){a.setState({collections:e.data.filter((function(e){return 0!==e.dataPoints.length})).map((function(e,t){return{collectionName:e.collectionName,collection_id:e._id,highlighted:!1,index:t}})),loading:!1})})).catch((function(e){return console.log("".concat(e))}))},a.renderRedirectToPractice=function(){if(void 0!==a.state.redirectURL.collectionID)return r.a.createElement(p.a,{to:"/practice/".concat(a.state.redirectURL.collectionID,"/").concat(a.state.redirectURL.sessionID?a.state.redirectURL.sessionID:"new")})},a.renderRedirect=function(){null===a.props.user_id||a.props.user_id},a.beginGuessSession=function(e){h.a.post("http://localhost:5000/guess-sessions/data-collection/".concat(e),{user_id:a.props.user_id}).then((function(t){var n=null;void 0!==t.data.guessSession&&!1!==t.data.guessSession&&(n=t.data.guessSession._id),a.setState({redirectURL:{collectionID:e,sessionID:n}})}))},a.getMetrics=function(e,t){h.a.post("http://localhost:5000/datacollections/metrics/".concat(t),{user_id:a.props.user_id}).then((function(t){a.setState({collections:a.state.collections.map((function(t){var a=!1;return t.index===e&&(a=!0),{collectionName:t.collectionName,collection_id:t.collection_id,highlighted:a,index:t.index}})),metrics:{collectionName:a.state.collections.filter((function(t){return t.index===e}))[0].collectionName,bestRecall:t.data.worstRecall.averageRecall>t.data.bestRecall.averageRecall?"No data available":"Best Recall : ".concat(t.data.bestRecall.memoryText," ").concat(t.data.bestRecall.averageRecall,"%"),averageRecall:t.data.worstRecall.averageRecall>t.data.bestRecall.averageRecall?"":"Average Recall : ".concat(t.data.averageRecall,"%"),worstRecall:t.data.worstRecall.averageRecall>t.data.bestRecall.averageRecall?"":"Worst Recall : ".concat(t.data.worstRecall.memoryText," ").concat(t.data.worstRecall.averageRecall,"%")}})})).catch((function(e){return console.log("".concat(e))}))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.renderRedirect(),this.renderRedirectToPractice(),r.a.createElement("div",{className:"metrics-display"},r.a.createElement("div",{style:this.state.metrics.collectionName?{}:{padding:0},className:"recall recall-title"},this.state.metrics.collectionName?this.state.metrics.collectionName.toUpperCase():""),r.a.createElement("div",{style:this.state.metrics.collectionName?{}:{padding:0},className:"recall"},this.state.metrics.averageRecall),r.a.createElement("div",{style:this.state.metrics.collectionName?{}:{padding:0},className:"recall"},this.state.metrics.bestRecall),r.a.createElement("div",{style:this.state.metrics.collectionName?{}:{padding:0},className:"recall"},this.state.metrics.worstRecall)),0!==this.state.collections.length||this.state.loading?"":r.a.createElement("div",{className:"make-collection-link-container"},r.a.createElement(m.b,{className:"make-collection-link",to:"/data_collections/new"}," Make a collection! ")),this.state.collections.map((function(t,a){return r.a.createElement("div",{key:"collection".concat(a),className:"data-collection ".concat(t.highlighted?"highlighted-collection":"")},r.a.createElement("div",{className:"data-collection-name"},t.collectionName),r.a.createElement("div",{onClick:function(){return e.getMetrics(a,t.collection_id)},className:"data-collection-metrics"},"Metrics"),r.a.createElement("div",{onClick:function(){return e.beginGuessSession(t.collection_id)},className:"practice"},"Practice"))})))}}]),t}(r.a.Component)),N=(a(68),function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={collectionName:"",collectionID:"",memoryText:"",imageURL:"",diameter:100},a.addToCollection=function(){h.a.post("http://localhost:5000/datacollections/".concat(a.state.collectionID,"/add"),{user_id:a.props.user_id,memoryText:a.state.memoryText,imageUrl:a.state.imageURL}).then((function(e){a.setState({memoryText:"",imageURL:""})}))},a.onChangeMemoryText=function(e){a.setState({memoryText:e.target.value})},a.onChangeImageURL=function(e){a.setState({imageURL:e.target.value})},a.onChangeCollectionName=function(e){a.setState({collectionName:e.target.value})},a.collectionNameChosen=function(e){e.preventDefault(),D()("form").animate({height:"toggle",opacity:"toggle"},"slow"),h.a.post("http://localhost:5000/datacollections/add",{user_id:a.props.user_id,collectionName:a.state.collectionName}).then((function(e){a.setState({collectionID:e.data.collection_id})}))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"login-page"},r.a.createElement("div",{className:"form"},r.a.createElement("form",{className:"register-form"},r.a.createElement("h3",null,this.state.collectionName),r.a.createElement("input",{type:"text",placeholder:"Memory text",name:"memoryText",onChange:this.onChangeMemoryText,value:this.state.memoryText}),r.a.createElement("input",{type:"text",placeholder:"Image URL",name:"imageURL",onChange:this.onChangeImageURL,value:this.state.imageURL}),r.a.createElement("div",{className:"demo-container"},r.a.createElement("div",{className:"demo-datapoint",style:{backgroundImage:"url(".concat(this.state.imageURL,")")}})),r.a.createElement("button",{type:"button",onClick:this.addToCollection,style:{marginBottom:"1em"}},"Add To Collection"),r.a.createElement("button",{type:"button",onClick:this.submitCollection},"Submit Collection")),r.a.createElement("form",{className:"login-form"},r.a.createElement("h3",null,"New  Collection"),r.a.createElement("input",{type:"text",placeholder:"Name your collection!",name:"collectionName",onChange:this.onChangeCollectionName,value:this.state.collectionName}),r.a.createElement("button",{type:"button",onClick:this.collectionNameChosen},"Continue"))))}}]),t}(r.a.Component)),I={Placeholder:""},S=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).state={user_id:void 0},a.updateUserID=function(e){a.setState({user_id:e})},a.renderLoginReturn=function(){if(void 0===a.state.user_id)return r.a.createElement(p.a,{to:"/login"})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(m.a,null,this.renderLoginReturn(),r.a.createElement("div",{className:"App",style:{backgroundColor:"#D1E8E2"}},r.a.createElement(f,{user_id:this.state.user_id,updateUserID:this.updateUserID}),r.a.createElement(p.b,{path:"/login",exact:!0,component:function(){return r.a.createElement(R,{user_id:e.state.user_id,updateUserID:e.updateUserID})}}),r.a.createElement(p.b,{path:"/data_collections/me",exact:!0,component:function(){return r.a.createElement(_,{user_id:e.state.user_id,updateUserID:e.updateUserID})}}),r.a.createElement(p.b,{path:"/data_collections/new",exact:!0,component:function(){return r.a.createElement(N,{user_id:e.state.user_id})}}),r.a.createElement(p.b,{path:"/practice/:collection_id/:session_id",component:function(t){var a=t.match;return r.a.createElement(x,{match:a,user_id:e.state.user_id,updateUserID:e.updateUserID,diameter:140,data:I,parentWidth:100,parentHeight:100,parentWidthUnit:"vw",parentHeightUnit:"vh"})}})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.26affc02.chunk.js.map