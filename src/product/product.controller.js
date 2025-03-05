import mongoose from "mongoose";
import Producto from "./product.model.js";
import Category from "../category/category.model.js";

export const addProduct = async (req, res) => {
    try {
        let { productName, description, category, stock, price } = req.body;

        if (!productName || !description || stock == null || !price) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (!category || !mongoose.Types.ObjectId.isValid(category)) {
            const defaultCategory = await Category.findOne({ categoryName: "SIN-CATEGORIA" }).lean();
            if (!defaultCategory) {
                return res.status(500).json({ message: "No se encontró la categoría predeterminada 'SIN-CATEGORIA'" });
            }
            category = defaultCategory._id;
        }

        const product = await Producto.create({ productName, description, category, stock, price });

        return res.status(201).json({
            message: "Producto ha sido creado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el producto",
            error: err.message
        });
    }
};



export const getProductByName = async (req, res) => {
    try {
        const { productName } = req.query;

        if(!productName){
            return res.status(400).json({
                success: false,
                message: "El nombre del producto no exite"
            })
        }

        const products = await Producto.find({ productName: {$regex: productName, $options: "i"}, })

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos"
            });
        }

        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};


export const getProductsOutOfStock  = async (req, res) => {
    try {
        const products = await Producto.find({ stock: 0 });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay productos agotados",
            });
        }

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos agotados",
            error: err.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const query = { status: true };

        const [total, products] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

export const listProducts = async (req, res) => {
    try {
        const { filter, order, value} = req.body;

        if (!filter || !order) {
            return res.status(400).json({
                message: "Falta el filtro u orden",
            });
        }

        const validFilters = ['category', 'bestSelling', 'productName'];

        if (!validFilters.includes(filter)) {
            return res.status(400).json({
                message: "El filtro no es válido. Los filtros disponibles son: 'category', 'bestSelling', 'productName'",
            });
        }

        let query = {}; 
        let sort = {};

        switch (filter) {
            case 'category':
                if (value) {
                    query = { category: value }; 
                }
                break;
            case 'bestSelling':
                sort = { stock: order === 'asc' ? 1 : -1 };
                break;
            case 'productName':
                if (value) {
                    query = { productName: new RegExp(value, 'i') }; 
                }
                break;
            default:
                return res.status(400).json({ message: "El filtro no es válido" });
        }

        const products = await Producto.find(query).sort(sort);

        return res.status(200).json({
            message: "Productos listados",
            products,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener los productos",
            error: err.message,
        });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Producto actualizado",
            product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar producto",
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmDelete } = req.body;

        if (!confirmDelete) {
            return res.status(400).json({
                success: false,
                message: "Debes confirmar la eliminación del producto enviando `confirmDelete: true`."
            });
        }

        const product = await Producto.findByIdAndUpdate(id, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Producto eliminado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        });
    }
};
