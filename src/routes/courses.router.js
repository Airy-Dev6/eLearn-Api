const { Router } = require("express");
const createError = require("http-errors");

const courses = require("../usecases/courses.usecases");
const auth = require("../middlewares/auth.middleware");

const router = new Router();

router.post("/", auth(["admin"]), async (request, response) => {
  try {
    const { name, description, image, questions } = request.body;
    if (name.length <= 0) throw new createError(403, "name required");
    if (description.length <= 0)
      throw new createError(403, "description required");
    if (image.length <= 0) throw new createError(403, "image required");

    const newCourse = await courses.create(name, description, image, questions);

    response.json({
      message: "course created",
      course: newCourse,
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error,
    });
  }
});

router.get("/", auth(["admin", "user"]), async (request, response) => {
  try {
    const allCourses = await courses.getAll();
    response.json({
      message: "all courses",
      courses: allCourses,
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error,
    });
  }
});

router.get("/:id", auth(["admin", "user"]), async (request, response) => {
  try {
    const allCourses = await courses.getById(request.params.id);
    response.json({
      message: "all courses",
      course: allCourses,
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      message: error.message,
      error,
    });
  }
});

module.exports = router;
