import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gherkin',
  standalone: true
})
export class GherkinPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    let formatted = value.replace(/`([^`]+)`/g, '<code>$1</code>');

    formatted = formatted.replace(/(Scenario|Cenário:|Cenário|Then|Então|Given|Dado|When|Quando|And|E|But|Mas) /g, '<br><strong>$1</strong> ');

    return formatted;
  }
}
