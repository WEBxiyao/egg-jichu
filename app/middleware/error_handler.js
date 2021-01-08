module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            return await next()
        } catch (error) {
            // 框架记录错误日志
            ctx.app.emit('error', error, ctx)
            // 修改状态码
            ctx.status = error.status
            if (ctx.status === 422) {
                return ctx.body = {
                    msg: 'fail',
                    data: error.errors
                }
            }
            ctx.body = {
                msg: 'fail',
                data: error.message
            }
        }
    }
}