import { useState, useEffect } from "react";
import GroceryForm from "./components/groceryform";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
    setCurrentPage(1);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const iconBtn = {
    background: "#ef4444",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    color: "#fff",
  };

  const pageBtn = {
    background: "#1e293b",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const cardStyle = {
    background: "#1f2937",
    color: "#fff",
    padding: "16px",
    borderRadius: "10px",
    width: "220px",
  };

  const cardLabel = { color: "#9ca3af" };

  return (
    <div style={{ padding: "10px" }}>
      <h1>Grocery Shop Inventory</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <div style={{ fontSize: "24px" }}>📦</div>
          <p style={cardLabel}>Total Items</p>
          <h2>{items.length}</h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "24px" }}>💰</div>
          <p style={cardLabel}>Total Inventory Value</p>
          <h2>₹ {totalAmount}</h2>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "24px" }}>🧾</div>
          <p style={cardLabel}>Low Stock Items</p>
          <h2>{items.length}</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Add New Items</h2>
        <input
          type="text"
          placeholder="Search item..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px 12px",
            width: "1100px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "#111827",
            color: "#fff",
          }}
        />
      </div>

      <GroceryForm addItem={addItem} />
      <h2>Items List</h2>

      <div
        style={{
          background: "#0f172a",
          padding: "16px",
          borderRadius: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "12px",
            color: "#9ca3af",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          <div style={{ flex: 3 }}>Item Name</div>
          <div style={{ flex: 1 }}>Price</div>
          <div style={{ flex: 1 }}>Qty</div>
          <div style={{ flex: 1 }}>Unit</div>
          <div style={{ flex: 1 }}>Category</div>
          <div style={{ flex: 2, textAlign: "right" }}>Actions</div>
        </div>

        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              padding: "14px",
              background: "#020617",
              borderRadius: "12px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flex: 7 }}>
              <div style={{ flex: 3 }}>{item.name}</div>
              <div style={{ flex: 1 }}>₹{item.price}</div>
              <div style={{ flex: 1 }}>{item.quantity}</div>
              <div style={{ flex: 1 }}>{item.unit}</div>
              <div style={{ flex: 1 }}>{item.category}</div>
            </div>

            <div
              style={{
                flex: 2,
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button style={iconBtn}>✏️</button>
              <button
                style={iconBtn}
                onClick={() => deleteItem(item.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              style={pageBtn}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  ...pageBtn,
                  background:
                    currentPage === i + 1 ? "#3b82f6" : "#1e293b",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              style={pageBtn}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
