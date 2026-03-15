
  import "./polyfill.mjs";
  
    import { Buffer } from "node:buffer";
    import { renderApplication } from "../../../dist/student-learning-platform/server/render-utils.server.mjs";
    import bootstrap from "../../../dist/student-learning-platform/server/main.server.mjs";
    import "./fixup-event.mjs";

    const document = Buffer.from("PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICA8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgPHRpdGxlPlN0dWRlbnRMZWFybmluZ1BsYXRmb3JtPC90aXRsZT4KICAgIDxiYXNlIGhyZWY9Ii8iIC8+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEiIC8+CiAgICA8bGluayByZWw9Imljb24iIHR5cGU9ImltYWdlL3gtaWNvbiIgaHJlZj0iZmF2aWNvbi5pY28iIC8+CiAgICA8bGluayByZWw9InByZWNvbm5lY3QiIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20iIC8+CiAgICA8bGluayByZWw9InByZWNvbm5lY3QiIGhyZWY9Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20iIGNyb3Nzb3JpZ2luIC8+CiAgICA8bGluawogICAgICBocmVmPSJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDMwMDs0MDA7NTAwJmRpc3BsYXk9c3dhcCIKICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgLz4KICAgIDxsaW5rIGhyZWY9Imh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMiIHJlbD0ic3R5bGVzaGVldCIgLz4KICA8L2hlYWQ+CiAgPGJvZHk+CiAgICA8YXBwLXJvb3Q+PC9hcHAtcm9vdD4KICA8L2JvZHk+CjwvaHRtbD4K", 'base64').toString("utf-8");

    export default async (request, context) => {
      const html = await renderApplication(bootstrap, {
        url: request.url,
        document,
        platformProviders: [{ provide: "netlify.request", useValue: request }, { provide: "netlify.context", useValue: context }],
      });
      return new Response(html, { headers: { "content-type": "text/html" } });
    };
    
  export const config = {
    path: "/*",
    excludedPath: ["/.netlify/*","/chunk-6BOZPCGC.js","/chunk-6QKMPMRG.js","/chunk-7SVABNQY.js","/chunk-A3PAWKW2.js","/chunk-ADXJCH5Z.js","/chunk-CCXMR6MX.js","/chunk-DU62VPBB.js","/chunk-EWVVRJVK.js","/chunk-FWVIOZ3B.js","/chunk-GSMRWLWA.js","/chunk-LTSUXL3K.js","/chunk-MJZC5WIA.js","/chunk-OLREKTU7.js","/chunk-URSTQK7I.js","/chunk-V6X3HWGC.js","/chunk-X6R57UF6.js","/chunk-Y4CP4WDF.js","/chunk-ZYCDZBRJ.js","/favicon.ico","/main-XTOGSC37.js","/public/index.html","/server/index.server.html","/styles-OPUTW5UJ.css","/public"],
    generator: "@netlify/angular-runtime@3.0.1",
    name: "Angular SSR",
    cache: "manual",
  };
  