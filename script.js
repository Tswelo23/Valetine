(function(){
  var yes=document.getElementById('yes'), no=document.getElementById('no');
  var okRes=document.getElementById('okRes'), noRes=document.getElementById('noRes');
  function lock(){yes.disabled=true;no.disabled=true;}
  function hearts(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var set=['❤️','💖','💕','💗','💘'];
    for(var i=0;i<22;i++){(function(i){setTimeout(function(){
      var h=document.createElement('div');h.className='heart';
      h.textContent=set[Math.floor(Math.random()*set.length)];
      h.style.left=Math.random()*95+'vw';h.style.fontSize=(Math.random()*24+18)+'px';
      document.body.appendChild(h);
      var a=h.animate([{transform:'translateY(0)',opacity:.9},{transform:'translateY(-110vh)',opacity:0}],
        {duration:(Math.random()*2+3)*1000,easing:'ease-out'});
      a.onfinish=function(){h.remove();};
    },i*140);})(i);}
  }
  function chime(){
    try{
      var C=window.AudioContext||window.webkitAudioContext, ctx=new C(), t=ctx.currentTime;
      [523.25,659.25,783.99].forEach(function(f,i){
        var o=ctx.createOscillator(), g=ctx.createGain();
        o.frequency.value=f;o.connect(g);g.connect(ctx.destination);
        g.gain.setValueAtTime(0.2,t+i*.15);g.gain.exponentialRampToValueAtTime(0.01,t+i*.15+.4);
        o.start(t+i*.15);o.stop(t+i*.15+.4);
      });
    }catch(e){}
  }
  yes.addEventListener('click',function(){
    noRes.style.display='none';okRes.style.display='block';lock();
    yes.textContent='Yes ❤️';hearts();chime();
  });
  no.addEventListener('click',function(){
    okRes.style.display='none';noRes.style.display='block';lock();
  });
  var dateYes=document.getElementById('dateYes'), dateNo=document.getElementById('dateNo'), dateRes=document.getElementById('dateRes');
  function dateAnswer(text,celebrate){
    dateYes.disabled=true;dateNo.disabled=true;
    dateRes.textContent=text;dateRes.style.display='block';
    if(celebrate){hearts();chime();}
  }
  dateYes.addEventListener('click',function(){
    dateAnswer('It’s a date, Oratile! I’ll message you to plan it. ❤️',true);
  });
  dateNo.addEventListener('click',function(){
    dateAnswer('That’s okay, Oratile. Thank you for being honest with me.',false);
  });
})();