import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res) => {
        const resultado = await autores.find();
        return res.status(200).json(resultado);
    }

    static listarAutorPorId = async (req, res) => {
        const id = req.params.id;

        try {
            const result = await autores.findById(id)
            return res.status(200).send(result)
        
        } catch (err) {
            return res.status(400).send({message: `${err.message} - Id do Autor não localizado.`})
        }

    }

    static cadastrarAutor = async (req, res) => {
        let autor = new autores(req.body);

        try {
            const result = await autor.save();
            return res.status(201).send(autor.toJSON())
        }

        catch (err) {
            return res.status(500).send({ message: `${err.message} - falha ao cadastrar o Autor.` })
        }
    }

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;

        try {
            const result = await autores.findByIdAndUpdate(id, { $set: req.body })
            return res.status(200).send({ message: 'Autor atualizado com sucesso' })

        } catch (err) {
            return res.status(500).send({message: `${err.message} - Falha ao atualizar`})
        }
    }

    static excluirAutor = async (req, res) => {
        const id = req.params.id;

        try {
           const result = await autores.findByIdAndDelete(id);
           return res.status(200).send({message: 'Autor removido com sucesso'}) 
        
        } catch (err) {
            return res.status(500).send({message: `${err.message} - Não encontrou o Autor desse id`})
        }
        
    }

}

export default AutorController;