import MarkHotkey from './markHotKey';

const Bold = MarkHotkey({
  type: 'bold',
  key: 'b'
});

const Italic = MarkHotkey({
  type: 'italic',
  key: 'i'
});

const Underline = MarkHotkey({
  type: 'underline',
  key: 'u'
});

export default [Bold, Italic, Underline];
