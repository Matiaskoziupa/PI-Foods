// import { render, screen } from '@testing-library/react';
// import App from './App';
import {getFilterByDiets} from "./actions/index"

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();

// })
describe('Action - Tests:', ()=>{
  it('Debe retornar una action con las propiedades type "GET_FILTER_BY_DIETS" y payload, su valor lo recibe por argumento', ()=>{
      expect(getFilterByDiets('Action')).toEqual({
          type: "GET_FILTER_BY_DIETS",
          payload: 'Action'
      })
  })
})