const  sql = require('mssql');

const serverName = 'lions-services-data-webapp.database.windows.net'
// const serverName = <TO BE DETERMINED THIS IS THE NAME OF THE LIONS SERVER>

tableName = 'Orders'

//Sql Database Configuration
const  config = {
  user:  'website_login', // sql user
  password:  '5TYt8#kA3s*jvtMEa0DC3PP^', //sql user password
  server:  serverName,
  database:  'Production',
  options: {
    trustedconnection:  true,
    enableArithAbort:  true,
  },
  port:  1433
}

//GET Functions for SQL Database
async  function  getTable(tableName) {
  try {
    let  pool = await  sql.connect(config);
    let  products = await  pool.request().query('SELECT * from '+tableName);
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

//POST Functions for SQL Database
async  function  addOrder(order) {
  try {
    let  pool = await  sql.connect(config);
    let  insertProduct = await  pool.request()
      .input('Id', sql.Int, order.id)
      .input('Title', sql.NVarChar, order.title)
      .input('Quantity', sql.Int, order.quantity)
      .input('Message', sql.NVarChar, order.message)
      .input('City', sql.NVarChar, order.city)
    .query('INSERT INTO '+tableName+' VALUES (@Id, @Title, @Quantity, @Message, @City);')
    return  insertProduct.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTable:  getTable,
  addOrder:  addOrder
}