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
        // { title: 'Monitoring', image: '/../assets/images/monitoring.png', description: 'Stay in control with constant monitoring capabilities. Receive alerts and notifications for any deviations from set parameters, empowering you to take immediate action to maintain quality and safety standards.', route: '/contenu/devices' },
        // { title: 'Réseaux d\'établissements', image: '/../assets/images/hub.png', description: 'Monitor temperature status effortlessly. Access real-time updates on temperature conditions to ensure optimal storage and transportation environments, mitigating the risk of spoilage or contamination.', route: '/contenu/modifierHub' },
        // { title: 'Employé', image: '/../assets/images/employe.png', description: 'Gain insights into port status for streamlined operations. Monitor port activities and ensure timely handling of shipments, minimizing delays and maximizing efficiency in the supply chain.', route: '/contenu/utilisateurs' },
        // { title: 'Device', image: '/../assets/images/smart-devices.png', description: 'Achieve seamless data synchronization across all platforms. Integrate your systems effortlessly to ensure consistent and accurate data flow, facilitating informed decision-making and operational efficiency.', route: '/contenu/modifierDevice' },
        // { title: 'Map', image: '/../assets/images/location.png', description: 'Utilize MQTT messaging for efficient communication. Easily submit messages to MQTT protocols, enabling swift and reliable exchange of data between devices and systems.', route: '/contenu/map' },
        // { title: 'BI 1', image: '/../assets/images/bi.png', description: 'Enhance communication with QR code integration. Generate QR codes for easy access to group Telegram notifications, facilitating quick and convenient communication among team members.', route: '/contenu/BI' },
        // { title: 'BI 2', image: '/../assets/images/bi.png', description: 'Customize your system configuration to suit your specific needs. Tailor settings and parameters to optimize performance and ensure alignment with your business objectives, maximizing the effectiveness of your safety food smart system.', route: '/contenu/BI2' },
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

