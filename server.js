const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const mockData = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];

  // to get all Data
app.get("/mockData", (req, res) => {
    res.json(mockData); // to send the mockData array as a response
  });

  app.post("/mockData", (req, res) => {
    const { name, price } = req.body; // to get the name and price from the request body
    const newMockdata = { id: mockData.length + 1, name, price }; // to create a new book object
   mockData.push(newMockdata); // to add the new data to the data array
    res.status(201).json(newMockdata); // to send the new data as a response
  });
  app.get("/mockData/:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the data by id
    if (!data) return res.status(404).json({ message: "Data not found" }); // to send a 404 status code and a message if the data is not found
    res.json(data); // to send the data as a response
  });
  // to update a data
app.put("/mockData/:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the data by id
    if (!data) return res.status(404).json({ message: "product not found" }); // to send a 404 status code and a message if the data is not found
  
    const { name, price } = req.body; // to get the name and price from the request body
    data.name = name; // to update the title of the data
    data.price = price; // to update the author of the data
    res.json(data); // to send the updated data as a response
  });
  // to delete a data
app.delete("/mockData/:id", (req, res) => {
    const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the data by id
    if (index === -1) return res.status(404).json({ message: "product not found" }); // to send a 404 status code and a message if the data is not found
  
    mockData.splice(index, 1); // to delete the data from the mockdata array
    res.status(204).send(); // to send a 204 status code
  });