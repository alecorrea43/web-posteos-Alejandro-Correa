const mongoose = require('mongoose')

/**
 * Modelo de los Posteos que realizan los usuarios en la base de datos
 */


const PostSchema = new mongoose.Schema({
    title: {
        type    : String,
        required: true,

    },
    description: {
        type    : String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    comments: {
            type   : Number,
            default: 0
        },    
    imageURL: {
        type    : String,
        required: true
    },
    createdAt: {
        type   : Date,
        default: Date.now,
    },    
})

//Esto hace que la fecha se guarde en un formato mas estándar YYYY/MM/DD
PostSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.createdAt = ret.createdAt.toISOString().slice(0, 10);
    },
});


const Post = mongoose.model('Post', PostSchema)

module.exports = Post


