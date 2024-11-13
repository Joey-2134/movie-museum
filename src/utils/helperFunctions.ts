export function isStringOrNumber(value: any): value is string | number {
    return typeof value === 'string' || typeof value === 'number';
}