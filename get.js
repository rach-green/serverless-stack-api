import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const temperature = event.pathParameters.temp;
    const hotCutoff = 75;
    const coldCutoff = 50;
    const tableName = event.pathParameters.tableName;
    var myFilterExpression = "cold = :t AND precip = :precip";
    if (temperature < hotCutoff & temperature > coldCutoff){
        myFilterExpression = "temperate = :t AND precip = :precip";
    }
    else if(temperature >= hotCutoff){
        myFilterExpression = "hot = :t AND precip = :precip";
    }
  const params = {
    TableName: tableName,
    FilterExpression: myFilterExpression,
    ExpressionAttributeValues: {
        ':precip' : event.pathParameters.precip,
        ':t' : 'Y'
    }
  };

  const result = await dynamoDb.scan(params);
  console.log(result);
  if (result.Count == 0){
    if(tableName == "tahoe-food-1"){
      var params = {
        TableName: 'tahoe-food-1',
        Key: {
          'KEY_NAME': {id: '8594d342-cae5-11eb-b8bc-0242ac130003'}
        }
      };
      const res = await dynamoDb.get(params);
      return res;
    }
    else if(tableName == "tahoe-activities-1"){
      var params = {
        TableName: 'tahoe-activities-1',
        Key: {
          'KEY_NAME': {id: '65de5f00-cae5-11eb-b8bc-0242ac130003'}
        }
      };
      const res = await dynamoDb.get(params);
      return res;
    }
    else{
      var params = {
        TableName: 'tahoe-songs-1',
        Key: {
          'KEY_NAME': {id: 'ab2414ba-cae5-11eb-b8bc-0242ac130003'}
        }
      };
      const res = await dynamoDb.get(params);
      return res;
    }
  }
  else{
    const index = Math.floor(Math.random() * (result.Count));
  }
  const index = Math.floor(Math.random() * (result.Count));
  return result.Items[index];
});