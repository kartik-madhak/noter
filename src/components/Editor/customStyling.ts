import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

export default syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.heading1, fontSize: '155%' },
    { tag: tags.heading2, fontSize: '145%' },
    { tag: tags.heading3, fontSize: '135%' },
    { tag: tags.heading4, fontSize: '125%' },
    { tag: tags.heading5, fontSize: '115%' },
    { tag: tags.heading6, fontSize: '105%' },
  ])
)
