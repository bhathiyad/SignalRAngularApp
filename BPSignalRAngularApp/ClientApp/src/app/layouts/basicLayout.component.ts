import { Component } from '@angular/core';
import { NavigationStart, Router, NavigationEnd, NavigationCancel } from '@angular/router';

declare var jQuery: any;

@Component({
    selector: 'basic',
    templateUrl: 'basicLayout.template.html',
})
export class BasicLayoutComponent {
    loading: boolean;
    constructor(private router: Router) {
        this.loading = true;//before view loads, display the spinner circles
    }

    public ngOnInit(): any {
        this.loading = false;

    }
    

    ngAfterViewInit() {
        //if (
        //    //this.router.routerState.snapshot.url.includes("/home;uid=") ||
        //    this.router.routerState.snapshot.url.includes("/questionnaire") ||
        //    this.router.routerState.snapshot.url.includes("/resultsectionwise") ||
        //    this.router.routerState.snapshot.url.includes("/errorpage")) {
        //    this.loading = false;
        //}
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    //setTimeout(() => {
                    this.loading = false;
                    //}, 2000)
                }
            });
    }

}
