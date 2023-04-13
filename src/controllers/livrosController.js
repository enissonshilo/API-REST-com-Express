import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async (req, res) => {
        const resultado = await livros.find().populate('autor').exec();
        return res.status(200).json(resultado);
    }

    static listarLivroPorId = async (req, res) => {
        const id = req.params.id;

        try {
            const resultado = await livros.findById(id).populate('autor', 'nome').exec();
            return res.status(200).send(resultado)

        } catch (err) {
            return res.status(400).send({ message: `${err.message} - Id do livro não localizado.` })
        }

    }

    static cadastrarLivro = async (req, res) => {
        let livro = new livros(req.body);

        try {
            const result = await livro.save();
            return res.status(201).send(livro.toJSON())
        }

        catch (err) {
            return res.status(500).send({ message: `${err.message} - falha ao cadastrar o livro.` })
        }
    }

    static atualizarLivro = async (req, res) => {
        const id = req.params.id;

        try {
            const result = await livros.findByIdAndUpdate(id, { $set: req.body })
            return res.status(200).send({ message: 'Livro atualizado com sucesso' })

        } catch (err) {
            return res.status(500).send({ message: `${err.message} - Falha ao atualizar` })
        }
    }

    static excluirLivro = async (req, res) => {
        const id = req.params.id;

        try {
            const result = await livros.findByIdAndDelete(id);
            return res.status(200).send({ message: 'Livro removido com sucesso' })

        } catch (err) {
            return res.status(500).send({ message: `${err.message} - Não encontrou o livro desse id` })
        }

    }

    static listarLivroPorEditora = async (req, res) => {
        const editora = req.query.editora

        try {
            const result = await livros.find({ 'editora': editora }, {})
                res.status(200).send(result);
            

        }
        catch (err) {
            res.status(404).send(`${err.message} - Falha na busca pela editora.`)
        }
    }

}

export default LivroController;