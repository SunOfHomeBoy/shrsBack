import { uri } from './uri'
import { settings } from './settings'

export function redirect(path: string) {
        if (settings.history) {
                return window.location.href = uri(path)
        }

        window.location.hash = uri(path)
}