import {Router} from '../index';

test('Router', () => {
    const router = new Router();

    router
        .add('/login', 'target login')
        .add('/c/{companyCode:[a-z0-9-]+}', 'company target')
        .add('/c/{companyCode:[a-z0-9-]+}/employee/{employeeCode:[a-z0-9-]+}', 'company employee');

    const match = router.match('/c/gaptree/employee/some-one');
    const match2 = router.match('/c/wecfin');

    const params = {companyCode: 'wec', employeeCode: '1-4325435fa'};
    const pattern = '/c/{companyCode:[a-z0-9-]+}/employee/{employeeCode:[a-z0-9-]+}';
    const path = router.url(pattern, params);

    expect(match2.action).toBe('company target');

    expect(match.action).toBe('company employee');
    expect(match.params.companyCode).toBe('gaptree');
    expect(match.params.employeeCode).toBe('some-one');
    expect(path).toBe('/c/wec/employee/1-4325435fa');
});
