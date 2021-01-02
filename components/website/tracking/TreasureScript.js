import renderHTML from 'react-render-html';

const scriptContent = `
  <!-- Treasure Tracking Script -->
  <script type="text/javascript">
    !function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.1/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);

    // Configure an instance for your database
    var td = new Treasure({
      host: 'tokyo.in.treasuredata.com',
      writeKey: '161/d937851284cc7fc993c3d90d41253634df4f86e0',
      database: 'ymvn_log',
      startInSignedMode: true
    });

    // Enable cross-domain tracking
    td.set('$global', 'td_global_id', 'td_global_id');

    // track pageview information to 'ymvn_web_log' table
    td.trackEvent('ymvn_web_log', {td_url: document.location.href});

    // Enable click tracking
    td.trackClicks();  

    var successCallback = function(td_global_id) {
      console.log(new Date());
      console.log(td)
      console.log('td_global_id:', td_global_id)
      console.log('td_client_id:', td.client.track.uuid);

      window._td_global_id = (td_global_id instanceof Object) ? "" : td_global_id.toString();
      window._td_client_id = td.client.track.uuid;

      // $('.global_id input[type="hidden"]').val(td_global_id);
      // $('.td_uuid input[type="hidden"]').val(td.client.track.uuid);
    };
    var errorCallback = function(err) {
      console.log(err);
    };
    var afterPageviewCallback = function(td_global_id) {
      console.log(new Date());
      console.log(td)
      console.log('td_global_id:', td_global_id);
      console.log('td_client_id:', td.client.track.uuid);

      window._td_global_id = (td_global_id instanceof Object) ? "" : td_global_id.toString();
      window._td_client_id = td.client.track.uuid;
      
      td.fetchGlobalID(successCallback, errorCallback,true);
    };
    td.trackPageview('ymvn_customerinfo_webregistrationform', afterPageviewCallback);
  </script>
`

const TreasureScript = () => {

  return (
    <>
      {renderHTML(scriptContent)}
      {/* <script type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          !function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.1/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);

          // Configure an instance for your database
          var td = new Treasure({
            host: 'tokyo.in.treasuredata.com',
            writeKey: '161/d937851284cc7fc993c3d90d41253634df4f86e0',
            database: 'ymvn_log',
            startInSignedMode: true
          });

          // Enable cross-domain tracking
          td.set('$global', 'td_global_id', 'td_global_id');

          // track pageview information to 'ymvn_web_log' table
          td.trackEvent('ymvn_web_log', {td_url: document.location.href});


          // Enable click tracking
          td.trackClicks();  
        `}} /> */}
    </>
  )
}

// (
//   <Markup content={`
//     <!-- Treasure Tracking Script -->
//     <script type="text/javascript">
//       !function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["blockEvents","unblockEvents","setSignedMode","setAnonymousMode","resetUUID","addRecord","fetchGlobalID","set","trackEvent","trackPageview","trackClicks","ready"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.1/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);

//       // Configure an instance for your database
//       var td = new Treasure({
//         host: 'tokyo.in.treasuredata.com',
//         writeKey: '161/d937851284cc7fc993c3d90d41253634df4f86e0',
//         database: 'ymvn_log',
//         startInSignedMode: true
//       });

//       // Enable cross-domain tracking
//       td.set('$global', 'td_global_id', 'td_global_id');

//       // track pageview information to 'ymvn_web_log' table
//       td.trackEvent('ymvn_web_log', {td_url: document.location.href});


//       // Enable click tracking
//       td.trackClicks();  
//     </script>
//   `} />
// )

export default TreasureScript