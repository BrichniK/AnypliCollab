import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppConfigService } from 'src/app/services/AppConfigService';
import { AppConfig } from 'src/app/services/layout.service';


@Component({
  templateUrl: './dashbord.component.html',
    providers: [ConfirmationService, MessageService,AppConfigService],
})
export class DashboardComponent implements OnInit {

    cards = [

        { title: 'Avis', image: '/../assets/images/societe.png', description: 'View detailed temperature curves for precise traceability, ensuring food safety standards are consistently upheld. Track the journey of your products from source to destination with comprehensive temperature monitoring', route: '/contenu/avis' },
        { title: 'Reclamation', image: '/../assets/images/usine.png', description: 'Seamlessly integrate traceability with mapping functionalities, enabling you to visualize the geographical movement of your products. Identify potential risks and optimize logistics with real-time location tracking.', route: '/contenu/reclamation' },
        
      ];
    basicData: any;
    multiAxisData: any;
    multiAxisOptions: any;
    lineStylesData: any;
    basicOptions: any;
    subscription!: Subscription;
    data: any;
    data1:any;
    chartOptions: any;
    config!: AppConfig;
    employees: User[] = [];
    countusers: number=0;
    countconge: number=0;
    countPending:number=3;
    countDone:number=2;
    countTodo:number=0;
    countAdmin:number=0;
    countUser:number=0;
    countTimeOut:number=0;
    Dialog: boolean = false;
    loading: boolean = true;
    constructor(private messageService: MessageService, private configService: AppConfigService,private router:Router,
        private confirmationService: ConfirmationService) {}

    ngOnInit() {




}
openNew() {
    this.loading = false;
    this.Dialog = true;
}
hideDialog() {
    this.Dialog = false;

}
navigateTo(route: string) {
    if (route && route !== '') {
        this.router.navigateByUrl(route); 
      }
  }
}

