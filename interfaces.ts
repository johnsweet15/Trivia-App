export interface TokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoriesResponse {
  trivia_categories: Array<Category>;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export interface QuestionsResponse {
  response_code: number;
  results: Array<Question>;
}
