import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-900', 'text-gray-50');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    let badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-900');

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText('Destructive');
    expect(badge).toHaveClass('bg-red-500', 'text-gray-50');

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText('Outline');
    expect(badge).toHaveClass('text-gray-950');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-badge');
  });

  it('renders children correctly', () => {
    render(
      <Badge>
        <span>Badge with icon</span>
      </Badge>
    );
    expect(screen.getByText('Badge with icon')).toBeInTheDocument();
  });

  it('has proper base styling', () => {
    render(<Badge>Styled Badge</Badge>);
    const badge = screen.getByText('Styled Badge');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-md',
      'border',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold'
    );
  });

  it('supports accessibility features', () => {
    render(<Badge role="status" aria-label="Status badge">Active</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Status badge');
    expect(badge).toHaveTextContent('Active');
  });

  it('handles focus properly', () => {
    render(<Badge tabIndex={0}>Focusable Badge</Badge>);
    const badge = screen.getByText('Focusable Badge');
    badge.focus();
    expect(badge).toHaveFocus();
    expect(badge).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('renders with different content types', () => {
    const { rerender } = render(<Badge>Text only</Badge>);
    expect(screen.getByText('Text only')).toBeInTheDocument();

    rerender(
      <Badge>
        <span>🚀</span>
        <span>With emoji</span>
      </Badge>
    );
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('With emoji')).toBeInTheDocument();
  });
});