import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();    
  });

  it('transorm empty string to empty string', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('', 1)).toEqual('');    
  });

  it('string truncated and dots appended', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('hello world', 5)).toEqual('hello...');
  });
});
