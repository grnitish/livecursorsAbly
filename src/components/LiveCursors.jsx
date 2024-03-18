import { useMemo, useRef, useEffect } from "react";
import { useMembers, useSpace } from "@ably/spaces/react";
import { mockNames } from "../utils/mockNames";
import { colours } from "../utils/helpers";
import { MemberCursors, YourCursor } from "./Cursors.jsx";
import React from "react";
import styles from "./LiveCursors.module.css";
import BlocklyComponent,  {Block, Value, Field, Shadow} from "../Blockly";
/** 💡 Select a mock name to assign randomly to a new user that enters the space💡 */
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];
const LiveCursors = () => {
    const name = useMemo(mockName, []);
    /** 💡 Select a color to assign randomly to a new user that enters the space💡 */
    const userColors = useMemo(() => colours[Math.floor(Math.random() * colours.length)], []);
    /** 💡 Get a handle on a space instance 💡 */
    const { space } = useSpace();
    useEffect(() => {
        space === null || space === void 0 ? void 0 : space.enter({ name, userColors });
    }, [space]);
    const { self } = useMembers();
    const liveCursors = useRef(null);
    return (React.createElement("div", { id: "live-cursors", ref: liveCursors, className: `example-container ${styles.liveCursorsContainer}` },
        React.createElement("p", { style: { maxWidth: "80%", textAlign: "center" } }, "Move your cursor over the screen to see live cursors in action"),
        <BlocklyComponent
          readOnly={false}
          trashcan={true}
          media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="controls_ifelse" x="0" y="0"></block>
</xml>
      `}>
          {/* <Block type="test_react_field" />
          <Block type="test_react_date_field" /> */}
          
          <Block type="controls_ifelse" />
          <Block type="logic_compare" />
          <Block type="logic_operation" />
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
          <Block type="logic_operation" />
          <Block type="logic_negate" />
          <Block type="logic_boolean" />
          <Block type="logic_null" disabled="true" />
          <Block type="logic_ternary" />
          <Block type="text_charAt">
            <Value name="VALUE">
              <Block type="variables_get">
                <Field name="VAR">text</Field>
              </Block>
            </Value>
          </Block>
        </BlocklyComponent>,
        React.createElement(YourCursor, { self: self, parentRef: liveCursors }),
        React.createElement(MemberCursors, null)));
};
export default LiveCursors;
