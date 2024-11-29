import { connect } from "mongoose";

export default (async () => {
  try {
    await connect("mongodb://mongo-db-2:27017/election");
  } catch (err) {
    console.error("Can't connect to mongo", err);
  }
});
