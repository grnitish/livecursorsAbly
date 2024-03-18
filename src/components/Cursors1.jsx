import React, { useState } from "react";
import { useCursors } from "@ably/spaces/react";
import { default as CursorSvg } from "./CursorSvg";
import useTrackCursor from "../hooks/useTrackCursor";
import styles from "./Cursors.module.css";

// 💡 This component is used to render the cursor of the user
const YourCursor = ({ self, parentRef }) => {
  const [cursorPosition, setCursorPosition] = useState(null);
  const handleSelfCursorMove = useTrackCursor(setCursorPosition, parentRef);

  if (!self) return null;
  if (!cursorPosition || cursorPosition.state === "leave") return null;

  const cursorColor = self.profileData.userColors.cursorColor;

  return (
    <div
      className={styles.cursor}
      onMouseMove={(e) => handleSelfCursorMove(e)}
      style={{
        top: `${cursorPosition?.top || 0}px`,
        left: `${cursorPosition?.left || 0}px`,
      }}
    >
      <CursorSvg cursorColor={cursorColor} />
      <div style={{ backgroundColor: cursorColor }} className={styles.cursorName}>
        You
      </div>
    </div>
  );
};

// 💡 This component is used to render the cursors of other users in the space
const MemberCursors = () => {
  const { cursors } = useCursors({ returnCursors: true });

  return (
    <>
      {Object.values(cursors).map((data) => {
        const cursorUpdate = data.cursorUpdate;
        const member = data.member;
        if (cursorUpdate.data.state === "leave") return null;
        const cursorColor = member.profileData.userColors.cursorColor;

        return (
          <div
            key={member.connectionId}
            id={`member-cursor-${member.connectionId}`}
            className={styles.cursor}
            style={{
              left: `${cursorUpdate.position.x}px`,
              top: `${cursorUpdate.position.y}px`,
            }}
          >
            <CursorSvg cursorColor={cursorColor} />
            <div style={{ backgroundColor: cursorColor }} className={`${styles.cursorName} member-cursor`}>
              {member.profileData.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export { YourCursor, MemberCursors };
