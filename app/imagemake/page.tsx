// app/imagemake/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { combineImages } from './actions';

export default function Imagemake() {
  const [files, setFiles] = useState<File[]>([]);
  const [combinedImageUrl, setCombinedImageUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');
  const [spacing, setSpacing] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<'transparent' | 'white'>('white');
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');

  useEffect(() => {
    if (backgroundColor === 'transparent') {
      setOutputFormat('png');
    }
  }, [backgroundColor]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      if (e.target.files[0].name.endsWith('.zip')) {
        setFileName(e.target.files[0].name.replace('.zip', ''));
      }
      setError('');
    } else {
      setError('Please select at least one file.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one file.');
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    formData.append('direction', direction);
    formData.append('spacing', spacing.toString());
    formData.append('backgroundColor', backgroundColor);
    formData.append('outputFormat', outputFormat);

    try {
      const response = await combineImages(formData);
      setCombinedImageUrl(response);
      setError('');
    } catch (error) {
      console.error('Error combining images:', error);
      setError('Error combining images. Please try again.');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setCombinedImageUrl('');
    setFileName('');
    setError('');
    setDirection('vertical');
    setSpacing(0);
    setBackgroundColor('white');
    setOutputFormat('jpg');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Combiner</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*,.zip"
          className="mb-2 p-2 border rounded"
        />
        <div className="mb-2">
          <label className="mr-2">Direction:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'vertical' | 'horizontal')}
            className="p-2 border rounded"
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="mr-2">Spacing (px):</label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            min="0"
            className="p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="mr-2">Background Color:</label>
          <select
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value as 'transparent' | 'white')}
            className="p-2 border rounded"
          >
            <option value="white">White</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="mr-2">Output Format:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as 'jpg' | 'png')}
            className="p-2 border rounded"
            disabled={backgroundColor === 'transparent'}
          >
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={files.length === 0}
          >
            Combine Images
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
          {combinedImageUrl && (
            <a
              href={combinedImageUrl}
              download={`${fileName || 'combined_image'}.${outputFormat}`}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Download
            </a>
          )}
        </div>
      </form>
      {combinedImageUrl && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Combined Image:</h2>
          <img src={combinedImageUrl} alt="Combined" className="max-w-full mb-4" />
          <a
            href={combinedImageUrl}
            download={`${fileName || 'combined_image'}.${outputFormat}`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Combined Image
          </a>
        </div>
      )}
    </div>
  );
}
