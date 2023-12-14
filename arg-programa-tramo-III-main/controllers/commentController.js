const Comment = require('../models/Comment')
const commentController = {}

//AGREGAR COMENTARIO
commentController.createComment = async (req,res) => {
    /**
     * Recibimos los datos del comentario del front y el post donde se realiza,
     * el author viene de la respuesta del middleware de token en req
     */
    try {
        const { post, description } = req.body
        //Creamos el comentario a insertar con los datos que espera el modelo
        const newComment = new Comment({
            description,
            post,
            author: req.uid,
        }) 
    
        await newComment.save() //Método mongoose para guardar en su bd
    
        //Si el comentarios se inserto exitosamente
        res.status(201).json({ok: true, message: 'Comentario agregado'})
        
    } catch (err) {
        res.status(500).json({ok:false, message: 'Hubo un error al intentar guardar el comentario'})
    }
}

//OBTENER COMENTARIOS POR ID DE POST 
commentController.getComments = async (req,res) => {
    try {
        //Recibimos el id desde la barra de direcciones del navegador (params)
        const { id } = req.params


        //Ubicamos en la BD los comentarios por id del post al que le corresponden
        const commentsFound = await Comment.find({ post: id}).populate('author')
        
        //Retorna mediante JSON
        res.status(200).json(commentsFound)
    } catch (err) {
        let message = err        
        if (err.kind === 'ObjectId') message = 'No se pudo obtener el comentario'

        return res.status(500).json({ message, err })
    }
}

//EDITAR COMENTARIO
commentController.editComment = async (req,res) => {
    //Recibimos por body el texto a editar y el id del comentario
    const {description,id} = req.body

    //Localizamos el comentario en la BD por id
    const foundComment = await Comment.findById(id)

    //Comparamos que el autor sea el mismo del que recibimos de la validación de token
    if (foundComment.author.toString() !== req.uid)
        return res
            .status(403)
            .json({ ok: false, message: 'Debe ser el autor del comentario para editarlo' })

    //Si el autor es el mismo editamos el post y respondemos
    await Comment.findByIdAndUpdate(id, { description })
    res.status(200).json({ ok: true, message: 'Comentario editado exitosamente' })
}

//ELIMINAR COMENTARIO
commentController.deleteComment = async (req,res) => {
    try {
        //Solo necesitamos el id del front
        const { id } = req.body    
        
        //Encontramos el post por id en la BD y con el mismo método de mongoose eliminamos
        await Comment.findByIdAndDelete(id)
    
        res.status(200).json({ok: true, message: 'El comentario se elimino exitosamente'})
    
        } catch (err) {
            res.status(500).json({
                ok     : false,
                message: 'Hubo un error al intentar eliminar el comentario'
            })    
        }
}


module.exports = commentController