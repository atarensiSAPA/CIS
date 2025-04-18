const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileElem');
const preview = document.getElementById('preview');
const resetButton = document.getElementById('reset-btn');
const form = document.getElementById('upload-form');
const responseMessage = document.getElementById('response-message');
if (!dropArea) {
  console.error('Drop area not found');
}
if (!fileInput) {
    console.error('File input not found');
}
if (!preview) {
    console.error('Preview area not found');
}
if (!resetButton) {
    console.error('Reset button not found');
}
if (!form) {
    console.error('Form not found');
}
if (!responseMessage) {
    console.error('Response message area not found');
}

function showImage(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    preview.innerHTML = `<img src="${e.target.result}" alt="Image loaded" />`;
  };
  reader.readAsDataURL(file);
}
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        showImage(fileInput.files[0]);
    }
    });
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        showImage(e.dataTransfer.files[0]);
        fileInput.files = e.dataTransfer.files;
    }
});

resetButton.addEventListener('click', () => {
    fileInput.value = '';
    responseMessage.textContent = '';
    preview.innerHTML = '<p>No image loaded</p>';
});

// Interceptar el envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (fileInput.files.length === 0) {
      responseMessage.textContent = 'No image selected';
      return;
    }
  
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
  
    try {
      const res = await fetch('/process', {
        method: 'POST',
        body: formData,
      });

      const text = await res.text();
      responseMessage.textContent = text;
    } catch (err) {
      responseMessage.textContent = 'Error sending image';
      console.error(err);
    }
  });