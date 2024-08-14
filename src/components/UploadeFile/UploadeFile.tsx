import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import yaml from 'js-yaml';
import { Typography, Box } from '@mui/material';

const UploadeFile: React.FC = () => {
  const [fileContent, setFileContent] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {

      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {

        const binaryStr = reader.result;
        if (file.name.match(/csv.*/)) {
          Papa.parse(binaryStr as string, {
            complete: (results) => {
              setFileContent(JSON.stringify(results.data, null, 2));
            },
            header: true
          });
        } else if (file.name.match(/excel.*/) || file.name.match(/spreadsheetml.*/)) {
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          setFileContent(JSON.stringify(jsonData, null, 2));
        } else if (file.type.match(/yaml.*/) || file.name.match(/yml.*/)) {
          const doc = yaml.load(binaryStr as string);
          setFileContent(JSON.stringify(doc, null, 2));
        }
      };

      if (file.name.match(/csv.*/) || file.name.match(/yaml.*/) || file.name.match(/yml.*/)) {
        reader.readAsText(file);
      } else if (file.name.match(/excel.*/) || file.name.match(/spreadsheetml.*/)) {
        reader.readAsBinaryString(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} sx={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <Typography>Drop the files here ...</Typography> :
          <Typography>Drag 'n' drop some files here, or click to select files</Typography>
      }
      <pre>{fileContent}</pre>
    </Box>
  );
};

export default UploadeFile;
