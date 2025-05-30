window.onload = function () {
  fetch('downloads/metadata.json')
    .then(response => {
      if (!response.ok) throw new Error('Server responded with status ' + response.status);
      return response.json();
    })
    .then(metadata => {
      const list = document.getElementById('downloadList');
      list.innerHTML = ''; // Clear previous content

      Object.entries(metadata).forEach(([filename, display]) => {
        if (filename && display) {
          const li = document.createElement('li');
          li.innerHTML = `<a href="downloads/${filename}" download>${display}</a>`;
          list.appendChild(li);
        } else {
          console.warn('Missing filename or display value:', filename, display);
        }
      });
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      const list = document.getElementById('downloadList');
      list.innerHTML = '<li>عذراً، تعذر تحميل الملفات حالياً</li>';
    });
}
