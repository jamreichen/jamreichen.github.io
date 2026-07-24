import { DEFAULT_FOLLOW_UPS } from "./config.js";
import { normalizeText } from "./utils.js";

export function generateFollowUps(context, intent) {
  const identity = normalizeText(context.map(item => `${item.title} ${item.type} ${item.sourceFile}`).join(" "));
  if (identity.includes("ai first") || identity.includes("artificial intelligence")) {
    return [
      "How does Jamie keep humans in control of AI-assisted workflows?",
      "Where does Jamie use AI across the curriculum lifecycle?",
      "How does Jamie evaluate AI-generated work before publication?"
    ];
  }
  if (identity.includes("software")) {
    return [
      "How does Jamie connect software decisions to business and user needs?",
      "Which project best demonstrates Jamie’s systems thinking?",
      "How does Jamie approach maintainability and scalability?"
    ];
  }
  const byIntent = {
    overview: ["What is Jamie’s strongest interdisciplinary example?", "What problems is Jamie especially prepared to solve?", "What measurable outcomes appear in Jamie’s portfolio?"],
    approach: ["What would Jamie evaluate first?", "How would Jamie define success?", "What implementation risks would Jamie examine?"],
    leadership: ["How does Jamie create clarity across stakeholders?", "How does Jamie lead technical and instructional contributors together?", "What systems support consistency across a team?"],
    teaching: ["How has teaching influenced Jamie’s curriculum decisions?", "How does Jamie respond when learners struggle?", "How does learner evidence influence course revision?"],
    value: ["What measurable outcomes support Jamie’s value?", "What makes Jamie different from a traditional instructional designer?", "Which project best demonstrates Jamie’s impact?"],
    example: ["What problem did that project solve?", "What decisions did Jamie personally lead?", "What documented outcomes resulted from the work?"]
  };
  return byIntent[intent] || DEFAULT_FOLLOW_UPS;
}
