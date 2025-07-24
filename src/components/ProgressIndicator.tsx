import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-success border-success text-success-foreground' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>

              {/* Step Label */}
              <div className="ml-3 hidden sm:block">
                <div className={`text-sm font-medium ${
                  isCurrent 
                    ? 'text-primary' 
                    : isCompleted 
                      ? 'text-success' 
                      : 'text-muted-foreground'
                }`}>
                  {step}
                </div>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className={`
                  hidden sm:block h-0.5 w-20 lg:w-32 mx-4 transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-success' : 'bg-muted'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Labels */}
      <div className="sm:hidden mt-3 text-center">
        <span className="text-sm font-medium text-primary">
          Step {currentStep}: {steps[currentStep - 1]}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;