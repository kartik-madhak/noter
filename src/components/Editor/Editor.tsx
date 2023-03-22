import { Box, Container, Divider, Flex, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface EditorWidthDividerProps {
  setPaddingX: Dispatch<SetStateAction<number>>;
  invertCalculation?: boolean;
}

const EditorWidthDivider = ({
  setPaddingX,
  invertCalculation = false,
}: EditorWidthDividerProps) => (
  <Box position="relative">
    <Divider
      position="absolute"
      top="0"
      bottom="0"
      px="5px"
      orientation="vertical"
      draggable="true"
      onDragStart={(e) => {
        // This removes the `ghost` image that appears while dragging
        e.dataTransfer.setDragImage(new Image(), 0, 0);
      }}
      onDrag={(e) => {
        if (e.clientX > 0) {
          let paddingX = e.clientX;
          if (invertCalculation) {
            paddingX = window.innerWidth - paddingX;
          }
          setPaddingX(paddingX);
        }
      }}
      cursor="ew-resize"
    />
  </Box>
);

export default () => {
  const [paddingX, setPaddingX] = useState(600);

  return (
    <Container pt="50px" maxW={window.innerWidth - 2 * paddingX}>
      <Flex h="100vh" justify="space-between">
        <EditorWidthDivider setPaddingX={setPaddingX} />
        <Box>
          <Text>Some text</Text>
        </Box>
        <EditorWidthDivider
          setPaddingX={setPaddingX}
          invertCalculation={true}
        />
      </Flex>
    </Container>
  );
};
