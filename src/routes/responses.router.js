const { Router } = require("express");

const responses = require("../usecases/responses.usecases");
const auth = require("../middlewares/auth.middleware");

const router = new Router();

router.post(
  "/course/:courseId",
  auth(["admin", "user"]),
  async (request, response) => {
    try {
      const userId = request.user._id;
      const courseId = request.params.courseId;
      const responsesSent = request.body.responses;

      const savedResponse = await responses.saveAndEvaluate(
        userId,
        courseId,
        responsesSent
      );

      response.json({
        message: "response saved",
        response: savedResponse,
      });
    } catch (error) {
      response.status(error.status || 500);
      response.json({
        message: error.message,
        error,
      });
    }
  }
);

router.get(
  "/course/:courseId",
  auth(["admin", "user"]),
  async (request, response) => {
    try {
      const userId = request.user._id;
      const { courseId } = request.params;

      const courseResponses = await responses.getByCourseId(userId, courseId);

      response.json({
        message: `responses for ${courseId}`,
        respones: courseResponses,
      });
    } catch (error) {
      response.status(error.status || 500);
      response.json({
        message: error.message,
        error,
      });
    }
  }
);

module.exports = router;
