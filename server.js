const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👇 Sirve los archivos estáticos (index.html, manifest.json, sw.js, css, js, imágenes)
app.use(express.static(path.join(__dirname)));

// ================== BASE DE DATOS EN MEMORIA ==================
let orders = [];
let orderCounter = 1;

// Obtener todos los pedidos
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Crear un nuevo pedido
app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orderCounter++,
    ...req.body,
    timestamp: new Date().toLocaleString()
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Eliminar un pedido específico
app.delete("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(order => order.id !== id);
  res.json({ success: true });
});

// Eliminar todos los pedidos
app.delete("/api/orders", (req, res) => {
  orders = [];
  orderCounter = 1;
  res.json({ success: true });
});
// ===============================================================

// Redirige cualquier otra ruta a index.html (útil para PWA/SPAs)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
