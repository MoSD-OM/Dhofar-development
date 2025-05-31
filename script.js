window.onload = function () {
  fetch('downloads/metadata.json')
    .then(response => {
      if (!response.ok) throw new Error('Server responded with status ' + response.status);
      return response.json();
    })
    .then(metadata => {
      const list = document.getElementById('downloadList');
      list.innerHTML = ''; // Clear previous content

      Object.entries(metadata).forEach(([key, value]) => {
        if (value && value.display && value.url !== undefined) {
          const li = document.createElement('li');
          const href = value.external ? value.url : `downloads/${value.url}`;
          const anchor = document.createElement('a');
          anchor.href = href;
          anchor.textContent = value.display;

          if (value.external) {
            anchor.target = '_blank'; // Open external links in new tab
          } else {
            anchor.setAttribute('download', '');
          }

          li.appendChild(anchor);
          list.appendChild(li);
        } else {
          console.warn('Invalid entry in metadata:', key, value);
        }
      });
    })
    .catch(error => {
      console.error('Fetch Error:', error);
      const list = document.getElementById('downloadList');
      list.innerHTML = '<li>عذراً، تعذر تحميل الملفات حالياً</li>';
    });
}

function toggleNewsContent(headerElement) {
  const content = headerElement.nextElementSibling;
  content.classList.toggle('hidden');
}
