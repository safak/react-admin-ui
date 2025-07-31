const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/model');
const ApiError = require('../error/ApiError');

class DeviceController {

   
   async create(req, res, next) {

      try{
      console.log('BODY:', req.body);
      console.log('FILES:', req.files);
      let { name, brandId, typeId, price, info } = req.body;
      const {img} = req.files;
      let filename = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, '..', 'static', filename));
      const device = await Device.create({ name, brandId, typeId, price, img: filename });
      if(info){
         info = JSON.parse(info);
         info.forEach(i => {
            DeviceInfo.create({
               title: i.title,
               description: i.description,
               deviceId: device.id
            });
         });
      }

      return res.json(device);
      } catch (e) {
         next(ApiError.badRequest(e.message));
      }

  }

   async getAll(req, res) {
      let { brandId, typeId, limit, page} = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let devices;

      if (!brandId && !typeId) {
         devices = await Device.findAll({limit, offset});
      }
      if (brandId && !typeId) {
         devices = await Device.findAll({where: {brandId},limit, offset});
      }
      if (!brandId && typeId) {
         devices = await Device.findAll({where: {typeId},limit, offset});
      }
      if (brandId && typeId) {
         devices = await Device.findAll({where: {typeId,brandId}, limit, offset});
      }
      return res.json(devices);
  }
  

     async getOne(req, res) {
      const { id } = req.params;

      const device = await Device.findOne(
         {
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
         },
      )
      return res.json(device);
} 
}
module.exports = new DeviceController();