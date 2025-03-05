import { Schema, model } from "mongoose";
 
const cartSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{ 
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active'
    }
},{
    versionKey: false,
    timeStamps: true
})
export default model('Cart', cartSchema);