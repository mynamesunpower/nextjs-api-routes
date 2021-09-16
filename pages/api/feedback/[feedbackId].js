import { buildFeedbackPath, extractFeedback } from "./index";

export default function handler(request, response) {
  const { feedbackId } = request.query;

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const selectedFeedback = data.find((item) => item.id === feedbackId);
  response.status(200).json({ feedback: selectedFeedback });
}
