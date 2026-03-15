
  import "./polyfill.mjs";
  
    import { netlifyAppEngineHandler } from "../../../dist/student-learning-platform/server/server.mjs";
    import "./fixup-event.mjs";

    export default netlifyAppEngineHandler;
    
  export const config = {
    path: "/*",
    excludedPath: ["/.netlify/*","/auth/index.html","/auth/login/index.html","/auth/register/index.html","/chunk-27PH2M5V.js","/chunk-2HTMPIFN.js","/chunk-5DPBZ2ZP.js","/chunk-5XC7WXEK.js","/chunk-6D2OZ7GS.js","/chunk-6VTOHBYA.js","/chunk-BGVR4FDN.js","/chunk-C4PAOJPN.js","/chunk-D3SO4Q4L.js","/chunk-DIHG4MPC.js","/chunk-EKDOGSDB.js","/chunk-JPFXYQPY.js","/chunk-LMG3POWS.js","/chunk-M47XB5RG.js","/chunk-PBRQ5VYN.js","/chunk-RYHU5VVB.js","/chunk-VKEL4XNU.js","/chunk-ZED4EJ2Q.js","/dashboard/homework/index.html","/dashboard/index.html","/dashboard/profile/index.html","/dashboard/resources/index.html","/dashboard/roadmap/index.html","/favicon.ico","/index.csr.html","/main-SKZ2YWWL.js","/public/index.html","/styles-OPUTW5UJ.css","/","/auth","/auth/login","/auth/register","/dashboard","/dashboard/homework","/dashboard/profile","/dashboard/resources","/dashboard/roadmap","/public"],
    generator: "@netlify/angular-runtime@3.0.1",
    name: "Angular SSR",
    cache: "manual",
  };
  