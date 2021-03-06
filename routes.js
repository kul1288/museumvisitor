const express = require('express');
const axios = require('axios');

const router = express.Router();

const getVisitors = async (req, res, next) => {
  try {
     if(req.query && req.query.date && req.query.date!='' && req.query.museum && req.query.museum!=''){
       let date = new Date(Number(req.query.date));
       let datestr = date.toISOString();
       let datearr = datestr.split('T');
       let floattimestamp = datearr[0]+'T00:00:00.000';

       //call LA City api
       axios.get('https://data.lacity.org/resource/trxm-jn3c.json?month='+floattimestamp)
        .then(function (response) {
          if(response && response.data && response.data.length>0){
             //create response obj
             const respobj = {
                               month:date.toLocaleString('default', { month: 'short' }),
                               year:date.getFullYear().toString(),
                               museum:req.query.museum,
                               visitors:response.data[0][req.query.museum] && Number(response.data[0][req.query.museum]) || 0                               
                             };
             res.status(200).json({result:respobj});
          }else{
             res.status(200).json({});
          }
        })
        .catch(function (error) {
          next(error);
        })
     }else{
       //throw error if no parameter
       const err = new Error('Missing required parameter');
       err.status = 404;
       throw err;
     }         
  } catch (e) {
    next(e);
  }
};

router
  .route('/api/visitors')
  .get(getVisitors);

module.exports = router;