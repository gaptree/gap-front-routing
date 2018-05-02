import {Router} from '../index';

test('Router', () => {
    const router = new Router();

    router
        .add('/login', 'target login')
        .add('/c/:companyCode', 'company target')
        .add('/c/:companyCode/employee/:employeeCode', 'company employee');

    const match = router.match('/c/gaptree/employee/some-one');

    expect(match.action).toBe('company employee');
    expect(match.params.companyCode).toBe('gaptree');
    expect(match.params.employeeCode).toBe('some-one');
});
