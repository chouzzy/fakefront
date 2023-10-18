import Document, { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router';
import React from 'react'


export default class MyDocument extends Document {
   render() {

      return (
         <Html>
            
            <Head>
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
               <link rel="shortcut icon" href="/static/img/logo.png" />
            </Head>

            <body>
               <Main />
               <NextScript />
            </body>
         </Html >
      )
   }
}
