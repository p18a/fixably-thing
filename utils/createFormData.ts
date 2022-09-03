export const createFormData = (obj: Record<string, string>) => {
    const data = new FormData()

    Object.entries(obj).forEach(([k, v]) => data.append(k, v))

    return data
}