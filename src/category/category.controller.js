import Category from "./category.model.js"

export const addCategory = async (req, res) => {
    try {
        const data = req.body;

        const categ = await Category.create(data);

        return res.status(201).json({
            message: "Category has been created",
            name: categ.categoryName,
            description: categ.description
        });
    } catch (err) {
        return res.status(500).json({
            message: "Category registration failed",
            error: err.message
        });
    }
}


export const getCategory = async (req, res) => {
    try{
        const query = { status: true }

        const [total, categorys ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
        ])

        return res.status(200).json({
            success: true,
            total,
            categorys
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias.",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const  data  = req.body;

        const categ = await Category.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Categoria Actualizada',
            categ,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoria.',
            error: err.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const {id}  = req.params;
        const { confirmDelete } = req.body;

        if (!confirmDelete) {
            return res.status(400).json({
                success: false,
                message: "Debes confirmar la eliminación de la categoria enviando `confirmDelete: true`."
            });
        }
        
        const categ = await Category.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada",
            categ
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}

const AddCategory = async () => {
    try {
        const categoryExists = await Category.findOne({ categoryName: "SIN-CATEGORIA" });

        if (categoryExists) {
            console.log("La categoría predeterminada ya existe, no se puede crear otra.");
            return;
        }
        const defaultCategory = new Category({
            categoryName: "SIN-CATEGORIA",
            description: "Categoría predeterminada para productos sin categoría",
            status: true
        });

        await defaultCategory.save();
        console.log("Categoría predeterminada creada exitosamente.");
    } catch (error) {
        console.error("Error al verificar o crear la categoría predeterminada:", error.message);
    }
};

export default AddCategory;