import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gherkin',
  standalone: true
})
export class GherkinPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Substitui `texto` por <code>texto</code>
    let formatted = value.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Quebra linha após cada `Then`, `And`, etc. (separar visualmente)
    formatted = formatted.replace(/(Scenario|Then|Given|When|And|But)/g, '<br><strong>$1</strong>');

    return formatted;
  }
}
