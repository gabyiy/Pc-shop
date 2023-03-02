import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data);
});
app.get('/api/products/category/:category',(req,res)=>{
  const memories = data.products.find(x=>x.category===req.params.category)
  if(memories)
  res.send(memories)
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}
  `);
});
