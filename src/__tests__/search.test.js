import { Search } from "../components/fields/search";
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Search component', () => {
  it('snapshot', () => {
    const component = renderer.create(
      <Search />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('render search button', async () => {
    const onSearchMock = jest.fn();
    render(
      <Search onSearch={onSearchMock} />
    );
  
    const inputElement = screen.getByPlaceholderText("Search...");
    const findButtonElement = screen.getByText("Find");
  
    fireEvent.change(inputElement, { target: { value: "test" } });
  
    fireEvent.click(findButtonElement);
  
    expect(onSearchMock).toHaveBeenCalledWith("test");
  })

  it("search function is not called when input is empty", () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);
  
    const findButtonElement = screen.getByText("Find");
  
    fireEvent.click(findButtonElement);
  
    expect(onSearchMock).not.toHaveBeenCalled();
  });
});