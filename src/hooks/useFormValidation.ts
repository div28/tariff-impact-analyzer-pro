import { useState, useEffect } from 'react';

interface FormData {
  imports: string;
  countries: string[];
  monthlyValue: string;
}

interface ValidationErrors {
  imports?: string;
  countries?: string;
  monthlyValue?: string;
}

export const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors: ValidationErrors = {};

    // Validate imports
    if (!formData.imports.trim()) {
      newErrors.imports = 'Please describe what you import';
    } else if (formData.imports.trim().length < 3) {
      newErrors.imports = 'Please provide more details about your imports';
    }

    // Validate countries
    if (formData.countries.length === 0) {
      newErrors.countries = 'Please select at least one country';
    }

    // Validate monthly value
    if (!formData.monthlyValue) {
      newErrors.monthlyValue = 'Please select your monthly import value';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  return { errors, isValid };
};