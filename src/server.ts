import app from "./index";

import './infra/providers/kafka/consumers';

const port = process.env.SERVER_EXPRESS_PORT || 3002;

app.listen(port);
