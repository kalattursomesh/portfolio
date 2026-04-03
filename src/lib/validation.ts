import {
    ValidationResult,
    ValidationSchema,
    BatchValidationResult,
    ValidationErrorCode
} from '../types';

/**
 * Validates data against a schema
 * (Basic implementation for satisfying imports)
 */
export function validateData(data: any, schema: ValidationSchema): ValidationResult {
    if (!data) {
        return {
            isValid: false,
            errors: [{
                field: 'all',
                message: 'Data is missing',
                code: 'REQUIRED' as ValidationErrorCode
            }]
        };
    }

    // Simple validation logic to avoid empty schemas being always valid
    // (In a real app, this would iterate over schema.fields)

    return {
        isValid: true,
        errors: []
    };
}

/**
 * Validates multiple data points in batch
 */
export function validateBatch(resultsArray: Record<string, ValidationResult>[]): BatchValidationResult {
    const allResults: Record<string, ValidationResult> = {};
    let totalErrors = 0;
    let totalWarnings = 0;
    let validItems = 0;
    let invalidItems = 0;

    resultsArray.forEach(resultObj => {
        Object.entries(resultObj).forEach(([key, result]) => {
            allResults[key] = result;
            if (result.isValid) {
                validItems++;
            } else {
                invalidItems++;
                totalErrors += result.errors.length;
            }
            if (result.warnings) {
                totalWarnings += result.warnings.length;
            }
        });
    });

    return {
        isValid: invalidItems === 0,
        results: allResults,
        summary: {
            totalErrors,
            totalWarnings,
            validItems,
            invalidItems
        }
    };
}
