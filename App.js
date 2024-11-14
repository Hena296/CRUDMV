import React, { useState } from 'react';
import './App.css';
const App = () => {
  const initialData = [
    { id: 2300033612, name: 'Hena', email: 'hena@gmail.com' },
    { id: 2300033593, name: 'Sanjana', email: 'sanjana@gmail.com' },
    { id: 2300031821, name: 'Rakshita', email: 'rakshi@gmail.com' }
  ];
  const [data, setData] = useState(initialData);
  const [newData, setNewData] = useState({ id: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const handleSave = () => {
    if (editingId) {
      setData(data.map(item => (item.id === editingId ? newData : item)));
    } else {
      setData([...data, { ...newData, id: Date.now() }]);
    }
    setNewData({ id: '', name: '', email: '' });
    setEditingId(null);
  };
  const handleEdit = (item) => {
    setNewData(item);
    setEditingId(item.id);
  };
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  return (
    <div className="App">
      <h1>React CRUD Operations</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newData.email}
          onChange={handleChange}
        />
        <button onClick={handleSave}>{editingId ? 'Update' : 'Add'}</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;