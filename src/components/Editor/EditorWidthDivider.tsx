import { Box, Divider } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface EditorWidthDividerProps {
  setPaddingX: Dispatch<SetStateAction<number>>;
  setIsBeingDragged: Dispatch<SetStateAction<boolean>>;
  isBeingDragged?: boolean;
}

export default ({
  setPaddingX,
  setIsBeingDragged,
  isBeingDragged = false,
}: EditorWidthDividerProps) => {
  return (
    <Box position="relative">
      <Divider
        _before={
          isBeingDragged
            ? {
                content: `""`,
                position: "absolute",
                top: 0,
                left: "-3px",
                bottom: 0,
                border: "3px solid",
              }
            : {}
        }
        borderColor="blackAlpha.800"
        position="absolute"
        top="0"
        bottom="0"
        px="5px"
        orientation="vertical"
        draggable="true"
        onDragStart={(e) => {
          // This removes the `ghost` image that appears while dragging
          e.dataTransfer.setDragImage(new Image(), 0, 0);
          setIsBeingDragged(true);
        }}
        onDrag={(e) => {
          if (e.clientX > 200 && e.clientX < window.innerWidth - 200) {
            let paddingX = e.clientX;
            setPaddingX(paddingX);
          }
        }}
        onDragEnd={() => {
          setIsBeingDragged(false);
        }}
        cursor="ew-resize"
      />
    </Box>
  );
};
