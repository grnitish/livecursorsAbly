import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AblyProvider } from "ably/react";
//import Spaces from "@ably/spaces";
import { nanoid } from "nanoid";
//import { Realtime } from "ably";



import { Realtime } from "ably";
import Spaces from "@ably/spaces";
import { SpacesProvider, SpaceProvider } from "@ably/spaces/react";


// const ably = new Realtime.Promise({ key: "LEYH0g.UJwrmw:FPrJY_p_FCpPZmbeVh3IBkkg8hfykYHUBvk_0z3qnB0", clientId: 'clemons' });
// const spaces = new Spaces(ably);

const client = new Realtime.Promise({
  clientId: nanoid(),
  key: "" ,
});
const spaces = new Spaces(client);

// console.log(spaces)
// console.log(client)
ReactDOM.render(
<SpaceProvider client={spaces}>
<SpaceProvider name="my-space">
      <App spaces={spaces}/>
    </SpaceProvider>
    </SpaceProvider>
  , document.getElementById('root'));







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
