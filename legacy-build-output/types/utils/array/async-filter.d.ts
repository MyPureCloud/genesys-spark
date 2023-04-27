export declare function asyncFilter<T>(array: T[], predicate: (item: T) => Promise<boolean>): Promise<T[]>;
