const app = require("./app");
const ConnectDB = require("./Configs/ConnectDB");
const port = 3000;

// * Connect To DB
(async () => { 
  await ConnectDB();
})();

// * Server Is Listening On 3000
 app.listen(port, () => {
  console.log(`Server started on 3000`);
});
