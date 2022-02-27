import { TestBed, async, inject } from '@angular/core/testing';

import { AuthemployeeGuard } from './authemployee.guard';

describe('AuthemployeeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthemployeeGuard]
    });
  });

  it('should ...', inject([AuthemployeeGuard], (guard: AuthemployeeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
