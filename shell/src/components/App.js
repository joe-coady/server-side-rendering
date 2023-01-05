import React from 'react';
import { Helmet } from "react-helmet";

import Remote1Content from 'remote1/Content';
import someModule from 'remote1/someModule';

export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <div style={{
      backgroundColor: 'black',
      color: 'lightgrey',
      padding: '1rem'
    }} onClick={() => alert('shell is interactive')}>
     <h1>Module Federation Example: Server Side Rendering</h1>
     <h2>This is the shell application.</h2>
     <div>{someModule('WORLD OMG!')}</div>
    </div>
   
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <Remote1Content />
    </React.Suspense>
  </div >
);
