import { render, screen } from '@testing-library/react';
import ExperienceSection from '@/components/sections/Experience';
import { Experience } from '@/lib/types';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockExperiences: Experience[] = [
  {
    id: "work-1",
    title: "Développeur Full Stack",
    organization: "TechCorp Solutions",
    location: "Lyon, France",
    startDate: "2022-07-01",
    endDate: "2024-12-31",
    description: "Développement d'applications web modernes avec React et Next.js.",
    type: "work",
    skills: ["React", "Next.js", "TypeScript"],
    current: false
  },
  {
    id: "education-1",
    title: "Master en Informatique",
    organization: "Université de Technologie",
    location: "Paris, France",
    startDate: "2020-09-01",
    endDate: "2022-06-30",
    description: "Spécialisation en développement web et ingénierie logicielle.",
    type: "education",
    skills: ["JavaScript", "React", "Node.js"]
  }
];

describe('Experience Section', () => {
  test('renders experience section with timeline', () => {
    render(<ExperienceSection experiences={mockExperiences} />);
    
    // Vérifier que le titre de section est présent
    expect(screen.getByText('Expérience & Formation')).toBeInTheDocument();
    
    // Vérifier que la timeline est présente
    expect(screen.getByTestId('experience-timeline')).toBeInTheDocument();
  });

  test('displays all experience information correctly', () => {
    render(<ExperienceSection experiences={mockExperiences} />);
    
    // Vérifier que toutes les expériences sont affichées
    const experienceItems = screen.getAllByTestId('experience-item');
    expect(experienceItems).toHaveLength(2);
    
    // Vérifier les informations de la première expérience
    expect(screen.getByText('Développeur Full Stack')).toBeInTheDocument();
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
    expect(screen.getByText('📍 Lyon, France')).toBeInTheDocument();
    expect(screen.getByText('Développement d\'applications web modernes avec React et Next.js.')).toBeInTheDocument();
    
    // Vérifier les compétences (utiliser getAllByText car "React" apparaît plusieurs fois)
    const reactSkills = screen.getAllByText('React');
    expect(reactSkills.length).toBeGreaterThan(0);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('handles conditional display of optional elements', () => {
    const experienceWithoutLocation: Experience[] = [
      {
        id: "remote-1",
        title: "Développeur Remote",
        organization: "RemoteCorp",
        startDate: "2023-01-01",
        description: "Travail à distance sur des projets web.",
        type: "work"
        // Pas de location, skills, ou endDate
      }
    ];
    
    render(<ExperienceSection experiences={experienceWithoutLocation} />);
    
    // Vérifier que l'expérience est affichée même sans éléments optionnels
    expect(screen.getByText('Développeur Remote')).toBeInTheDocument();
    expect(screen.getByText('RemoteCorp')).toBeInTheDocument();
    
    // Vérifier que "Présent" est affiché quand il n'y a pas de date de fin
    expect(screen.getByText(/Présent/)).toBeInTheDocument();
  });

  test('filters out invalid experiences', () => {
    const invalidExperiences: Experience[] = [
      {
        id: "valid-1",
        title: "Développeur Valid",
        organization: "ValidCorp",
        startDate: "2023-01-01",
        description: "Description valide.",
        type: "work"
      },
      {
        id: "invalid-1",
        title: "", // Titre vide
        organization: "InvalidCorp",
        startDate: "2023-01-01",
        description: "Description valide.",
        type: "work"
      }
    ];
    
    render(<ExperienceSection experiences={invalidExperiences} />);
    
    // Seule l'expérience valide doit être affichée
    const experienceItems = screen.getAllByTestId('experience-item');
    expect(experienceItems).toHaveLength(1);
    expect(screen.getByText('Développeur Valid')).toBeInTheDocument();
    expect(screen.queryByText('InvalidCorp')).not.toBeInTheDocument();
  });

  test('returns null when no valid experiences', () => {
    const { container } = render(<ExperienceSection experiences={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('displays correct type labels and icons', () => {
    const experienceTypes: Experience[] = [
      {
        id: "work-1",
        title: "Job Title",
        organization: "Company",
        startDate: "2023-01-01",
        description: "Work description.",
        type: "work"
      },
      {
        id: "education-1",
        title: "Degree Title",
        organization: "University",
        startDate: "2020-01-01",
        description: "Education description.",
        type: "education"
      }
    ];
    
    render(<ExperienceSection experiences={experienceTypes} />);
    
    // Vérifier les labels de type
    expect(screen.getByText('Expérience')).toBeInTheDocument();
    expect(screen.getByText('Formation')).toBeInTheDocument();
  });
});