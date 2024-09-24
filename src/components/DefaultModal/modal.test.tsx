import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import DefaultModal from './modal';

vi.mock('@mui/icons-material/Close', () => {
  return {
    __esModule: true,
    default: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}></button>
    ),
  };
});

const DummyComponent = () => {
  return (
    <div>
      <DefaultModal></DefaultModal>
      <button data-testid="close-modal" onClick={closeModal} />
    </div>
  );
};

describe(' Testing modal hook', () => {
  it('should check if modal is rendering children component', () => {
    render(<DummyComponent />);
    const children = screen.getByTestId('children-component');
    expect(children).toBeInTheDocument();
  });

  it('should check if modal is not showing children component when closed', async () => {
    render(<DummyComponent />);
    screen.getByTestId('close-modal').click();

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('children-component')
    );
  });
  it('should close modal when clicking in x icon', async () => {
    render(<DummyComponent />);
    const closeIcon = screen.getByTestId('close-icon');
    closeIcon.click();

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('children-component')
    );
  });
});
