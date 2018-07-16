export class storage {
        public static read(field: string): string {
                return window.localStorage.getItem(field)
        }

        public static each(callback: (field: string, data: string) => void) {
                for (let i = window.localStorage.length - 1; 0 <= i; i--) {
                        let field = window.localStorage.key(i)
                        callback(storage.read(field), field)
                }
        }

        public static write(field: string, data: string) {
                window.localStorage.setItem(field, data)
        }

        public static remove(field: string) {
                window.localStorage.removeItem(field)
        }

        public static clearAll() {
                window.localStorage.clear()
        }
}