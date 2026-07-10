import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiFileText, FiAlertCircle } from 'react-icons/fi';
import Button from './Button';

export const ResumeUpload = ({ onAnalyze }) => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile) => {
    setError('');
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    // Fallback file extension checking if mime type is empty on some systems
    const isDocx = selectedFile.name.endsWith('.docx');
    const isPdf = selectedFile.name.endsWith('.pdf');

    if (validTypes.includes(selectedFile.type) || isDocx || isPdf) {
      setFile(selectedFile);
    } else {
      setError('Please upload a PDF or DOCX file.');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (!file && !resumeText.trim()) {
      setError('Please upload a file or paste your resume text to begin.');
      return;
    }
    const filename = file ? file.name : "pasted_resume.txt";
    onAnalyze(filename, resumeText);
  };

  return (
    <div className="space-y-6">
      {/* File Upload Box */}
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-darkCard hover:bg-slate-50/50 dark:hover:bg-slate-800/10'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleFileInput}
        />

        <div className="rounded-full bg-slate-100 p-4 text-slate-500 dark:bg-slate-800 dark:text-slate-400 mb-3">
          <FiUploadCloud className="h-8 w-8" />
        </div>

        {file ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center">
              <FiFileText className="mr-1.5 h-4 w-4 text-primary" /> {file.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Drag and drop your resume here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-semibold text-primary hover:underline hover:text-primary-dark"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supports PDF and DOCX formats (Max 5MB)
            </p>
          </div>
        )}
      </div>

      <div className="relative flex py-2 items-center justify-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        <span className="flex-shrink mx-4 text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase">Or Paste Resume Text</span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
      </div>

      {/* Paste Resume Area */}
      <div>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your plain text resume content here to perform structural and keyword analysis..."
          rows={6}
          className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100 dark:placeholder-slate-500"
        />
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-sm">
          <FiAlertCircle className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleAnalyzeClick}
          disabled={!file && !resumeText.trim()}
          variant="primary"
          className="w-full sm:w-auto"
        >
          Analyze Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeUpload;
