export async function pMap<T, R>(items: T[], mapper: (item: T) => Promise<R>, options: { concurrency: number }): Promise<R[]> {
    const results: R[] = [];
    const inProgress = new Set<Promise<void>>();

    for (const item of items) {
        if (inProgress.size >= options.concurrency) {
            await Promise.race(inProgress);
        }

        const processPromise = async () => {
            const result = await mapper(item);
            results.push(result);
        };

        const promise = processPromise();
        inProgress.add(promise);
        promise.finally(() => inProgress.delete(promise));
    }

    await Promise.all(inProgress);
    return results;
}
