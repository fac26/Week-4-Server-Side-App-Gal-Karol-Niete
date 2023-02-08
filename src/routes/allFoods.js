const { layout, allFood } = require("../templates/template");
const { getAllFoods } = require("../model/food");
const { getSession } = require("../model/session");

function get(request, response) {
  const sid = request.signedCookies.sid;
  const sessionId = getSession(sid);
  const currentUser = sessionId && sessionId.user_id;
  const foodList = getAllFoods();
  const content = allFood(foodList, currentUser);
  const title = "All food";
  const body = layout({title, content})
  response.send (body)  
}

module.exports = {get};