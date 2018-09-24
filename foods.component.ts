import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface StateGroup {
    letter: string;
    names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

    /* fsdf */
    stateForm: FormGroup = this.fb.group({
        stateGroup: '',
    });

    stateGroups: StateGroup[] = [{
        letter: 'A',
        names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
    }, {
        letter: 'B',
        names: ['Bangladesh']
    }, {
        letter: 'I',
        names: ['India']
    }, {
        letter: 'C',
        names: ['California', 'Colorado', 'Connecticut']
    }, {
        letter: 'M',
        names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
            'Minnesota', 'Mississippi', 'Missouri', 'Montana']
    }, {
        letter: 'N',
        names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
            'New Mexico', 'New York', 'North Carolina', 'North Dakota']
    }, {
        letter: 'W',
        names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }];

    stateGroupOptions: Observable<StateGroup[]>;

    constructor(private fb: FormBuilder) {}

    /*
    * Data soring and pagination area start here
    */
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /*
    * Data filer/searching area start here
    */
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /*
    * Main Init Area start here
    */
    ngOnInit() {
        this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterGroup(value))
            );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private _filterGroup(value: string): StateGroup[] {
        if (value) {
            return this.stateGroups
                .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
                .filter(group => group.names.length > 0);
        }

        return this.stateGroups;
    }

}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Alabama', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Alaska', weight: 4.0026, symbol: 'He'},
    {position: 2, name: 'India', weight: 4.0026, symbol: 'He'},
    {position: 2, name: 'Bangladesh', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Arizona', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Arkansas', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'California', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Colorado', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Connecticut', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Washington', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'West Virginia', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Wisconsin', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Wyoming', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Maine', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Maryland', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Massachusetts', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Michigan', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Nebraska', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Nevada', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'New Hampshire', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'New Jersey', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'New York', weight: 40.078, symbol: 'Ca'},
];