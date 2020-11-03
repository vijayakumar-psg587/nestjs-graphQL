import { Test, TestingModule } from '@nestjs/testing';
import { AppUtilService } from './app-util.service';
import * as dateFns from 'date-fns';
import { APP_CONST } from '../../util/app-common-const';

fdescribe('AppUtilService', () => {
    let service: AppUtilService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [AppUtilService],
        }).compile();

        service = moduleRef.get<AppUtilService>(AppUtilService);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        jest.resetAllMocks();
    });

    test('service - should be defined', () => {
        expect(service).toBeDefined();
    });

    test('checkforNull -  return either null or the current object val', () => {
        // testing static method  - checkIfNull;
        // Pssing an actual obj - should return the object
        let actualRes;
        actualRes = AppUtilService.checkIfNull({ test_obj: 'test_val' });
        expect(actualRes).toEqual({ test_obj: 'test_val' });

        // Passing an undefined val should return null
        actualRes = AppUtilService.checkIfNull(undefined);
        expect(actualRes).toEqual(null);
    });

    test('isNullOrUndefined - return false is it conatins a val', () => {
        let actualRes;
        actualRes = AppUtilService.isNullOrUndefined({ test_obj: 'test_val' });
        expect(actualRes).toBeFalsy();

        // Passing an undefined val should return null
        actualRes = AppUtilService.isNullOrUndefined(process.env.TESTTT);
        expect(actualRes).toBeTruthy();

        actualRes = AppUtilService.isNullOrUndefined(null);
        expect(actualRes).toBeTruthy();
    });

    test('defaultDate - return a defaultDate when called', () => {
        const dateStr = AppUtilService.getDefaultTime();
        const parsedDate = dateFns.parse(dateStr, APP_CONST.COMMON.DEFAULT_DNS_FORMAT, Date.now());
        expect(dateStr).toBeDefined();
        const { year, month, day } = { year: parsedDate.getFullYear(), month: parsedDate.getMonth() + 1, day: parsedDate.getDate() };
        expect(dateStr.split(' ')[0]).toEqual(year.toString() + '-' + month.toString() + '-' + day.toString());
    });
});
