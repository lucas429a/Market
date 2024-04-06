
import  express from "express";
import { createProducts, deleteProduct, getOneProduct, getProducts, patchProduct } from "./logic";
import { isIdValid, isNameUnique } from "./middlewares";

const app = express();

app.use(express.json());

const PORT = 3000;

app.post("/products",isNameUnique,createProducts);
app.get("/products",getProducts);
app.get("/products/:id",isIdValid,getOneProduct);
app.patch("/products/:id",isIdValid,isNameUnique,patchProduct);
app.delete("/products/:id",isIdValid,deleteProduct);



app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
});