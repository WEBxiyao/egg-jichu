'use strict';

const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')
// 顾名思义，异步二进制写入流
const awaitWriteStream = require('await-stream-ready').write
// 管道读取一个虫洞
const sendToWormhole = require('stream-wormhole')
const dayjs = require('dayjs')
class FileController extends Controller {
    async upload() {
        const { ctx, app } = this
        const stream = await ctx.getFileStream()
        // 基础目录
        const uploadBasePath = 'app/public/uploads'
        // 生成文件名toLocaleLowerCase转化为小写
        const filename = `${Date.now()}${Number.parseInt(
            Math.random() * 1000,
        )}${path.extname(stream.filename).toLocaleLowerCase()}`
        // 生成文件夹
        const dirname = dayjs(Date.now()).format('YYYY/MM/DD')

        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname)
                    return true
                }
            }
        }
        mkdirsSync(path.join(uploadBasePath, dirname))
        // 生成写入路径
        const target = path.join(uploadBasePath, dirname, filename)
        // 写入流
        const writeStream = fs.createWriteStream(target)
        try {
            awaitWriteStream(stream.pipe(writeStream))
        } catch (error) {
            await sendToWormhole(stream)
            ctx.throw(500, err);
        }
        let url = path.join('/public/uploads', dirname, filename).replace(/\\|\//g, '/')

        const { protocol, host } = ctx.request
        url = protocol + '://' + host + url
        console.log(url, "-------------")
    }
}

module.exports = FileController;
