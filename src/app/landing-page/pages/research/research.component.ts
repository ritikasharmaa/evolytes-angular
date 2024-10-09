import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CultureModel} from '../../../models/localization/culture.model';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  hidden: boolean;

  theoriesTabLarge: { icon: string, title: string, description: string }[][] = [
    [
      {
        icon: 'ReinforcementIcon.svg',
        title: 'lp2.common.research.theory.reinforcementTitle',
        description: 'lp2.common.research.theory.reinforcementDescription'
      },
      {
        icon: 'FlowIcon.svg',
        title: 'lp2.common.research.theory.flowTitle',
        description: 'lp2.common.research.theory.flowDescription'
      },
      {
        icon: 'SpacingEffectIcon.svg',
        title: 'lp2.common.research.theory.spacingTitle',
        description: 'lp2.common.research.theory.spacingDescription'
      }
    ],
    [
      {
        icon: 'skill-acquisition-red-icon.png',
        title: 'lp2.common.research.theory.skillTitle',
        description: 'lp2.common.research.theory.skillDescription'
      },
      {
        icon: 'multimodal-encoding-blue-icon.png',
        title: 'lp2.common.research.theory.multimodalTitle',
        description: 'lp2.common.research.theory.multimodalDescription'
      },
      {
        icon: 'growth-orange-icon.png',
        title: 'lp2.common.research.theory.mindsetTitle',
        description: 'lp2.common.research.theory.mindsetDescription'
      }
    ]
  ];

  theoriesTabMedium: { icon: string, title: string, description: string }[][] = [
    [
      {
        icon: 'ReinforcementIcon.svg',
        title: 'lp2.common.research.theory.reinforcementTitle',
        description: 'lp2.common.research.theory.reinforcementDescription'
      },
      {
        icon: 'FlowIcon.svg',
        title: 'lp2.common.research.theory.flowTitle',
        description: 'lp2.common.research.theory.flowDescription'
      }
    ],
    [
      {
        icon: 'SpacingEffectIcon.svg',
        title: 'lp2.common.research.theory.spacingTitle',
        description: 'lp2.common.research.theory.spacingDescription'
      },
      {
        icon: 'skill-acquisition-red-icon.png',
        title: 'lp2.common.research.theory.skillTitle',
        description: 'lp2.common.research.theory.skillDescription'
      }
    ],
    [
      {
        icon: 'multimodal-encoding-blue-icon.png',
        title: 'lp2.common.research.theory.multimodalTitle',
        description: 'lp2.common.research.theory.multimodalDescription'
      },
      {
        icon: 'growth-orange-icon.png',
        title: 'lp2.common.research.theory.mindsetTitle',
        description: 'lp2.common.research.theory.mindsetDescription'
      }
    ]
  ];

  theoriesTabSmall: { icon: string, title: string, description: string }[][] = [
    [
      {
        icon: 'ReinforcementIcon.svg',
        title: 'lp2.common.research.theory.reinforcementTitle',
        description: 'lp2.common.research.theory.reinforcementDescription'
      }
    ],
    [
      {
        icon: 'FlowIcon.svg',
        title: 'lp2.common.research.theory.flowTitle',
        description: 'lp2.common.research.theory.flowDescription'
      }
    ],
    [
      {
        icon: 'SpacingEffectIcon.svg',
        title: 'lp2.common.research.theory.spacingTitle',
        description: 'lp2.common.research.theory.spacingDescription'
      }

    ],
    [
      {
        icon: 'multimodal-encoding-blue-icon.png',
        title: 'lp2.common.research.theory.skillTitle',
        description: 'lp2.common.research.theory.skillDescription'
      }
    ],
    [
      {
        icon: 'ReinforcementIcon.svg',
        title: 'lp2.common.research.theory.multimodalTitle',
        description: 'lp2.common.research.theory.multimodalDescription'
      }
    ],
    [
      {
        icon: 'growth-orange-icon.png',
        title: 'lp2.common.research.theory.mindsetTitle',
        description: 'lp2.common.research.theory.mindsetDescription'
      }
    ]
  ];

  tabText: { year: number, season: string, title: string, descr1: string, descr2: string }[] = [
    {
      year: 2014,
      season: 'lp2.research.history.y2014.season',
      title: 'lp2.research.history.y2014.title',
      descr1: 'lp2.research.history.y2014.descr1',
      descr2: 'lp2.research.history.y2014.descr2'
    },
    {
      year: 2015,
      season: 'lp2.research.history.y2015.season',
      title: 'lp2.research.history.y2015.title',
      descr1: 'lp2.research.history.y2015.descr1',
      descr2: 'lp2.research.history.y2015.descr2'
    },
    {
      year: 2016,
      season: 'lp2.research.history.y2016.season',
      title: 'lp2.research.history.y2016.title',
      descr1: 'lp2.research.history.y2016.descr1',
      descr2: 'lp2.research.history.y2016.descr2'
    }
  ];

  constructor(private titleService: Title) {

    if (CultureModel.getHomepageCulture() === CultureModel.isIS) {
      this.titleService.setTitle('Börn læra stærðfræði að meðaltali fjórfalt hraðar með Evolytes');
    } else if (CultureModel.getHomepageCulture() === CultureModel.enGB) {
      this.titleService.setTitle('Children learn maths four times faster on average with Evolytes');
    } else if (CultureModel.getHomepageCulture() === CultureModel.frFR) {
      this.titleService.setTitle('Les enfants apprennent les mathématiques en moyenne quatre fois plus vite avec Evolytes');
    }

  }

  ngOnInit() {
    this.hidden = true;
  }

  setHidden() {
    this.hidden = !this.hidden;
  }

  colorIndex(i: number) {
    switch (i % 6) {
      case (0):
        return '#009CCC';
      case (1):
        return '#FFCB05';
      case (2):
        return '#1e7e34';
      case (3):
        return '#D0021B';
      case (4):
        return '#9B59B6';
      case (5):
        return '#F26522';
    }
  }
}
