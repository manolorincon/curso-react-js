import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('Pruebas en los fetch', () => {
    
    let token = '';

    test('Fetch sin token debe funcionar', async () => {
        const resp = await fetchSinToken('auth', { email: 'mrincon@gmail.com', password: '123456' }, 'POST');
        expect( resp instanceof Response).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );
        token = body.token;
    })


    test('Fetch con token debe funcionar', async () => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/6018d1dfb8a3b69e300960cb', {}, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe('Evento no existe');


    })
    

})
