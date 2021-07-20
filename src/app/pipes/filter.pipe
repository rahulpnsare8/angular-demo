import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchText: string,
    key1?: string,
    key2?: string,
    key3?: string,
    key4?: string
  ) {
    // return empty array if array is falsy
    if (!items || (items && items.length === 0)) {
      return [];
    }

    // return the original array if search text is empty
    if (!searchText) {
      return items;
    }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    if(!key1 && !key2 && !key3 && !key4){
      return [...items].filter(item=>{
        return item.toString().toLowerCase().includes(searchText);
      });
    }

    // retrun the filtered array
    return items.filter((item) => {
      if (item) {
        return (
          (key1 && item[key1] &&
            item[key1].toString().toLowerCase().includes(searchText)) ||
          (key2 && item[key2] &&
            item[key2].toString().toLowerCase().includes(searchText)) ||
          (key3 && item[key3] &&
            item[key3].toString().toLowerCase().includes(searchText)) ||
          (key4 && item[key4] &&
            item[key4].toString().toLowerCase().includes(searchText))
        );
      }
      return false;
    });
  }
}
