import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import config from '../config';

const verifyAuthToRedirect = (req: NextRequest, ev: NextFetchEvent) => {
    console.log(req.cookies, Object.keys(req.cookies))
    return new Promise((resolve) => {
        ev.waitUntil((async () => {
            fetch(`${config.app.url}/users/me`, {
                method: 'GET',
                headers: {
                    'Cookie': Object.keys(req.cookies).reduce((storage: string, key: string) => {
                        storage += `${key}=${req.cookies[key]};`
                        return storage;
                    }, '')
                }
            })
                .then(res => res.json())
                .then(res => [resolve(!res.error ? res : null)])
                .catch(() => resolve(null))
        })());
    })
}

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    let url = req.url;
    const isPathAuth = url.includes('/auth')

    let account = null;
    account = await verifyAuthToRedirect(req, ev);

    console.log({ url });
    console.log({ account });

    if (account && isPathAuth) return NextResponse.redirect(new URL('/', req.url))
    if (!account && !isPathAuth) return NextResponse.redirect(new URL('/auth/sign-in', req.url))

    return NextResponse.next();
}