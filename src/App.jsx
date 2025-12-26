import { useState, useEffect } from "react";
import GroceryForm from "./components/groceryform";
import "./App.css";


function App() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) setItems(savedItems);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };


  const updateItem = (id, updatedItem) => {
  setItems(
    items.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    )
  );
  setEditingId(null);
  };


  const totalAmount = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Grocery Shop Inventory</h1>

      <GroceryForm addItem={addItem} />

      <h2>Items List</h2>

      {items.length === 0 && <p>No items added</p>}

      <ul>
        {items.map((item) => (
          <li
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
                }}
          >
            {/* LEFT SIDE */}
              {editingId === item.id ? (
  /* EDIT MODE */
  <div>
    <input
      value={item.name}
      onChange={(e) =>
        updateItem(item.id, { name: e.target.value })
      }
    />
    <input
      type="number"
      value={item.price}
      onChange={(e) =>
        updateItem(item.id, { price: Number(e.target.value) })
      }
    />
    <input
      type="number"
      value={item.quantity}
      onChange={(e) =>
        updateItem(item.id, { quantity: Number(e.target.value) })
      }
    />
  </div>
) : (
      /* VIEW MODE */
      <div>
        {item.name} | ₹{item.price} | {item.quantity} {item.unit} |{" "}
        {item.category}
      </div>
    )}


            {/* RIGHT SIDE */}
              <div style={{ display: "flex", gap: "10px" }}>
              <strong>₹ {item.price * item.quantity}</strong>

              {editingId === item.id ? (
              <button onClick={() => setEditingId(null)}>✔️</button>
                                        ) : (
              <button onClick={() => setEditingId(item.id)}>✏️</button>
                                            )}

  <button onClick={() => deleteItem(item.id)}>❌</button>
</div>

          </li>

        ))}
      </ul>
      {items.length > 0 && (
        <h2 style={{ marginTop: "20px", color: "#6cb6ff" }}>
        Grand Total: ₹ {totalAmount}
        </h2>
      )}

    </div>
  );
}

export default App;
