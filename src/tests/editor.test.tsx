import { beforeEach, describe, it } from 'vitest'
import { render } from '~/utils/test-utils'
import Editor from '~/components/Editor/Editor'
import { type EditorView } from 'codemirror'
import { sampleNote } from '~/components/Editor/sampleNote'

describe('Test the Editor', () => {
  let editor: EditorView

  beforeEach(() => {
    render(
      <Editor
        _onInit={(_editor) => {
          editor = _editor
        }}
      />
    )
  })

  it('should have the sample note', ({ expect }) => {
    expect(editor.state.doc.toString()).toBe(sampleNote)
  })

  it('should render text correctly', ({ expect }) => {
    expect(editor.contentDOM).toMatchSnapshot()
  })
})
