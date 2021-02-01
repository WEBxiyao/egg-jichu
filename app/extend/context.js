const await = require("await-stream-ready/lib/await")

module.exports = {
    async page(model, where = {}, options = {}) {
        const page = this.parmas.page ? parseInt(this.parmas.page) : 0
        const limit = this.query.limit ? parseInt(this.query.limit) : 10
        const offset = (page - 1) * limit
        if (!options) {
            options.order = [
                ['id', 'DESC']
            ]
        }
        return await model.findAll({
            where,
            offset,
            limit,
            ...options
        })
    }
}