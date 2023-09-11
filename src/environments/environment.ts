// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  urlBackend: "http://localhost/comandopmam/index.php/",
  secret: 'TEXTO_QUALQUER_PARA_AMBIENTE_DEV',
  fakeToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjEsInVzZXIiOiIzMjM4NTI3NDE3NyIsIm5vbWUiOiIyIFRFTiBGRVJOQURBIExJTUEiLCJncnVwb3MiOlsiQURNSU4iXX0.BRp64vTXbNUPMmq2UTJL-aS28_IZZFU4M9kIaA25QUI",
  firebaseConfig: {
    apiKey: "AIzaSyCvYcvk9CpDoYV_zRrJSWdEpI-rOO3kSUE",
    authDomain: "comando-mobile-user.firebaseapp.com",
    databaseURL: "https://comando-mobile-user.firebaseio.com",
    projectId: "comando-mobile-user",
    storageBucket: "comando-mobile-user.appspot.com",
    messagingSenderId: "439242183708",
    appId: "1:439242183708:web:dbb90ec1931336a72cfbd9",
    measurementId: "G-7FPHEQ8LSR",
    vapidKey: "BLPH_MF7KJjeDEqqNP8JSr1-Xtq_Hl9jXjNy-chFDmH-BahtIXhIE6E2briG5MAN4m26quf9NG5sQnc-7QTfBsE"
  }
}
initializeApp(environment.firebaseConfig);


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI
