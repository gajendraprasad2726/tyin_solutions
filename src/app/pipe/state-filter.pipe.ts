import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFilter'
})
export class StateFilterPipe implements PipeTransform {

  // Transform method to filter an array of objects based on the search query
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;  // If no items or no search text, return the original list
    }

    // Filter items based on the search text (case-insensitive)
    return items.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
}
