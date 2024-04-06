import { Request, Response } from "express";
import { market } from "./database";
import { product } from "./interfaces";

export const createProducts = (req:Request , res:Response) => {
    const productId = market.length + 1;

    const limitDate = new Date()
    const yearDate = new Date(limitDate)
    yearDate.setFullYear(yearDate.getFullYear() +1)

    const newProduct = {id:productId, name:req.body.name, price:req.body.price, weight:req.body.weight,
    section:req.body.section, calories:req.body.calories, expirationDate:new Date(yearDate)};

    market.push(newProduct);

    return res.status(201).json(newProduct)
}

export const getProducts = (req:Request , res:Response) => {

    const totalPrice = market.reduce((previousValue,products)=>{
        return previousValue + products.price
    },0)

    const products = market;
    return res.status(200).json({total:totalPrice,products})
}

export const getOneProduct = (req:Request, res:Response) =>{

    const product = market.find(product => product.id === Number(req.params.id));

    return res.status(200).json(product);
}

export const patchProduct = (req:Request, res:Response) => {
    const index = market.findIndex(product=> product.id === Number(req.params.id))

    const newProduct = (market[index]={
        ...market[index],...req.body
    })

    return res.status(200).json(newProduct)

}

export const deleteProduct = (req:Request, res:Response) =>{
    const index = market.findIndex(product=> product.id === Number(req.params.id))

    market.splice(index,1)

    return res.status(204).json()
}