import { cookie } from './cookie'
import { empty } from './empty'
import { json } from './json'
import { storage } from './storage'
import { settings } from './settings'

export function auth(document: any = null) {
        if (settings.history) {
                if (empty(document)) {
                        return json(cookie.read(settings.authKey || 'auth'))
                }

                return cookie.write(settings.authKey || 'auth', json(document))
        }

        if (empty(document)) {
                return json(storage.read(settings.authKey || 'auth'))
        }

        return storage.write(settings.authKey || 'auth', json(document))
}
