const Post = require('../models/Post')
/**
 * Usa el modelo de comments para rellenar la cantidad de comentarios, 
 * el numero que se ve en cada post en la pagina principal cuando carga todos.
 */
const Comment        = require('../models/Comment')
const PostController = {}

//CREAR POST
PostController.createPost = async (req,res) => {
    /**
     * Recibimos los datos del formularios de creación de post del front,
     * el author viene de la respuesta del middleware de token en req
     */
    const { title, description, imageURL } = req.body

    try {
        //Creamos el post a insertar con los datos que espera el modelo
        const newPost = new Post({
            title,
            description,
            author: req.uid,
            imageURL,
        })

        const createPost = await newPost.save() //método mongoose para guardar en BD

        //Si se inserto exitosamente en db
        res.status(201).json({
            ok: true,
            message: 'Publicación creada exitosamente',
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

//OBTENER TODOS LOS POSTS Y CANTIDAD DE COMENTARIOS
PostController.getAll = async (req, res) => {
    try {
        /**
         * Los post al crearse no tienen comentarios, es por eso que primero los localizamos
         */
        const findPost = await Post.find({},'-__v').populate('author','-password -__v')

        /**
         * Función que se encarga de buscar los comentarios en la colección comments, y encontrar los que corresponde por id
         * al post que esta iterando (ya que vamos a cargar todos los posts)
         * esta función se llama cuando se itera todos los post
         */
        const getCommentLength = async (id) => {
            const commentsFound = await Comment.find({ post: id})
            return commentsFound.length            
        }
        /**
         * Iteramos en todos los posts.
         * Por cada post cargado, si hay comentarios que correspondan con su id (getCommentLength) guardamos la cantidad total
         * para mostrar su numero en las tarjetas de cada post
         */ 
        const postAndComments = await Promise.all( //Espera que todas las promesas se cumplan
            findPost.map(async (post) => {
                const numberComments = await getCommentLength(post._id)   
                await Post.findByIdAndUpdate(post._id, { comments: numberComments }) //Guardamos en la bd Comments la cantidad de comentarios de el post iterado
                return { ...post.toObject(), comments: numberComments }              //Se asegura de incluir los comentarios en el objeto que devuelve
            })
        )

        //Al final lo que retornamos son todos los post con la cantidad de comentarios correspondientes
        return res.status(200).json(postAndComments);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ok:false, message: 'ocurrió un error'});
    }
}

//VER POST POR ID
PostController.getPost = async (req, res) => {
    try {
        //Recibimos el id desde la barra de direcciones del navegador (params)
        const { id } = req.params

        //Ubicamos en la BD por id
        const postFound = await Post.findById(id)

        //Simplemente lo regresamos por json
        res.status(200).json(postFound)
    } catch (err) {
        let message = err
        if (err.kind === 'ObjectId') message = 'No se pudo obtener la publicación'
        return res.status(500).json({ message, err })
    }
}

//EDITAR POST
PostController.editPost = async (req, res) => {
    try {
        /**
         * Recibimos el id desde la barra de direcciones del navegador (params)
         * y los datos a editar por body
         */
        const { id } = req.params
        const { title, description, imageURL } = req.body

        //Ubicamos en la BD por id
        const foundPost = await Post.findById(id)

        //Comparamos que el autor sea el mismo del que recibimos de la validación de token
        if (foundPost.author.toString() !== req.uid)
            return res
                .status(403)
                .json({ ok: false, message: 'Debe ser el autor del post para editarlo' })

        //Si el autor es el mismo editamos el post y respondemos
        await Post.findByIdAndUpdate(id, { title, description, imageURL })
        res.status(200).json({ ok: true, message: 'Poste editado exitosamente' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Ocurrió un error al intentar editar la publicación',
            err,
        })
    }
}

//ELIMINAR POST
PostController.deletePost = async (req, res) => {
    try {
    //Solo necesitamos el id del front
    const { id } = req.body    
    
    //Encontramos el post por id en la BD y con el mismo método de mongoose eliminamos
    await Post.findByIdAndDelete(id)

    res.status(200).json({ok: true, message: 'El post se elimino exitosamente'})

    } catch (err) {
        res.status(500).json({
            ok:false,
            message: 'Hubo un error al intentar eliminar el post'
        })    
    }
}

module.exports = PostController