var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var sitelist = JSON.parse(localStorage.getItem('sitelist')) || [];

// Event listeners to validate inputs on the fly
siteName.addEventListener('input', () => validateInput(siteName, /^[A-Z][a-zA-Z\s]*$/));
siteURL.addEventListener('input', () => validateInput(siteURL, /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i));

function submit() {
  if (validateAllInputs()) {
    var site = {
      name: siteName.value,
      url: formatURL(siteURL.value),
    };
    sitelist.push(site);
    localStorage.setItem('sitelist', JSON.stringify(sitelist));
    displaySites();
    clearInputs();
    removeValidationClasses();
  } else {
    showModal();
  }
}

function formatURL(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url;
  }
  return url;
}

function validateAllInputs() {
  var isValid = true;

  if (!validateInput(siteName, /^[A-Z][a-zA-Z\s]*$/)) {
    isValid = false;
  }

  if (!validateInput(siteURL, /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i)) {
    isValid = false;
  }

  return isValid;
}

function validateInput(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element.nextElementSibling.classList.add('d-none');
    return true;
  } else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.classList.remove('d-none');
    return false;
  }
}

function displaySites() {
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  sitelist.forEach((site, index) => {
    var row = `<tr>
      <td>${index + 1}</td>
      <td>${site.name}</td>
      <td><a href="${site.url}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</a></td>
      <td><button class="btn btn-danger" onclick="deleteSite(${index})"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function deleteSite(index) {
  sitelist.splice(index, 1);
  localStorage.setItem('sitelist', JSON.stringify(sitelist));
  displaySites();
}

function showModal() {
  document.getElementById('validationModal').classList.remove('d-none');
}

function closeModal() {
  document.getElementById('validationModal').classList.add('d-none');
}

function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
}

function removeValidationClasses() {
  siteName.classList.remove('is-valid', 'is-invalid');
  siteURL.classList.remove('is-valid', 'is-invalid');
}

window.onload = displaySites;
