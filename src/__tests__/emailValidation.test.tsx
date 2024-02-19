/**
 * @jest-environment jsdom
*/

import {expect} from '@jest/globals';
import '@testing-library/jest-dom'
import { describe, it } from 'node:test'
import { EmailRegex } from '../utility/regex';

describe('ValidatesEmailProperly', () => {
    it('properly validates an email to RFC 3696', () => {

        const result1 = EmailRegex.test("thisShouldValidate@email.com");
        const result2 = EmailRegex.test("thisShouldFail@e.c");

        expect(result1).toEqual(true);
        expect(result2).toEqual(false);
    })
})