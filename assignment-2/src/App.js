import React, {useEffect} from 'react';

import './App.css';
import AddDialog from "./components/add-dialog";
import ConfirmDialog from "./components/confirm-dialog";

const Action = {
    CREATE: 'CREATE',
    DELETE: 'DELETE',
}

const dataKey = 'books';
let action, selectedItem;

function App() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState('');

    useEffect(() => {
        const bookList = JSON.parse(localStorage.getItem(dataKey) || '[]');
        setData(bookList);
        console.log(bookList)
    }, []);

    function openModal(selectedAction, item) {
        selectedItem = item;
        action = selectedAction;
        setIsOpen(true);
    }

    function closeModal() {
        action = null;
        setIsOpen(false);
    }

    function renderModal() {
        if (action === Action.CREATE) {
            return <AddDialog close={closeModal} addItem={addItem}/>
        } else if (action === Action.DELETE) {
            return <ConfirmDialog item={selectedItem} close={closeModal} deleteItem={deleteItem}/>
        } else {
            return null;
        }
    }

    function updateData(data) {
        localStorage.setItem(dataKey, JSON.stringify(data));
        setData(data);
    }

    function addItem(newItem) {
        const updatedData = [...data, newItem];
        updateData(updatedData);
        setIsOpen(false);
    }

    function deleteItem(item) {
        const idx = data.findIndex(i => i.name === item.name);
        if (idx === -1) {
            return;
        }
        const updatedData = [...data];
        updatedData.splice(idx, 1);
        updateData(updatedData);
        setIsOpen(false);
    }

    return (
        <div id="App" className="App">
            <header>

                <a className="brand-name">
                    <h1>Bookstore</h1>
                </a>

                <div className="profile">
        <span className="material-symbols-outlined">
account_circle
</span>
                    <span>Leo Tran</span>
                </div>

            </header>
            <main>
                <div className="container">
                    <section className="toolbar">
                        <input type="text" placeholder="Search books" aria-label="search-box" id="searchBox"
                               value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
                        <button className="btn btn-primary" type="button" onClick={() => openModal(Action.CREATE)}>Add
                            Book
                        </button>
                    </section>
                    <table className="main-content">
                        <tbody>
                        <tr>
                            <th colSpan="2">Name</th>
                            <th>Author</th>
                            <th>Topic</th>
                            <th>Action</th>
                        </tr>
                        {data.filter(i => i.name.toLowerCase().includes(searchKey.toLowerCase())).map(i => {
                            return (
                                <tr key={i.name}>
                                    <td colSpan="2">{i.name}</td>
                                    <td>{i.author}</td>
                                    <td>{i.topic}</td>
                                    <td>
                                        <button className="btn btn-link" type="button"
                                                onClick={() => openModal(Action.DELETE, i)}><span>Delete</span></button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </main>

            {modalIsOpen ?
                renderModal()
                : null}

        </div>
    );
}

export default App;
