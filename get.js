import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const temperature = event.pathParameters.temp;
    const hotCutoff = 75;
    const coldCutoff = 50;
    var myFilterExpression = "cold = :t AND precip = :precip";
    if (temperature < hotCutoff & temperature > coldCutoff){
        myFilterExpression = "temperate = :t AND precip = :precip";
    }
    else if(temperature >= hotCutoff){
        myFilterExpression = "hot = :t AND precip = :precip";
    }
  const params = {
    TableName: event.pathParameters.tableName,
    FilterExpression: myFilterExpression,
    ExpressionAttributeValues: {
        ':precip' : event.pathParameters.precip,
        ':t' : 'Y'
    }
  };

  const result = await dynamoDb.scan(params);
  // Return the matching list of items in response body
  result.Items.forEach((item) => console.log(item));
  return result.Items[0];
});