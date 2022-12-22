export const fileToBlob = (file: File) => {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      resolve(new Blob([arrayBuffer]));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
