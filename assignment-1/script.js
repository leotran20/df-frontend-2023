// Your JS code goes here
const dataKey = 'books';
document.addEventListener("DOMContentLoaded", function () {
    fetchList();
    document.getElementById('searchBox').addEventListener('keyup', () => fetchList());
});

function openConfirmationDialog(item) {
    fetch('/html/confirm-modal.html').then(response => response.text()).then(data => {
        data = data.replace('{TITLE}', item.name);
        data = data.replace('{ID}', item.id);
        document.body.insertAdjacentHTML('beforeend', data);
    });
}

function openAddDialog() {
    fetch('/html/add-modal.html').then(response => response.text()).then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
    });
}

function closeModal() {
    document.querySelector('.modal').remove();
}

function fetchList() {
    // remove old items except headers
    const tableBodySelector = document.querySelector('table.main-content tbody');
    tableBodySelector.querySelectorAll('tr:not(:first-child)').forEach(e => e.remove());


    const bookList = localStorage.getItem(dataKey);
    if (!bookList) {
        localStorage.setItem(dataKey, '[]');
    } else {
        const query = document.getElementById('searchBox').value;
        const rows = JSON.parse(bookList).filter(i => i.name.toLowerCase().includes(query.toLowerCase())).map(i => `
      <tr>
          <td colspan="2">${i.name}</td>
          <td>${i.author}</td>
          <td>${i.topic}</td>
          <td>
              <button class="btn btn-link" type="button" onclick="openConfirmationDialog({name: '${i.name}', id: '${i.id}'})"><span>Delete</span></button>
          </td>
      </tr>`).join('');
        tableBodySelector.insertAdjacentHTML('beforeend', rows);
    }
}

function createNewBook() {
    // Get all the forms elements and their values in one step
    const addNewForm = document.querySelector('#addNewForm');

    const formData = new FormData(addNewForm);

    const values = [];
    formData.forEach(function (value, key) {
        values.push({name: key, value: value});
    });

    const newItem = values.reduce((result, currentValue) => {
        result[currentValue.name] = currentValue.value;
        return result
    }, {});

    const books = JSON.parse(localStorage.getItem(dataKey) || '[]');

    newItem.id = books.length + 1;
    books.push(newItem);
    localStorage.setItem(dataKey, JSON.stringify(books));

    fetchList();

    closeModal();
}

function deleteBook(id) {
    let books = JSON.parse(localStorage.getItem(dataKey) || '[]');

    const idx = books.findIndex(i => i.id === id);
    if (idx === -1) {
        return;
    }

    books.splice(idx, 1);

    localStorage.setItem(dataKey, JSON.stringify(books));

    fetchList();

    closeModal();
}

