const createError = require("http-errors");
const Courses = require("../models/course.model");
const Questions = require("../models/question.model");

async function create(name, description, image, questions = []) {
  const existingCourse = await Courses.findOne({ name });
  if (existingCourse) throw new createError(403, "name already in use");

  if (questions.length <= 0) throw new createError(400, "questions required");

  const allQuestionsHaveOptions = questions.every(
    (question) => question.options.length > 0
  );
  if (!allQuestionsHaveOptions)
    throw new createError(400, "all questions need options");

  const allQuestionsHaveAnswers = questions.every((question) => {
    const answers = question.options.filter((option) => !!option.isAnswer);
    return answers.length === 1;
  });
  if (!allQuestionsHaveAnswers)
    throw new createError(400, "all questions need only one answer");

  const course = await Courses.create({ name, description, image });

  await Promise.all(
    questions.map((question) =>
      Questions.create({ ...question, course: course._id })
    )
  );

  return course;
}

async function getAll() {
  const allCourses = await Courses.find();
  return allCourses;
}

async function getById(id) {
  const course = await Courses.findById(id).lean();
  if (!course) throw new createError(404, "Course not found");

  const questions = await Questions.find({ course: course._id });

  return {
    ...course,
    questions,
  };
}

module.exports = {
  create,
  getAll,
  getById,
};
