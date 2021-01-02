import renderHTML from 'react-render-html';

const scriptContent = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-174228962-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-174228962-1');
</script>
`

const GaTrackingScript = () => {

  return (
    <>
      {renderHTML(scriptContent)}
      {/* <noscript dangerouslySetInnerHTML={{
        __html: `
          <img height="1" width="1" style="display:none;" src="https://www.facebook.com/tr?id=281526296450181&ev=PageView&noscript=1" />
        ` }} />
      <script dangerouslySetInnerHTML={{
        __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '281526296450181');
            fbq('track', 'PageView');
          `
      }}></script> */}
    </>
  )
}

// (<Markup content={`
// <!-- Google Tag Manager Script -->
// <noscript>
//   <img height="1" width="1" style="display:none;" src="https://www.facebook.com/tr?id=281526296450181&ev=PageView&noscript=1" />
// </noscript>
// <script type="text/javascript">
//   !function(f,b,e,v,n,t,s)
//   {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
//       n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
//   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//   n.queue=[];t=b.createElement(e);t.async=!0;
//   t.src=v;s=b.getElementsByTagName(e)[0];
//   s.parentNode.insertBefore(t,s)}(window, document,'script',
//   'https://connect.facebook.net/en_US/fbevents.js');
//   fbq('init', '281526296450181');
//   fbq('track', 'PageView');
// </script>
//   `} />)

export default GaTrackingScript