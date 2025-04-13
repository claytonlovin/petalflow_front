import { GherkinPipe } from './gherkin.pipe';

describe('GherkinPipe', () => {
  it('create an instance', () => {
    const pipe = new GherkinPipe();
    expect(pipe).toBeTruthy();
  });
});
