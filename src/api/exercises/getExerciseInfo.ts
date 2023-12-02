import {get} from '@api/client';

// FIXME: types below are not complete. I don't add all, because
// i wont use most of them, so i created "shortened" types. Also
// responses from server are very unstable

interface Muscle {
  id: number;
  name: string;
  name_en: string;
  is_front: boolean;
  image_url_main: string;
  image_url_secondary: string;
}

interface Equipment {
  id: number;
  name: string;
}

interface License {
  id: number;
  full_name: string;
  short_name: string;
  url: string;
}

interface Image {
  id: number;
  uuid: string;
  exercise_base: number;
  exercise_base_uuid: string;
  image: string;
  is_main: boolean;
  style: string;
  license: number;
  license_title: string;
  license_object_url: string;
  license_author: string;
  license_author_url: string;
  license_derivative_source_url: string;
  author_history: string[];
}

interface Exercise {
  id: number;
  uuid: string;
  name: string;
  exercise_base: number;
  description: string;
  created: string;
  language: number;
  aliases: string[];
  notes: string[];
  license: number;
  license_title: string;
  license_object_url: string;
  license_author: string;
  license_author_url: string;
  license_derivative_source_url: string;
  author_history: string[];
}

interface Category {
  id: number;
  name: string;
}

export interface ExerciseInfo {
  id: number;
  uuid: string;
  created: string;
  last_update: string;
  last_update_global: string;
  category: Category;
  muscles: Muscle[];
  muscles_secondary: Muscle[];
  equipment: Equipment[];
  license: License;
  license_author: string;
  images: Image[];
  exercises: Exercise[];
  variations: number;
  videos: unknown[];
  author_history: string[];
  total_authors_history: string[];
}

export function getExercisesInfo(exerciseID: number) {
  return get<ExerciseInfo>(`exercisebaseinfo/${exerciseID}/`);
}
