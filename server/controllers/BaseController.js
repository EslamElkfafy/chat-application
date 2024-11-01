module.exports = function BaseController(model)
{
    return {
        async addOne(req, res, next)
        {
            try {
                let entity = new model(req.body)
                entity = await entity.save()
                res.status(201).json(entity)
            } catch(e) {
                res.status(500)
                next(e.message)
            }
        },
        async findById(req, res, next)
        {
            try {
                let entity = await model.findById(req.params.id)
                if (!entity)
                {
                    res.status(404)
                    return next("The requested is not found")
                }
                res.status(200).json(entity)
            } catch(e) {
                res.status(500)
                next(e.message)
            }
        },
        async find(req, res, next)
        {
            let query = {}
            for (q in req.query) {
                if (req.query[q])
                    query[q] = req.query[q]
            }
            try {
                let entities = await model.find(query)
                res.status(200).json(entities)
            } catch(e) {
                res.status(500)
                next(e.message)
            }
        },
        async edit(req, res, next)
        {
            try {
                let entity = await model.findById(req.params.id)
                if (!entity) 
                {
                    res.status(404)
                    next("The requested not found")
                }
                for (let key in req.body) 
                {
                    entity[key] = req.body[key]
                }
                await entity.save()
                res.status(200).json(entity)
            } catch(e) {
                res.status(500)
                next(e.message)
            }
        },
        async remove(req, res, next)
        {
            try {
                let entity = await model.findByIdAndUpdate(req.params.id, {hidden: true})
                if (!entity)
                {
                    res.status(404)
                    next("The requested not found")
                }
                res.status(200).json(entity)
            } catch(e) {
                res.status(500)
                next(e.message)
            }
        }
    }
}
