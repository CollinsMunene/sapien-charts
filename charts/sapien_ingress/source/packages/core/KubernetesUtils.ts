export async function k8sApiCall<T>(func: () => Promise<T>)
{
    try
    {
        return await func();
    }
    catch (e)
    {
        if (e.response && e.response.body && e.response.body.message) {
            throw new Error(`Kubernetes API error: ${e.response.body.message}`);
        } else {
            throw new Error(`Kubernetes API error: ${e.message}`);
        }
    }
}
