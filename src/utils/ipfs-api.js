const ipfsAPI = require('ipfs-api');
const fs = require('fs');

export default class IpfsApi {
    ipfs = null;
    constructor(host, port, protocol) {
        if(!this.ipfs){
            if(!host){
                host = process.env.VUE_APP_BASE_HOST;
                port = process.env.VUE_APP_BASE_PORT;
                protocol = process.env.VUE_APP_BASE_PROTOCOL;
            }
            console.log("IpfsApi", host, port, protocol)
            this.ipfs = ipfsAPI({host, port, protocol});
            return this
        }
    }

    /**
     * 上传文件
     * @param path
     * @returns {Promise<unknown>}
     */
    addFiles = path => {
        return new Promise((resolve, reject) => {
            this.ipfs.add(fs.readFileSync(path), function (err, files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    console.log(files);
                    resolve(files)
                }
            })
        })
    }

    /**
     * 临时上传data
     * @param data
     * @returns {Promise<unknown>}
     */
    addDatas = data =>{
        return new Promise((resolve, reject) => {
            this.ipfs.add(Buffer(data), function (err, files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    resolve(files)
                }
            })
        })
    }

    /**
     * 持久上传data
     * @param data
     * @returns {Promise<unknown>}
     */
    addData = async (data) =>{
        return new Promise((resolve, reject) => {
            this.ipfs.add(Buffer(data), (err, files) => {
                if (err || typeof files == "undefined" || files.length == 0) {
                    reject(err)
                } else {
                    this.ipfs.pin.add(files[0].hash, function (errors, data) {
                        if (err || typeof files == "undefined") {
                            reject(errors);
                        } else {
                            resolve(data)
                        }
                    })
                }
            })
        })
    }

    /**
     * 持久存储
     * @param path
     * @returns {Promise<unknown>}
     */
    pinData = path => {
        return new Promise((resolve, reject) => {
            this.ipfs.pin.add(path, function (err, files) {
                console.log('pin', files)
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    resolve(files)
                }
            })
        })
    }

    /**
     * 读取Ipfs 信息
     * @param path
     * @returns {Promise<unknown>}
     */
    getFiles = path =>{
        return new Promise((resolve, reject) => {
            this.ipfs.get(path,function (err,files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    var content = Buffer.from(files[0].content.toString('utf-8'));
                    resolve(content.toString())
                }
            })
        })
    }
}
