import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  console.log(data);
  const params = {
    TableName: data.tableName,
    Item: {
      // The attributes of the item to be created
      id: uuid.v1(), // A unique uuid
      cold: data.cold, // Parsed from request body
      hot: data.hot, // Parsed from request body
      temperate: data.temperate,
      precip: data.precip,
      name: data.name,
      photo: data.photo,
      songLink: data.songLink,
      description: data.description
    },
  };
  await dynamoDb.put(params);
  return params.Item;
});