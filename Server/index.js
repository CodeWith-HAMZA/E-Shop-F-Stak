const app = require("./app");
const ConnectDB = require("./Configs/ConnectDB");
const port = 3000;
const hostname = 'loaclhost';

// * Connect To DB

ConnectDB()
  .then((success) => console.log(`Successfully Connected To DB ${success}`))
  .catch((err) =>
    console.error(`An Error Occurred During Connecting To DB ${err}`)
  );

// * Server Is Listening On 3000
app.listen(port, () => {
  console.log(`Server started on http://${hostname}:${port}`);
});
