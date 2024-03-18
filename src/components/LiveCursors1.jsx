// import React, { useMemo, useEffect, useRef } from "react";
// import { useSpace, useMembers } from "@ably/spaces/react";
// import { mockNames } from "../utils/mockNames";
// import { colours } from "../utils/helpers";
// import { YourCursor, MemberCursors } from "./Cursors";
// import styles from "./LiveCursors.module.css";

// /** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
// const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

// const LiveCursors = () => {
//   const name = useMemo(mockName, []);
  
//   /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
//   const userColors = useMemo(() => colours[Math.floor(Math.random() * colours.length)], []);

//   /** 💡 Get a handle on a space instance 💡 */
//   const { space } = useSpace();
  
//   useEffect(() => {
//     space?.enter({ name, userColors });
//   }, [space]);

//   const { self } = useMembers();
//   const liveCursors = useRef(null);

//   return (
//     <div id="live-cursors" ref={liveCursors} className={`example-container ${styles.liveCursorsContainer}`}>
//       <p style={{ maxWidth: "80%", textAlign: "center" }}>Move your cursor over the screen to see live cursors in action</p>
//       <YourCursor self={self} parentRef={liveCursors}/>
//       <MemberCursors />
//     </div>
//   );
// };

// export default LiveCursors;
