import {Category} from 'ts/DAOs';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
}

export default CategoriesState;
