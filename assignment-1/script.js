// Your JS code goes here
const dataKey = 'books';
const filteredDataKey = 'filteredBooks';
$(document).ready(function () {
    fetchList();
    $('#searchBox').keyup(function () {
        fetchList();
    });
});

function openConfirmationDialog(item) {
    $.get('/html/confirm-modal.html', function (data) {
        data = data.replace('/{TITLE}/g', item.name);
        data = data.replace('/{ID}/g', item.id);
        $('body').append(data);
    });
}

function openAddDialog() {
    $.get('/html/add-modal.html', function (data) {
        $('body').append(data);
    });
}

function closeModal() {
    $('.modal').remove();
}

function fetchList() {
    // remove old items except headers
    $('table.main-content tbody').children().not(':first').remove();


    const bookList = localStorage.getItem(dataKey);
    if (!bookList) {
        localStorage.setItem(dataKey, '[]');
    } else {
        const query = $('#searchBox').val();
        const rows = JSON.parse(bookList).filter(i => i.name.includes(query)).map(i => `
      <tr>
          <td colspan="2">${i.name}</td>
          <td>${i.author}</td>
          <td>${i.topic}</td>
          <td>
              <button class="btn btn-link" type="button" onclick="openConfirmationDialog({name: '${i.name}', id: '${i.id}'})"><span>Delete</span></button>
          </td>
      </tr>`);
        $('table.main-content tbody').append(rows);
    }
}

function createNewBook() {
    // Get all the forms elements and their values in one step
    const values = $('#addNewForm').serializeArray();

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
