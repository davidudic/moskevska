'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamické načtení ReactQuill (pouze na klientu)
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '6px' }}>Načítám editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Napište obsah článku...",
  height = 300 
}) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link',
    'align'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ 
          height: `${height}px`,
          marginBottom: '42px' // Pro toolbar
        }}
      />
      
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: ${height - 100}px;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ced4da;
          border-left: 1px solid #ced4da;
          border-right: 1px solid #ced4da;
          border-bottom: none;
          border-radius: 6px 6px 0 0;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #ced4da;
          border-left: 1px solid #ced4da;
          border-right: 1px solid #ced4da;
          border-top: none;
          border-radius: 0 0 6px 6px;
          font-size: 14px;
        }
        
        .rich-text-editor .ql-editor:focus {
          outline: none;
        }
        
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #495057;
        }
        
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: #495057;
        }
        
        .rich-text-editor .ql-toolbar button:hover .ql-stroke {
          stroke: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar button:hover .ql-fill {
          fill: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-label {
          color: #495057;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-label:hover {
          color: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker.ql-expanded .ql-picker-label {
          color: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-options {
          border: 1px solid #ced4da;
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-item {
          color: #495057;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-item:hover {
          background: #f8f9fa;
          color: #84d3d1;
        }
        
        .rich-text-editor .ql-toolbar .ql-picker-item.ql-selected {
          background: #84d3d1;
          color: white;
        }
        
        .rich-text-editor h1 {
          font-size: 2rem;
          color: #3a7d7b;
          margin: 1rem 0;
        }
        
        .rich-text-editor h2 {
          font-size: 1.5rem;
          color: #3a7d7b;
          margin: 0.8rem 0;
        }
        
        .rich-text-editor h3 {
          font-size: 1.25rem;
          color: #3a7d7b;
          margin: 0.6rem 0;
        }
        
        .rich-text-editor a {
          color: #84d3d1;
          text-decoration: underline;
        }
        
        .rich-text-editor a:hover {
          color: #3a7d7b;
        }
        
        .rich-text-editor ul, .rich-text-editor ol {
          padding-left: 1.5rem;
        }
        
        .rich-text-editor li {
          margin: 0.25rem 0;
        }
        
        .rich-text-editor blockquote {
          border-left: 4px solid #84d3d1;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;




