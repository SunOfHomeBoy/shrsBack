export function trim(document: string, options: string = 'ALL'): string {
        if (options === 'ALL' || options === 'LEFT') {
                document = document.replace(/^\s*/g, '')
        }

        if (options === 'ALL' || options === 'RIGHT') {
                document = document.replace(/\s*$/g, '')
        }

        return document
}
