import User from "./user.model.js"

export const getUserById = async (req, res) => {
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try{
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const updateRole = async (req, res) => {
    try{
        const { uid } = req.params
        const { oldRole, newRole } = req.body

        const user = await User.findById(uid)

        if (!oldRole || !newRole) {
            return res.status(400).json({
                success: false,
                message: "Se requiere el role anterior y el nuevo role."
            });
        }

        const validRoles = ["ADMIN_ROLE", "CLIENT_ROLE"];
        if (!validRoles.includes(newRole)) {
            return res.status(400).json({
                success: false,
                message: "Rol inválido, solo puede ser ADMIN_ROLE o CLIENT_ROLE."
            });
        }

        if (user.role !== oldRole) {
            return res.status(400).json({
                success: false,
                message: "El role actual no es correcto."
            });
        }

        if(user.role === newRole){
            return res.status(400).json({
                success: false,
                message: "El nuevo role no puede ser igual al anterior"
            })
        }

        user.role = newRole;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Role actualizado",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar role",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try{
        const usuario  = req.usuario;
        const { confirmDelete } = req.body;

        if (!confirmDelete) {
            return res.status(400).json({
                success: false,
                message: "Debes confirmar la eliminación del usuario enviando `confirmDelete: true`."
            });
        }
        
        const user = await User.findByIdAndUpdate(usuario._id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}
