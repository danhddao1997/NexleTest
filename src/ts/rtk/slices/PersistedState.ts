import {Category, User} from 'ts/DAOs';

interface PersistedState {
  user?: User;
  selectedCategories: Category['id'][];
}

export default PersistedState;
