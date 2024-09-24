import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DefaultModal from './modal';

vi.mock('@mui/icons-material/Close', () => {
  return {
    __esModule: true,
    default: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}></button>
    ),
  };
});

const onClose = vitest.fn();
const DummyComponent = () => {
  return (
    <div>
      <DefaultModal title="title" isOpen={true} onClose={onClose}>
        <button data-testid="close-modal" />
      </DefaultModal>
    </div>
  );
};

describe(' Testing modal', () => {
  it('should check if modal is rendering children component', () => {
    render(<DummyComponent />);
    const children = screen.getByTestId('close-modal');
    expect(children).toBeInTheDocument();
  });

  it('should close modal when clicking in x icon', async () => {
    render(<DummyComponent />);
    const closeIcon = screen.getByTestId('close-icon');
    closeIcon.click();

    expect(onClose).toHaveBeenCalled();
  });
});
