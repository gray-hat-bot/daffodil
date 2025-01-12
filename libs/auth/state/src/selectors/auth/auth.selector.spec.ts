import { TestBed } from '@angular/core/testing';
import {
  StoreModule,
  combineReducers,
  Store,
  select,
} from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import {
  DaffAuthStateRootSlice,
  DaffAuthReducerState,
  DAFF_AUTH_STORE_FEATURE_KEY,
  daffAuthReducers,
} from '@daffodil/auth/state';
import { DaffStateError } from '@daffodil/core/state';

import { getAuthSelectors } from './auth.selector';

describe('@daffodil/auth/state | getAuthSelectors', () => {
  let store: Store<DaffAuthStateRootSlice>;

  let state: DaffAuthReducerState;
  let loading: boolean;
  let errors: DaffStateError[];
  let loggedIn: boolean;

  const {
    selectAuthLoading,
    selectAuthErrors,
    selectAuthState,
    selectAuthLoggedIn,
  } = getAuthSelectors();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          [DAFF_AUTH_STORE_FEATURE_KEY]: combineReducers(daffAuthReducers),
        }),
      ],
    });

    store = TestBed.inject(Store);

    loading = false;
    errors = [];
    loggedIn = false;
    state = {
      loading,
      errors,
      loggedIn,
    };
  });

  describe('selectAuthState', () => {
    it('selects the auth state', () => {
      const selector = store.pipe(select(selectAuthState));
      const expected = cold('a', { a: state });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthLoading', () => {
    it('selects the loading state of the auth', () => {
      const selector = store.pipe(select(selectAuthLoading));
      const expected = cold('a', { a: loading });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthErrors', () => {
    it('returns the selected auth errors', () => {
      const selector = store.pipe(select(selectAuthErrors));
      const expected = cold('a', { a: errors });
      expect(selector).toBeObservable(expected);
    });
  });

  describe('selectAuthLoggedIn', () => {
    it('returns the logged in state', () => {
      const selector = store.pipe(select(selectAuthLoggedIn));
      const expected = cold('a', { a: loggedIn });
      expect(selector).toBeObservable(expected);
    });
  });
});
