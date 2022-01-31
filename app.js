const express = require('express');
const mongoose = require('mongoose')
const show = require('./models/show')

// initiating express
const app = express()

// parsing the body to json
app.use(express.json());

// create new show
app.post('/', async (req, res) => {
    const newshow = new show({
        title: req.body.title,
        rating: req.body.rating,
    })
    try {
        await newshow.save()
        res.json(newshow)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// read all shows
app.get('/', async (req, res) => {
    try {
        const shows = await show.find()
        return res.json(shows)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// read a specific show 
app.get('/:id', async (req, res) => {
    const id = req.params.id
    if (!show.exists({ _id: id })) {
        return res.status(400).json({ msg: 'Enter valid id' })
    }
    else {
        const myshow = await show.find({ _id: id })
        return res.json(myshow)
    }

})

// update a show
app.patch('/:id', async (req, res) => {
    const id = req.params.id

    if (show.exists({ _id: id })) {
        try {
            await show.updateOne(
                { _id: id },
                {
                    $set: {
                        title: req.body.title,
                        rating: req.body.rating,
                        date_added: new Date()
                    }
                }
            )
            const updatedshow = await show.find({ _id: id })
            res.json(updatedshow)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }


})


// delete a show
app.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (show.exists({ _id: id })) {
        try {
            await show.remove({ _id: id })
            return res.json({ msg: `show with id:${id} was deleted` })
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }
    return res.status(400).json(error.message)
})

const PORT = 4000

// my dotenv is not working :"(, I will change the username and pass so dont worry :)
const url = 'mongodb+srv://GRU:mongo@cluster0.yfidh.mongodb.net/CrudApp?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedtopology: true }).then(() => {
    app.listen(PORT, () => console.log(`sever runing on ${PORT}`))
}).catch(error => {
    console.log(error.message);
})
