import * as fc from 'fast-check';
import { personalInfoGenerator } from '../utils/generators';
import { personalInfo } from '@/data/personal';
import { PersonalInfo } from '@/lib/types';

describe('Personal Data Property Tests', () => {
  /**
   * Feature: portfolio-personnel, Property 1: Affichage complet des informations personnelles
   * Validates: Requirements 1.2
   */
  test('Property 1: All personal information fields should be present and non-empty', () => {
    fc.assert(
      fc.property(personalInfoGenerator, (generatedPersonalInfo: PersonalInfo) => {
        // Test that all required fields are present and non-empty
        expect(generatedPersonalInfo.fullName).toBeDefined();
        expect(generatedPersonalInfo.fullName.trim()).not.toBe('');
        
        expect(generatedPersonalInfo.role).toBeDefined();
        expect(generatedPersonalInfo.role.trim()).not.toBe('');
        
        expect(generatedPersonalInfo.catchphrase).toBeDefined();
        expect(generatedPersonalInfo.catchphrase.trim()).not.toBe('');
        
        expect(generatedPersonalInfo.avatar).toBeDefined();
        expect(generatedPersonalInfo.avatar.trim()).not.toBe('');
        
        expect(generatedPersonalInfo.cvUrl).toBeDefined();
        expect(generatedPersonalInfo.cvUrl.trim()).not.toBe('');
        
        // Test that all fields have reasonable lengths
        expect(generatedPersonalInfo.fullName.length).toBeGreaterThan(0);
        expect(generatedPersonalInfo.role.length).toBeGreaterThan(0);
        expect(generatedPersonalInfo.catchphrase.length).toBeGreaterThan(0);
        expect(generatedPersonalInfo.avatar.length).toBeGreaterThan(0);
        expect(generatedPersonalInfo.cvUrl.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  test('Static personal data should conform to PersonalInfo interface', () => {
    // Test that our static data conforms to the expected structure
    expect(personalInfo.fullName).toBeDefined();
    expect(typeof personalInfo.fullName).toBe('string');
    expect(personalInfo.fullName.trim()).not.toBe('');
    
    expect(personalInfo.role).toBeDefined();
    expect(typeof personalInfo.role).toBe('string');
    expect(personalInfo.role.trim()).not.toBe('');
    
    expect(personalInfo.catchphrase).toBeDefined();
    expect(typeof personalInfo.catchphrase).toBe('string');
    expect(personalInfo.catchphrase.trim()).not.toBe('');
    
    expect(personalInfo.avatar).toBeDefined();
    expect(typeof personalInfo.avatar).toBe('string');
    expect(personalInfo.avatar.trim()).not.toBe('');
    
    expect(personalInfo.cvUrl).toBeDefined();
    expect(typeof personalInfo.cvUrl).toBe('string');
    expect(personalInfo.cvUrl.trim()).not.toBe('');
  });
});