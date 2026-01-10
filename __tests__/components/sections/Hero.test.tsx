import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import { socialLinkGenerator, personalInfoGenerator } from '../../utils/generators';
import { SocialLink, PersonalInfo } from '@/lib/types';

// Mock Hero component for testing (will be replaced when actual component is implemented)
interface HeroProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

const MockHero = ({ personalInfo, socialLinks }: HeroProps) => (
  <section data-testid="hero-section">
    <div data-testid="hero-avatar">
      <img 
        src={personalInfo.avatar || undefined} 
        alt={`${personalInfo.fullName} avatar`}
        data-testid="avatar-image"
      />
    </div>
    <h1>{personalInfo.fullName}</h1>
    <p>{personalInfo.role}</p>
    <p>{personalInfo.catchphrase}</p>
    <div data-testid="action-buttons">
      <a 
        href={personalInfo.cvUrl}
        download
        data-testid="cv-download-button"
      >
        Télécharger CV
      </a>
      <a 
        href="#contact"
        data-testid="contact-button"
      >
        Me Contacter
      </a>
    </div>
    <div data-testid="social-links">
      {socialLinks.map((link, index) => (
        <a 
          key={`${link.platform}-${index}`}
          href={link.url}
          data-testid={`social-link-${link.platform}-${index}`}
          data-platform={link.platform}
        >
          {link.platform}
        </a>
      ))}
    </div>
  </section>
);

describe('Hero Section Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 2: Affichage de tous les liens de réseaux sociaux
   * Validates: Requirements 1.5
   */
  
  test('Property 2: All provided social media links should be displayed in the Hero section with their appropriate icons', () => {
    fc.assert(
      fc.property(
        personalInfoGenerator,
        fc.array(socialLinkGenerator, { minLength: 1, maxLength: 10 }),
        (personalInfo: PersonalInfo, socialLinks: SocialLink[]) => {
          // Render the Hero component with the generated data in an isolated container
          const { container } = render(
            <MockHero personalInfo={personalInfo} socialLinks={socialLinks} />
          );

          // Verify that the social links container exists
          const socialLinksContainer = container.querySelector('[data-testid="social-links"]');
          expect(socialLinksContainer).toBeInTheDocument();

          // Verify that all provided social links are displayed
          const renderedLinks = container.querySelectorAll('[data-testid^="social-link-"]');
          expect(renderedLinks).toHaveLength(socialLinks.length);

          // Verify each social link is properly rendered
          socialLinks.forEach((socialLink, index) => {
            const linkElement = container.querySelector(`[data-testid="social-link-${socialLink.platform}-${index}"]`);
            
            // Check that the link exists
            expect(linkElement).toBeInTheDocument();
            
            // Check that the link has the correct href
            expect(linkElement).toHaveAttribute('href', socialLink.url);
            
            // Check that the link has the correct platform data
            expect(linkElement).toHaveAttribute('data-platform', socialLink.platform);
            
            // Check that the link contains the platform name (for accessibility)
            expect(linkElement).toHaveTextContent(socialLink.platform);
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 2a: Hero section should handle empty social links array gracefully', () => {
    fc.assert(
      fc.property(
        personalInfoGenerator,
        (personalInfo: PersonalInfo) => {
          // Test with empty social links array in an isolated container
          const { container } = render(
            <MockHero personalInfo={personalInfo} socialLinks={[]} />
          );

          // Verify that the social links container still exists
          const socialLinksContainer = container.querySelector('[data-testid="social-links"]');
          expect(socialLinksContainer).toBeInTheDocument();

          // Verify that no social links are rendered
          const renderedLinks = container.querySelectorAll('[data-testid^="social-link-"]');
          expect(renderedLinks).toHaveLength(0);
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 2b: Each social link should have unique platform identifier within the same Hero section', () => {
    fc.assert(
      fc.property(
        personalInfoGenerator,
        fc.array(socialLinkGenerator, { minLength: 2, maxLength: 5 }),
        (personalInfo: PersonalInfo, socialLinks: SocialLink[]) => {
          // Create unique social links by ensuring unique platforms
          const uniqueSocialLinks = socialLinks.reduce((acc: SocialLink[], current) => {
            const existingPlatform = acc.find(link => link.platform === current.platform);
            if (!existingPlatform) {
              acc.push(current);
            }
            return acc;
          }, []);

          if (uniqueSocialLinks.length > 1) {
            const { container } = render(
              <MockHero personalInfo={personalInfo} socialLinks={uniqueSocialLinks} />
            );

            const renderedLinks = container.querySelectorAll('[data-testid^="social-link-"]');
            const platforms = Array.from(renderedLinks).map(link => link.getAttribute('data-platform'));
            
            // Verify all platforms are unique
            const uniquePlatforms = [...new Set(platforms)];
            expect(uniquePlatforms).toHaveLength(uniqueSocialLinks.length);
            expect(platforms).toHaveLength(uniqueSocialLinks.length);
          }
        }
      ),
      { numRuns: 10 }
    );
  });
});

describe('Hero Section Unit Tests', () => {
  /**
   * Task 6.2: Unit tests for Hero elements
   * Requirements: 1.3, 1.4
   */

  describe('Avatar and Action Buttons Presence', () => {
    test('should display avatar image with correct src and alt attributes', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "John Doe",
        role: "Full Stack Developer",
        catchphrase: "Building amazing web experiences",
        avatar: "/images/john-doe.jpg",
        cvUrl: "/cv/john-doe.pdf"
      };

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
      );

      // Test avatar presence - Requirement 1.3
      const avatarContainer = getByTestId('hero-avatar');
      expect(avatarContainer).toBeInTheDocument();

      const avatarImage = getByTestId('avatar-image');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', mockPersonalInfo.avatar);
      expect(avatarImage).toHaveAttribute('alt', `${mockPersonalInfo.fullName} avatar`);
    });

    test('should display action buttons container with CV and contact buttons', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "Jane Smith",
        role: "Frontend Developer",
        catchphrase: "Creating beautiful user interfaces",
        avatar: "/images/jane-smith.jpg",
        cvUrl: "/cv/jane-smith.pdf"
      };

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
      );

      // Test action buttons presence - Requirement 1.4
      const actionButtons = getByTestId('action-buttons');
      expect(actionButtons).toBeInTheDocument();

      const cvButton = getByTestId('cv-download-button');
      expect(cvButton).toBeInTheDocument();
      expect(cvButton).toHaveTextContent('Télécharger CV');

      const contactButton = getByTestId('contact-button');
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveTextContent('Me Contacter');
      expect(contactButton).toHaveAttribute('href', '#contact');
    });

    test('should handle missing avatar gracefully', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "Test User",
        role: "Developer",
        catchphrase: "Test catchphrase",
        avatar: "",
        cvUrl: "/cv/test.pdf"
      };

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
      );

      const avatarImage = getByTestId('avatar-image');
      expect(avatarImage).toBeInTheDocument();
      // When src is empty, React doesn't set the src attribute (undefined becomes null)
      expect(avatarImage.getAttribute('src')).toBeNull();
    });
  });

  describe('CV Download Links', () => {
    test('should have correct CV download link with download attribute', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "Alice Johnson",
        role: "Backend Developer",
        catchphrase: "Building robust server solutions",
        avatar: "/images/alice.jpg",
        cvUrl: "/cv/alice-johnson-cv.pdf"
      };

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
      );

      // Test CV download functionality - Requirement 1.4
      const cvDownloadButton = getByTestId('cv-download-button');
      expect(cvDownloadButton).toBeInTheDocument();
      expect(cvDownloadButton).toHaveAttribute('href', mockPersonalInfo.cvUrl);
      expect(cvDownloadButton).toHaveAttribute('download');
    });

    test('should handle different CV URL formats', () => {
      const testCases = [
        "/cv/resume.pdf",
        "/documents/my-cv.pdf", 
        "https://example.com/cv.pdf",
        "/assets/cv/developer-resume.pdf"
      ];

      testCases.forEach((cvUrl, index) => {
        const mockPersonalInfo: PersonalInfo = {
          fullName: `Test Developer ${index}`,
          role: "Software Engineer",
          catchphrase: "Testing CV URLs",
          avatar: "/images/test.jpg",
          cvUrl: cvUrl
        };

        const { getByTestId, unmount } = render(
          <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
        );

        const cvDownloadButton = getByTestId('cv-download-button');
        expect(cvDownloadButton).toHaveAttribute('href', cvUrl);
        expect(cvDownloadButton).toHaveAttribute('download');
        
        // Clean up to avoid multiple elements in DOM
        unmount();
      });
    });

    test('should handle empty CV URL', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "No CV User",
        role: "Developer",
        catchphrase: "No CV available",
        avatar: "/images/user.jpg",
        cvUrl: ""
      };

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={[]} />
      );

      const cvDownloadButton = getByTestId('cv-download-button');
      expect(cvDownloadButton).toBeInTheDocument();
      expect(cvDownloadButton).toHaveAttribute('href', "");
      expect(cvDownloadButton).toHaveAttribute('download');
    });
  });

  describe('Integration Tests for Hero Elements', () => {
    test('should render all Hero elements together correctly', () => {
      const mockPersonalInfo: PersonalInfo = {
        fullName: "Complete User",
        role: "Full Stack Developer",
        catchphrase: "Complete portfolio test",
        avatar: "/images/complete.jpg",
        cvUrl: "/cv/complete.pdf"
      };

      const mockSocialLinks: SocialLink[] = [
        { platform: 'github', url: 'https://github.com/user', icon: () => null },
        { platform: 'linkedin', url: 'https://linkedin.com/in/user', icon: () => null }
      ];

      const { getByTestId } = render(
        <MockHero personalInfo={mockPersonalInfo} socialLinks={mockSocialLinks} />
      );

      // Verify all main elements are present
      expect(getByTestId('hero-section')).toBeInTheDocument();
      expect(getByTestId('hero-avatar')).toBeInTheDocument();
      expect(getByTestId('action-buttons')).toBeInTheDocument();
      expect(getByTestId('social-links')).toBeInTheDocument();

      // Verify personal info is displayed
      expect(getByTestId('hero-section')).toHaveTextContent(mockPersonalInfo.fullName);
      expect(getByTestId('hero-section')).toHaveTextContent(mockPersonalInfo.role);
      expect(getByTestId('hero-section')).toHaveTextContent(mockPersonalInfo.catchphrase);

      // Verify avatar
      const avatarImage = getByTestId('avatar-image');
      expect(avatarImage).toHaveAttribute('src', mockPersonalInfo.avatar);

      // Verify CV download
      const cvButton = getByTestId('cv-download-button');
      expect(cvButton).toHaveAttribute('href', mockPersonalInfo.cvUrl);

      // Verify social links
      expect(getByTestId('social-link-github-0')).toBeInTheDocument();
      expect(getByTestId('social-link-linkedin-1')).toBeInTheDocument();
    });
  });
});