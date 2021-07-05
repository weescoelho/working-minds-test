import { render, screen } from '@testing-library/react';

import { Home } from '.';

describe('Home page', () => {
  it('should be rendered in the document', () => {
    render(<Home />);

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
