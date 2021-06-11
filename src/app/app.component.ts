import { Component} from '@angular/core';
import { ActivatedRoute, Router,RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){
    const snapshot: RouterStateSnapshot = router.routerState.snapshot;
console.log(snapshot)
  }
}
