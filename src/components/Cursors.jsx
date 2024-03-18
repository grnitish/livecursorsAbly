import React, { useState } from "react";
import { useCursors } from "@ably/spaces/react";
import CursorSvg from "./CursorSvg.jsx";
import useTrackCursor from "../hooks/useTrackCursor.jsx";
import styles from "./Cursors.module.css";
// 💡 This component is used to render the cursor of the user
const YourCursor = ({ self, parentRef, }) => {
    const [cursorPosition, setCursorPosition] = useState(null);
    const handleSelfCursorMove = useTrackCursor(setCursorPosition, parentRef);
    if (!self)
        return null;
    if (!cursorPosition || cursorPosition.state === "leave")
        return null;
    const { cursorColor } = self.profileData.userColors;
    return (React.createElement("div", { className: styles.cursor, onMouseMove: (e) => handleSelfCursorMove(e), style: {
            top: `${(cursorPosition === null || cursorPosition === void 0 ? void 0 : cursorPosition.top) || 0}px`,
            left: `${(cursorPosition === null || cursorPosition === void 0 ? void 0 : cursorPosition.left) || 0}px`,
        } },
        React.createElement(CursorSvg, { cursorColor: cursorColor }),
        React.createElement("div", { style: { backgroundColor: cursorColor }, className: styles.cursorName }, "You")));
};
// 💡 This component is used to render the cursors of other users in the space
const MemberCursors = () => {
    const { cursors } = useCursors({ returnCursors: true });
    return (React.createElement(React.Fragment, null, Object.values(cursors).map((data) => {
        const cursorUpdate = data.cursorUpdate;
        const member = data.member;
        if (cursorUpdate.data.state === "leave")
            return;
        const { cursorColor } = member.profileData.userColors;
        return (React.createElement("div", { key: member.connectionId, id: `member-cursor-${member.connectionId}`, className: styles.cursor, style: {
                left: `${cursorUpdate.position.x}px`,
                top: `${cursorUpdate.position.y}px`,
            } },
            React.createElement(CursorSvg, { cursorColor: cursorColor }),
            React.createElement("div", { style: { backgroundColor: cursorColor }, className: `${styles.cursorName} member-cursor` }, member.profileData.name)));
    })));
};
export { MemberCursors, YourCursor };
