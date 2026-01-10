import React from 'react';
import { render, screen } from '@/__tests__/utils/test-utils';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default styling', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-xl', 'border', 'bg-white', 'shadow');
    });

    it('applies custom className', () => {
      render(<Card className="custom-card" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
    });

    it('renders children correctly', () => {
      render(
        <Card>
          <div>Child content</div>
        </Card>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders with proper styling', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 element with proper styling', () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('font-semibold', 'leading-none', 'tracking-tight');
      expect(title).toHaveTextContent('Card Title');
    });
  });

  describe('CardDescription', () => {
    it('renders with proper styling', () => {
      render(<CardDescription>Card description</CardDescription>);
      const description = screen.getByText('Card description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-gray-500');
    });
  });

  describe('CardContent', () => {
    it('renders with proper styling', () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('p-6', 'pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with proper styling', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });
  });

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Project Title</CardTitle>
            <CardDescription>Project description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Main content of the card</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Project Title' })).toBeInTheDocument();
      expect(screen.getByText('Project description goes here')).toBeInTheDocument();
      expect(screen.getByText('Main content of the card')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    it('maintains semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
            <CardDescription>This card follows accessibility guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            Content is properly structured
          </CardContent>
        </Card>
      );

      // Check that the title is properly structured as a heading
      const title = screen.getByRole('heading');
      expect(title).toHaveTextContent('Accessible Card');
      
      // Check that description and content are present
      expect(screen.getByText('This card follows accessibility guidelines')).toBeInTheDocument();
      expect(screen.getByText('Content is properly structured')).toBeInTheDocument();
    });
  });
});