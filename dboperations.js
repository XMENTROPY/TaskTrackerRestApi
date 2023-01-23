const  sql = require('mssql');

//Sql Database Configuration
const  config = {
  user:  'GeneralUser', // sql user
  password:  'rZln04HZ3$*B', //sql user password
  server:  'task-tracker.database.windows.net',
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
    let  products = await  pool.request().query('SELECT * FROM '+tableName);
    return  products.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

// Creates a new table in the local database and then bulk inserts it to the sql server
// tableStructure is of the sort of form, [{col1:{name: 'col1', dataType: sql.Int}}] or something like that
async function createTable(tableName, tableStructure) {
  try {
    let pool = await sql.connect(config);
    const table = new sql.Table(tableName)
    table.create = true

    for (col in tableStructure) {
      table.columns.add(col.name, col.dataType, {nullable: true })
    }
  
    const request = new sql.Request()
    request.bulk(table, (err, result) => {
    console.log(err)
    })
    }
    catch (error) {
      console.log(error)
    }
}

module.exports = {
  getTable:  getTable,
  createTable: createTable
}