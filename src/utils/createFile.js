let file = null;

export default function (text) {
  const data = new Blob([text], {type: 'text/plain'});
  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (file !== null) {
    window.URL.revokeObjectURL(file);
  }
  file = window.URL.createObjectURL(data);
  return file;
}
