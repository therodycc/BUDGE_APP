import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import config from '../config';

const verifyAuthToRedirect = (req: NextRequest, ev: NextFetchEvent) => {
    return new Promise((resolve) => {
        ev.waitUntil((async () => {
            fetch(`${config.app.url}/users/me`, {
                method: 'GET',
                headers: {
                    'Cookie': Object.keys(req.cookies)
                        .reduce((storage: string, key: string) => {
                            storage += `${key}=${req.cookies[key]};`
                            return storage;
                        }, '')
                }
            })
                .then(res => res.json())
                .then(res => resolve(!res.error ? res : null))
                .catch(() => resolve(null))
        })());
    })
}

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    let url = req.url;
    if (req.nextUrl.pathname.includes(".")) return NextResponse.next()

    const isPathAuth = url.includes('/auth')
    let account = await verifyAuthToRedirect(req, ev);

    if (account && isPathAuth) return NextResponse.redirect(new URL('/', req.url))
    if (!account && !isPathAuth) return NextResponse.redirect(new URL('/auth/sign-in', req.url))

    return NextResponse.next();
}