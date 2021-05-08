export interface ExerciseTest {
  call: string;
  result: any;
}

export interface Exercise {
  name: string;
  description?: string;
  baseCode: string;
  solution: string;
  tests: ExerciseTest[];
}
