import {get} from '@api/client';
import axios from 'axios';

// FIXME: types below are not complete. I don't add all, because
// i wont use most of them, so i created "shortened" types. Also
// responses from server are very unstable

interface Muscles {
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

interface Image {
  id: number;
  uuid: string;
  exercise_base: number;
  exercise_base_uuid: string;
  image: string;
  is_main: boolean;
}

export interface ExerciseInstance {
  id: number;
  name: string;
  uuid: string;
  exercise_base_id: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
  muscles: Muscles[] | [];
  muscles_secondary: Muscles[];
  equipment: Equipment[] | [];
  language: {
    id: number;
    short_name: string;
    full_name: string;
  };
  images: Image[] | [];
}

export interface ExercisesListResponse {
  count: number;
  next: string;
  previous: string;
  results: ExerciseInstance[];
}

export function getExercisesList() {
  return get<ExercisesListResponse>('exerciseinfo/?limit=25&offset=35');
  // return axios.get('exerciseinfo');
}
