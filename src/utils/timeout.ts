export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve as any, ms));
}
