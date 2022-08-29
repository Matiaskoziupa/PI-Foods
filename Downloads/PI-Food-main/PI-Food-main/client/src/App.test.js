import { render, screen } from '@testing-library/react';
import App from './App';
import rootReducer from "./reducer/index";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe("Reducer", () => {
  const state = {
    recipes:[],
    allRecipes:[],
    diets:[],
    detail:[]
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({
      recipes:[],
      allRecipes:[],
      diets:[],
      detail:[]
    });
  });
});