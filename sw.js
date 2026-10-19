const CACHE='china26-v6-dragon-background';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./bg-dragon.jpg','./photos/anshun-1-thumb.webp','./photos/anshun-1.webp','./photos/anshun-2-thumb.webp','./photos/anshun-2.webp','./photos/anshun-3-thumb.webp','./photos/anshun-3.webp','./photos/chunxi-1-thumb.webp','./photos/chunxi-1.webp','./photos/chunxi-2-thumb.webp','./photos/chunxi-2.webp','./photos/chunxi-3-thumb.webp','./photos/chunxi-3.webp','./photos/daxing-1-thumb.webp','./photos/daxing-1.webp','./photos/daxing-2-thumb.webp','./photos/daxing-2.webp','./photos/daxing-3-thumb.webp','./photos/daxing-3.webp','./photos/ifs-1-thumb.webp','./photos/ifs-1.webp','./photos/ifs-2-thumb.webp','./photos/ifs-2.webp','./photos/ifs-3-thumb.webp','./photos/ifs-3.webp','./photos/radisson-1-thumb.webp','./photos/radisson-1.webp','./photos/radisson-2-thumb.webp','./photos/radisson-2.webp','./photos/radisson-3-thumb.webp','./photos/radisson-3.webp','./photos/ruiju-1-thumb.webp','./photos/ruiju-1.webp','./photos/ruiju-2-thumb.webp','./photos/ruiju-2.webp','./photos/ruiju-3-thumb.webp','./photos/ruiju-3.webp','./photos/taikoo-1-thumb.webp','./photos/taikoo-1.webp','./photos/taikoo-2-thumb.webp','./photos/taikoo-2.webp','./photos/taikoo-3-thumb.webp','./photos/taikoo-3.webp','./photos/tianfu-1-thumb.webp','./photos/tianfu-1.webp','./photos/tianfu-2-thumb.webp','./photos/tianfu-2.webp','./photos/tianfu-3-thumb.webp','./photos/tianfu-3.webp','./photos/vvo-1-thumb.webp','./photos/vvo-1.webp','./photos/vvo-2-thumb.webp','./photos/vvo-2.webp','./photos/vvo-3-thumb.webp','./photos/vvo-3.webp'
];
self.addEventListener('install', event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('china26-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>{
   const clone=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',clone)).catch(()=>{});return response;
  }).catch(()=>caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
