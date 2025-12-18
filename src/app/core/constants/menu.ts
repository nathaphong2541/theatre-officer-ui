import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: $localize`:@@menu_group_master:Master Data`,
      separator: true,
      items: [
        {
          icon: 'fa-regular fa-building',
          label: $localize`:@@menu_department:Department`,
          route: '/en/departments',
        },
        // {
        //   icon: 'fa-solid fa-briefcase',
        //   label: $localize`:@@menu_position:Position`,
        //   route: '/en/positions',
        // },
        // {
        //   icon: 'fa-solid fa-screwdriver-wrench',
        //   label: $localize`:@@menu_skill:Skill`,
        //   route: '/en/skills',
        // },
        {
          icon: 'fa-solid fa-location-dot',
          label: $localize`:@@menu_work_location:Work Location`,
          route: '/en/work-locations',
        },
        {
          icon: 'fa-solid fa-users',
          label: $localize`:@@menu_unions:Unions / Guilds / Memberships`,
          route: '/en/unions',
        },
        {
          icon: 'fa-solid fa-graduation-cap',
          label: $localize`:@@menu_experience_level:Experience Level`,
          route: '/en/experience-levels',
        },
        {
          icon: 'fa-solid fa-handshake',
          label: $localize`:@@menu_partner_directory:Partner Directory`,
          route: '/en/partner-directories',
        },
        {
          icon: 'fa-solid fa-heart',
          label: $localize`:@@menu_gender_identity:Gender Identity`,
          route: '/en/gender-identities',
        },
        {
          icon: 'fa-regular fa-id-card',
          label: $localize`:@@menu_personal_identity:Personal Identity`,
          route: '/en/personal-identities',
        },
        {
          icon: 'fa-solid fa-earth-americas',
          label: $localize`:@@menu_racial_identity:Racial Identity`,
          route: '/en/racial-identities',
        }
      ]
    }
  ];
}
