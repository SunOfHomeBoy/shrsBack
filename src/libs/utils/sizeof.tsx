export function sizeof(document: any): number {
        if (document instanceof Array) {
                return document.length
        }

        if (typeof (document) === 'object') {
                return Object.keys(document).length
        }

        return String(document).length
}