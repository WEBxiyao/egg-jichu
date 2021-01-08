'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
    // 用户列表
    async index() {
        // 查询多个
        const Op = this.app.Sequelize.Op
        const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1
        const limit = 3
        const offset = (page - 1) * limit
        this.ctx.throw(500, "故意出错")
        const result = await this.app.model.User.findAll({
            where: {
                // username: {
                //     [Op.like]: '%用户%'
                // }
            },
            // attributes: ['username', 'avatar_url', 'gender']
            attributes: {
                // 排除
                exclude: ['password']
            },
            order: [
                ['id', 'ASC']
            ],
            offset,
            limit,
        })
        // 查询多个计数
        // const result = await this.app.model.User.findAndCountAll()
        this.ctx.body = {
            msg: '0k',
            data: result
        }
    }
    //   读取用户信息(:id传参)查询单个
    async read() {
        const id = parseInt(this.ctx.params.id)
        // const detail = await this.app.model.User.findByPk(id)
        const detail = await this.app.model.User.findOne({
            where: {
                gender: '女'
            }
        })
        this.ctx.body = {
            msg: 'ok',
            data: detail
        }
    }
    //   读取用户信息(?id传参)
    async readQuery() {
        const detail = result.find(v => v.id == this.ctx.query.id)
        this.ctx.body = {
            msg: 'ok',
            data: detail
        }
        this.ctx.status = 202
    }
    // post请求创建用户
    async create() {
        const data = this.ctx.request.body
        // 参数验证
        this.ctx.validate({
            username: {
                type: 'string',
                required: true,
                desc: '账号'
            },
            password: {
                type: 'string',
                required: true,
                desc: '密码'
            },
            gender: {
                type: 'string',
                required: false,
                defValue: '男',
                desc: '性别'
            }
        })
        const res = await this.app.model.User.create(data)
        // const res = await this.app.model.User.bulkCreate([
        //     {
        //         username: '用户1',
        //         password: '密码1',
        //         gender: '男'
        //     },
        //     {
        //         username: '用户2',
        //         password: '密码2',
        //         gender: '女'
        //     },
        //     {
        //         username: '用户3',
        //         password: '密码3',
        //         gender: '男'
        //     },
        //     {
        //         username: '用户4',
        //         password: '密码4',
        //         gender: '男'
        //     },
        // ])
        this.ctx.body = {
            msg: 'ok',
            data: res
        }
    }
    // 修改用户信息
    async update() {
        const id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0
        const data = await this.app.model.User.findOne({
            where: {
                id
            }
        })
        if (!data) {
            return this.ctx.body = {
                msg: 'fail',
                data: '用户不存在'
            }
        }
        // 可以用save()单个修改
        // data.username = "修改了名字123"
        // data.gender = "男"
        // const res = await data.save({ fields: ['username'] })
        // update可以传一个对象修改多个
        const res = await data.update(this.ctx.request.body, { fields: ['username'] })
        this.ctx.body = {
            msg: 'ok',
            data: res
        }
    }
    //删除功能
    async destroy() {
        const id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0
        const data = await this.app.model.User.findByPk(id)
        const Op = this.app.model.Sequelize.Op
        // if (!data) {
        //     return this.ctx.body = {
        //         msg: 'fail',
        //         data: '用户不存在'
        //     }
        // }
        const res = await this.app.model.User.destroy({
            where: {
                id: {
                    [Op.lte]: 4
                }
            }
        })
        this.ctx.body = {
            msg: 'ok',
            data: res
        }
    }
}

module.exports = UserController;
