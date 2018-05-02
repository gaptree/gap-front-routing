import {Router} from '../index';

test('Router', () => {
    const router = new Router();

    router
        .add('/login', 'target login')
        .add('/c/:companyCode', 'company target')
        .add('/c/:companyCode/employee/:employeeCode', 'company employee');

    const res = router.dispatch('/c/gaptree/employee/some-one');

    expect(res.action).toBe('company employee');
    expect(res.params.companyCode).toBe('gaptree');
    expect(res.params.employeeCode).toBe('some-one');
});
