
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import LinkIcon from './icons/LinkIcon.tsx';

const FileUpload: React.FC<{ onFileRead: (text: string) => void; }> = ({ onFileRead }) => {
    const [error, setError] = useState('');
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError('');
        const file = acceptedFiles[0];
        if (file) {
            if (file.type !== "text/plain") {
                 setError("Only .txt files are supported for now.");
                 return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                onFileRead(text);
            };
            reader.readAsText(file);
        }
    }, [onFileRead]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/plain': ['.txt'] },
        maxFiles: 1,
    });

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div {...getRootProps()} className="w-full p-8 border-2 border-dashed border-slate-600 hover:border-cyan-500 rounded-lg text-center cursor-pointer transition-colors">
                <input {...getInputProps()} />
                <LinkIcon className="w-10 h-10 mx-auto text-gray-500 mb-4" />
                {isDragActive ? (
                    <p className="text-cyan-400">Drop the file here...</p>
                ) : (
                    <p className="text-gray-400">Drag 'n' drop a .txt file here, or click to select.</p>
                )}
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
    );
};

export default FileUpload;