(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();

  var burger=document.querySelector('.burger'), mm=document.getElementById('mm');
  if(burger&&mm){
    burger.addEventListener('click',function(){
      var open=mm.classList.toggle('open');
      burger.setAttribute('aria-expanded',open);
    });
    mm.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){ mm.classList.remove('open'); });
    });
  }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var form=document.getElementById('quoteForm');
  if(!form) return;
  var statusEl=document.getElementById('formStatus'), btn=document.getElementById('submitBtn');

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    statusEl.className='form-status'; statusEl.textContent='';
    if(!form.checkValidity()){
      statusEl.className='form-status err';
      statusEl.textContent='Please fill in your name, phone, service and details.';
      return;
    }
    btn.disabled=true; btn.textContent='Sending\u2026';
    try{
      var res=await fetch(form.action,{
        method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form)
      });
      if(res.ok){
        form.reset();
        statusEl.className='form-status ok';
        statusEl.textContent='Thanks \u2014 your request has been sent. We will be in touch shortly.';
        btn.textContent='Request sent';
      } else { throw new Error('Send failed'); }
    } catch(err){
      console.error('LCW quote form submission failed:', err);
      statusEl.className='form-status err';
      statusEl.innerHTML='Sorry, that did not send. Please call <a href="tel:+447447898088" style="color:inherit">07447 898088</a> or email <a href="mailto:lcwheating@gmail.com" style="color:inherit">lcwheating@gmail.com</a>.';
      btn.disabled=false; btn.textContent='Send request';
    }
  });
})();
