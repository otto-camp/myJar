import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IEditor {
  story: string;
  setStory: any;
}

export default function Editor({ story, setStory }: IEditor) {
  return (
    <ReactQuill
      className="postcreate-story"
      modules={modules}
      formats={formats}
      theme="snow"
      value={story}
      onChange={setStory}
    />
  );
}

const Quill = ReactQuill.Quill;
const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike' /*, 'blockquote'*/],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [/*'image',*/ 'video']
    ]
  },
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  //'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  //'image',
  'video'
];
