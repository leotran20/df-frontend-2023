const AddDialog = ({ close, addItem }) => {
  function onAddItem(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const item = {
      name: formData.get('name'),
      author: formData.get('name'),
      topic: formData.get('topic'),
    };
    addItem(item);
  }

  return (
    <div id="add-modal" className="modal">
      <div className="content">
        <button className="close-btn" type="button" onClick={close}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2>Add Book</h2>
        <form id="addNewForm" onSubmit={onAddItem}>
          <label htmlFor="name">
            Name
            <input id="name" name="name" type="text" />
            <br />
          </label>
          <br />

          <label htmlFor="author">
            Author
            <input id="author" name="author" type="text" />
            <br />
          </label>
          <br />

          <label htmlFor="topic">
            Topic
            <select id="topic" name="topic">
              <option value="Programming">Programming</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
            </select>
            <br />
          </label>
          <br />

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDialog;
