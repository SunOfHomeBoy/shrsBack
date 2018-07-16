import { empty } from './empty'
import { trim } from './trim'

export class cookie {
        public static read(field: string): string {
                if (empty(field) || !cookie.has(field)) {
                        return
                }

                let regxpBuf = new RegExp([
                        '(?:^|.*;\\s*)',
                        global.escape(field).replace(/[\-\.\+\*]/g, '\\$&'),
                        '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'
                ].join(''))
                return global.escape(window.document.cookie.replace(regxpBuf, '$1'))
        }

        public static each(callback: (data: string, field: string) => void) {
                let cookies = window.document.cookie.split(/; ?/g)
                for (let i = cookies.length - 1; 0 <= i; i--) {
                        if (!trim(cookies[i])) {
                                continue
                        }

                        let data = cookies[i].split('=')
                        callback(global.escape(data[0]), global.escape(data[1]))
                }
        }

        public static write(field: string, data: string) {
                if (empty(field)) {
                        return
                }

                window.document.cookie = [
                        global.escape(field) + '=' + global.escape(data) + ';',
                        'expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'
                ].join('')
        }

        public static remove(field: string) {
                if (empty(field) || !cookie.has(field)) {
                        return
                }

                window.document.cookie = [
                        global.escape(field) + '=;',
                        'expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
                ].join(' ')
        }

        public static clearAll() {
                cookie.each((_: any, field: string) => {
                        cookie.remove(field)
                })
        }

        private static has(field: string): boolean {
                return (new RegExp([
                        '(?:^|;\\s*)',
                        global.escape(field).replace(/[\-\.\+\*]/g, '\\$&'),
                        '\\s*\\='
                ].join(''))).test(window.document.cookie)
        }
}