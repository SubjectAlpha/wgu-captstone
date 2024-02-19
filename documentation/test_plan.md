# Unit Test Plan

## Overview

This test is designed to test the validation functionality of the email validation on the registration page.

### Inputs

There will be two inputs to this test. There will be a passing value (ex. <test@email.com>), and a failing failing value (ex. <asdfghb@g.c>).

### Outputs

The output will either be a true or false value which indicated the success or failure of the test.

## Test Data

The data provided to the test will be a set of emails to be supplied to the registration page.

### Success Conditions

A success condition will be when a valid email address, valid meaning meeting the RFC 3696 standard.

### Failure Conditions

A failure condition will be presented if the email address does not meet the requirements set by the RFC 3696 standard.
