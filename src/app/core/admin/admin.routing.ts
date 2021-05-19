import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { ManagementRolesComponent } from './management-roles/management-roles.component';
import { WebProfileComponent } from './web-profile/web-profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { ApiComponent } from './api/api.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'management',
                children: [
                    // {
                    //     path: 'audit-trails',
                    //     component: ManagementAuditComponent
                    // },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    },
                    {
                        path: 'roles',
                        component: ManagementRolesComponent
                    },
                ]
            },
            {
                path: 'web-profile',
                component: WebProfileComponent
            },
            {
                path: 'administration',
                component: AdministrationComponent
            },
            {
                path: 'api',
                component: ApiComponent
            },
            // {
            //     path: 'report',
            //     component: ReportComponent
            // },
        ]
    }
]