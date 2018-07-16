export function json(parameters: any): any {
        if (!parameters || typeof (parameters) === 'object') {
                try {
                        return JSON.parse(parameters || '{}')
                } catch (err) { }
        }

        return JSON.stringify(parameters)
}
