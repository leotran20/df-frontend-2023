import React, {useEffect} from 'react';

import './App.css';
import AddDialog from "./components/AddDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import Header from "./components/Header";

const Action = {
    CREATE: 'CREATE',
    DELETE: 'DELETE',
}

const dataKey = 'books';
const limit = 5;
let action, selectedItem;

function App() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [searchKey, setSearchKey] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    useEffect(() => {
        try {
            const bookList = JSON.parse(localStorage.getItem(dataKey) || '[]');
            setData(bookList);
        } catch (e) {
            console.error('Cannot fetch data', e);
            throw e;
        }
    }, []);

    useEffect(() => {
        calculatePages();
    }, [data, searchKey]);

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
        try {
            localStorage.setItem(dataKey, JSON.stringify(data));
        } catch (e) {
            console.error('Cannot update data', e);
            throw e;
        }
        setData(data);
        setPage(0);
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

    function filterData() {
        return data.filter(i => i.name.toLowerCase().includes(searchKey.toLowerCase()));
    }

    function calculatePages() {
        const filteredData = filterData();
        const numberOfPages = Math.ceil((filteredData.length) / limit);
        setTotal(numberOfPages);
    }

    function renderItems() {
        const filteredData = filterData();
        const pagedData = filteredData.slice(page * limit, (page + 1) * limit);
        return pagedData.map(i => {
            return (
                <tr key={i.name}>
                    <td colSpan={2}>{i.name}</td>
                    <td>{i.author}</td>
                    <td>{i.topic}</td>
                    <td>
                        <button className="btn btn-link" type="button"
                                onClick={() => openModal(Action.DELETE, i)}><span>Delete</span></button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className={"App"}>
            <Header/>
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
                        <thead>
                        <tr>
                            <th colSpan={2}>Name</th>
                            <th>Author</th>
                            <th>Topic</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderItems()}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {
                            Array.from({length: total}, (v, i) => <button
                                className={"btn btn-link" + (i === page ? ' active' : '')}
                                type="button" onClick={() => setPage(i)} key={i}>{i + 1}</button>)
                        }
                    </div>
                </div>
            </main>

            {modalIsOpen ?
                renderModal()
                : null}

        </div>
    );
}

export default App;
