import { Box, Heading, Input } from '@chakra-ui/react'
import { useCustomTheme } from '~/hooks/useCustomTheme/useCustomTheme'
import React, { useEffect, useRef, useState } from 'react'
import { compiler } from 'markdown-to-jsx'

const Editor = (): JSX.Element => {
  const {
    theme: { editorColor },
  } = useCustomTheme()

  const [content, setContent] = useState<string[]>([
    'Hello World',
    'Hello World2',
    'Hello World3',
  ])

  const [selected, setSelected] = useState<number>(0)
  const [caretPositions, setCaretPositions] = useState<Record<number, number>>(
    {}
  )
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef?.current?.setSelectionRange(
      caretPositions[selected] ?? 0,
      caretPositions[selected] ?? 0
    )
  }, [selected])

  const activateLine = (index: number): void => {
    setCaretPositions({
      ...caretPositions,
      [selected]: inputRef?.current?.selectionStart ?? 0,
    })
    setSelected(index)
  }

  const saveLine = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContent([
      ...content.slice(0, index),
      e.target.value,
      ...content.slice(index + 1),
    ])
  }

  return (
    <Box w="100%" h="100%" background={editorColor}>
      {content.map((element, index) => {
        if (index === selected) {
          return (
            <Input
              ref={inputRef}
              key={index}
              defaultValue={element}
              _focus={{ outline: 'none' }}
              _focusVisible={{
                outline: 'none',
                bg: 'rgba(0,0,0,0.1)',
                border: 'none',
              }}
              border="none"
              borderRadius="none"
              padding="0"
              height="fit-content"
              autoFocus
              onChange={(e) => {
                saveLine(index, e)
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  activateLine(index - 1)
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  activateLine(index + 1)
                }
              }}
            ></Input>
          )
        }
        return (
          <Box
            key={index}
            onFocus={() => {
              activateLine(index)
            }}
            tabIndex={0}
            onClick={() => {
              activateLine(index)
            }}
          >
            {compiler(element, {
              overrides: {
                h1: {
                  component: Heading,
                  props: {
                    size: 'xl',
                  },
                },
                h2: {
                  component: Heading,
                  props: {
                    size: 'lg',
                  },
                },
                h3: {
                  component: Heading,
                  props: {
                    size: 'md',
                  },
                },
              },
            })}
          </Box>
        )
      })}
    </Box>
  )
}

export default Editor
