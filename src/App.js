/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
//import Spaces from '@ably/spaces'
import { Realtime } from 'ably';
import Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";
import LiveCursors from "./components/LiveCursors.jsx";
import { getSpaceNameFromUrl } from "./utils/helpers";
import { useSpace } from '@ably/spaces/react';

import BlocklyComponent, {Block, Value, Field, Shadow} from './Blockly';

import './blocks/customblocks';
import './generator/generator';

const spaceName = getSpaceNameFromUrl()




function App({spaces}) {
  // console.log(spaces)
  // console.log(spaceName)
  


 
  return (
    <div className="App">
      <header className="App-header">
        <SpacesProvider client={spaces}>
          <SpaceProvider name={spaceName}>
          <LiveCursors/>
          </SpaceProvider>
      </SpacesProvider>
        
        
      </header>
    </div>
  );
}

// const client = new Realtime.Promise({authUrl:'/auth'})

// const spaces = new Spaces(client)

// const space = await spaces.get('testing')

// await space.enter({name:'Nitish'})

// space.cursors.subscribe('update',async(cursorUpdate) =>{
//   const members = await space.members.getAll();
//   const member = members.find((member) => member.connectionId === cursorUpdate.connectionId);
//   renderCursor(cursorUpdate,member)
// });

// window.addEventListener('mousemove',({ clientX, clientY}) => {
//   space.cursors.set({position:{x:clientX,y: clientY}})
// })

export default App;
