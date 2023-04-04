const createError = require("http-errors");

const Questions = require("../models/question.model");
const Responses = require("../models/response.model");
const Users = require("../models/users.model");
const Courses = require("../models/course.model");

async function saveAndEvaluate(userId, courseId, responses = []) {
  const user = await Users.findById(userId);
  if (!user) throw new createError(404, "user not found");

  const course = await Courses.findById(courseId);
  if (!course) throw new createError(404, "course not found");

  // validate
  if (responses.length <= 0) throw new createError("responses required");

  const validResponsesFormat = responses.every(
    (response) => response.question && response.value
  );

  if (!validResponsesFormat)
    throw new createError(400, "all responses need question id and value");

  const allQuestionsExists = await Promise.all(
    responses.map((response) => Questions.findById(response.question))
  ).then((questions) => {
    return questions.every((question) => !!question);
  });

  if (!allQuestionsExists)
    throw new createError(400, "not all questions exists in db");

  // validate if responses are correct and calculate score
  let scoreCount = 0;
  let index = 0;
  for (const response of responses) {
    const question = await Questions.findById(response.question).select(
      "+options.isAnswer"
    );
    const answer = question.options.find((q) => q.isAnswer);
    if (answer.value === response.value) {
      scoreCount++;
      responses[index].isCorrect = true;
    }
    index++;
  }
  const courseQuestionsCount = await Questions.find({
    course: course._id,
  }).count();

  const score = (100 * scoreCount) / courseQuestionsCount;
  const response = await Responses.create({
    user: userId,
    course: courseId,
    responses,
    score,
  });
  return response;
}

async function getByCourseId(userId, courseId) {
  const user = await Users.findById(userId);
  if (!user) throw new createError(404, "user not found");

  const course = await Courses.findById(courseId);
  if (!course) throw new createError(404, "course not found");

  return Responses.find({ user: userId, course: courseId }).lean();
}

module.exports = {
  saveAndEvaluate,
  getByCourseId,
};
