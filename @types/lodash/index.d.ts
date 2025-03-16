// Library to import lodash types
// We can also install the types from somewhere else but this is an example in case
// there are no types for a library (It's not that common)

// Declare all types for the methods you are going to use
declare module "lodash" {
    // You can check the library documentation to check how the method works 
    // and the types for its  attributes
    export function random(lower: number, upper: number): number 
}