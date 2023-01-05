import React from "react";

export default () => (
  <div style={{
    backgroundColor: 'red',
    color: 'lightgrey',
    padding: '1rem',
    width: '500px'
  }}>
    <h2>Remote 2: Image</h2>
    <div>This is another remote embedded in remote 1</div>
    <button style={{ marginBottom: '1rem' }} onClick={() => alert("Client side Javascript works!")}>Click me to test i'm interactive!</button>
    <img src="https://i.ibb.co/jfTvC6Q/serge.jpg" style={{ width: '100%' }} alt="serge" border="0" />
  </div>
);