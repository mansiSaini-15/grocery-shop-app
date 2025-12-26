import { useState } from "react";

function GroceryForm({ addItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !quantity || !unit || !category) return;

    addItem({
      id: Date.now(),
      name,
      price,
      quantity,
      unit,
      category,
    });

    setName("");
    setPrice("");
    setQuantity("");
    setUnit("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Price (₹)"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* NEW: Unit Type */}
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="">Select Unit</option>
        <option value="kg">Kg</option>
        <option value="dozen">Dozen</option>
        <option value="units">Units</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option>Fruits</option>
        <option>Vegetables</option>
        <option>Dairy</option>
        <option>Snacks</option>
      </select>

      <button type="submit">Add Item</button>
    </form>
  );
}

export default GroceryForm;
